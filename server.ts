
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel ? '/tmp/geekay.db' : 'geekay.db';

console.log('Current directory:', process.cwd());
console.log('Root files:', fs.readdirSync('.'));

// If on Vercel, copy the initial DB to /tmp if it doesn't exist
if (isVercel && !fs.existsSync(dbPath) && fs.existsSync('geekay.db')) {
  console.log('Copying database to /tmp...');
  fs.copyFileSync('geekay.db', dbPath);
}

const db = new Database(dbPath);
console.log(`Database connected at ${dbPath}`);
db.pragma('busy_timeout = 10000');
db.exec('PRAGMA journal_mode = DELETE'); 

try {
  // Test write permission
  const testPath = isVercel ? '/tmp/test-write' : 'test-write';
  fs.writeFileSync(testPath, 'test');
  fs.unlinkSync(testPath);
  console.log('File system is writable');
} catch (err) {
  console.error('File system is NOT writable:', err);
}

const JWT_SECRET = process.env.JWT_SECRET || 'geekay-secret-2026';

export const app = express();

// --- Database Initialization ---
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('admin', 'editor'))
  );

  CREATE TABLE IF NOT EXISTS leadership (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT,
    description TEXT,
    linkedin TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    game TEXT,
    region TEXT,
    league TEXT,
    banner TEXT,
    tagline TEXT,
    achievements TEXT, -- JSON string
    display_order INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER,
    ign TEXT,
    role TEXT,
    name TEXT,
    age TEXT,
    nationality TEXT,
    socials TEXT, -- JSON string
    achievements TEXT, -- JSON string
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS creators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alias TEXT,
    photo TEXT,
    platforms TEXT, -- JSON string
    metrics TEXT, -- JSON string
    total_reach TEXT,
    focus TEXT,
    display_order INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    game TEXT,
    type TEXT,
    start_date TEXT,
    end_date TEXT,
    time TEXT,
    region TEXT,
    status TEXT,
    link TEXT,
    featured INTEGER DEFAULT 0,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    category TEXT,
    title TEXT,
    date TEXT,
    description TEXT,
    featured INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    department TEXT,
    work_type TEXT,
    location TEXT,
    summary TEXT,
    responsibilities TEXT, -- JSON string
    requirements TEXT, -- JSON string
    nice_to_have TEXT, -- JSON string
    benefits TEXT, -- JSON string
    email TEXT,
    display_order INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT,
    entity_type TEXT,
    entity_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);
console.log('Database schema initialized successfully');

// Migration: Add display_order to events if missing
try {
  db.prepare('SELECT display_order FROM events LIMIT 1').get();
} catch (e) {
  console.log('Adding display_order column to events table...');
  db.exec('ALTER TABLE events ADD COLUMN display_order INTEGER DEFAULT 0');
}

// Seed default admin if not exists
const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hashedPassword, 'admin');
  console.log('Default admin created: admin / admin123');
} else {
  console.log('Database initialized successfully');
}

// --- Multer Setup for Uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = isVercel ? '/tmp/uploads' : './public/uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('public/uploads'));

// Request Logger
app.use((req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  if (!isVercel) {
    fs.appendFileSync('server.log', log);
  }
  console.log(log.trim());
  next();
});

app.get('/api/debug/logs', (req, res) => {
  if (fs.existsSync('server.log')) {
    res.send(fs.readFileSync('server.log', 'utf8'));
  } else {
    res.send('No logs found');
  }
});

// --- Auth Middleware (Disabled) ---
const authenticate = (req: any, res: any, next: any) => {
    req.user = { id: 1, username: 'admin', role: 'admin' };
    next();
  };

  const isAdmin = (req: any, res: any, next: any) => {
    next();
  };

  // --- Auth Routes ---
  app.get('/api/health', (req, res) => {
    try {
      db.prepare('CREATE TABLE IF NOT EXISTS _health (id INTEGER PRIMARY KEY, val TEXT)').run();
      db.prepare('INSERT INTO _health (val) VALUES (?)').run(new Date().toISOString());
      res.json({ 
        status: 'ok', 
        db: 'writable', 
        isVercel,
        dbPath,
        timestamp: new Date().toISOString() 
      });
    } catch (err: any) {
      console.error('Health check DB error:', err);
      res.json({ 
        status: 'error', 
        db: 'readonly or error', 
        error: err.message, 
        isVercel,
        dbPath,
        timestamp: new Date().toISOString() 
      });
    }
  });

  app.post(['/api/auth/login', '/api/auth/login/'], (req, res) => {
    console.log('Login attempt:', req.body.username);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log('Login failed: Invalid credentials for', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: true, 
      sameSite: 'none' 
    });
    console.log('Login success:', username);
    res.json({ user: { id: user.id, username: user.username, role: user.role } });
  });

  app.post(['/api/auth/logout', '/api/auth/logout/'], (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  });

  app.get(['/api/auth/me', '/api/auth/me/'], (req: any, res) => {
    res.json({ user: { id: 1, username: 'admin', role: 'admin' } });
  });

  // --- API Routes (Generic CRUD Helper) ---
  const createCrudRoutes = (tableName: string, entityName: string) => {
    app.get([`/api/${tableName}`, `/api/${tableName}/`], (req, res) => {
      const items = db.prepare(`SELECT * FROM ${tableName} ORDER BY display_order ASC`).all();
      res.json(items);
    });

    app.get([`/api/${tableName}/:id`, `/api/${tableName}/:id/`], (req, res) => {
      const item = db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`).get(req.params.id);
      res.json(item);
    });

    app.post([`/api/${tableName}`, `/api/${tableName}/`], (req: any, res) => {
      try {
        console.log(`POST /api/${tableName} - Body:`, JSON.stringify(req.body));
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: 'Request body is empty' });
        }
        const fields = Object.keys(req.body).filter(k => k !== 'id');
        if (fields.length === 0) {
          return res.status(400).json({ error: 'No fields provided for insertion' });
        }
        const placeholders = fields.map(() => '?').join(',');
        const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
        
        const info = db.prepare(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`).run(...values);
        
        try {
          db.prepare('INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)')
            .run(1, `Created ${entityName}`, tableName, info.lastInsertRowid);
        } catch (logErr) {
          console.error('Failed to log activity:', logErr);
        }
          
        console.log(`Successfully created ${entityName} with ID: ${info.lastInsertRowid}`);
        res.json({ id: info.lastInsertRowid });
      } catch (err: any) {
        console.error(`Error in POST /api/${tableName}:`, err);
        res.status(500).json({ error: err.message });
      }
    });

    app.put([`/api/${tableName}/:id`, `/api/${tableName}/:id/`], (req: any, res) => {
      try {
        console.log(`PUT /api/${tableName}/${req.params.id} - Body:`, JSON.stringify(req.body));
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: 'Request body is empty' });
        }
        const fields = Object.keys(req.body).filter(k => k !== 'id');
        if (fields.length === 0) {
          return res.status(400).json({ error: 'No fields provided for update' });
        }
        const setClause = fields.map(f => `${f} = ?`).join(',');
        const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
        
        db.prepare(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`).run(...values, req.params.id);
        
        try {
          db.prepare('INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)')
            .run(1, `Updated ${entityName}`, tableName, req.params.id);
        } catch (logErr) {
          console.error('Failed to log activity:', logErr);
        }
          
        console.log(`Successfully updated ${entityName} with ID: ${req.params.id}`);
        res.json({ success: true });
      } catch (err: any) {
        console.error(`Error in PUT /api/${tableName}/${req.params.id}:`, err);
        res.status(500).json({ error: err.message });
      }
    });

    app.delete([`/api/${tableName}/:id`, `/api/${tableName}/:id/`], (req: any, res) => {
      db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(req.params.id);
      
      db.prepare('INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)')
        .run(1, `Deleted ${entityName}`, tableName, req.params.id);
        
      res.json({ success: true });
    });
  };

  app.get(['/api/settings', '/api/settings/'], (req, res) => {
    const rows = db.prepare('SELECT * FROM settings').all();
    const settings: any = {};
    rows.forEach((row: any) => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  });

  app.post(['/api/settings', '/api/settings/'], (req, res) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        stmt.run(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value));
      }
    });
    transaction(req.body);
    res.json({ success: true });
  });

  createCrudRoutes('leadership', 'Leadership Member');
  createCrudRoutes('teams', 'Team');
  createCrudRoutes('creators', 'Content Creator');
  createCrudRoutes('events', 'Event');
  createCrudRoutes('gallery', 'Gallery Item');
  createCrudRoutes('jobs', 'Job Opening');

  // --- Specialized Routes ---
  app.get(['/api/teams/:id/players', '/api/teams/:id/players/'], (req, res) => {
    const players = db.prepare('SELECT * FROM players WHERE team_id = ? ORDER BY display_order ASC').all(req.params.id);
    res.json(players);
  });

  app.post(['/api/players', '/api/players/'], (req: any, res) => {
    const fields = Object.keys(req.body).filter(k => k !== 'id');
    const placeholders = fields.map(() => '?').join(',');
    const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
    const info = db.prepare(`INSERT INTO players (${fields.join(',')}) VALUES (${placeholders})`).run(...values);
    res.json({ id: info.lastInsertRowid });
  });

  app.put(['/api/players/:id', '/api/players/:id/'], (req: any, res) => {
    const fields = Object.keys(req.body).filter(k => k !== 'id');
    const setClause = fields.map(f => `${f} = ?`).join(',');
    const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
    db.prepare(`UPDATE players SET ${setClause} WHERE id = ?`).run(...values, req.params.id);
    res.json({ success: true });
  });

  app.delete(['/api/players/:id', '/api/players/:id/'], (req: any, res) => {
    db.prepare('DELETE FROM players WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  app.get(['/api/stats', '/api/stats/'], (req, res) => {
    const stats = {
      teams: db.prepare('SELECT COUNT(*) as count FROM teams').get().count,
      players: db.prepare('SELECT COUNT(*) as count FROM players').get().count,
      events: db.prepare('SELECT COUNT(*) as count FROM events').get().count,
      gallery: db.prepare('SELECT COUNT(*) as count FROM gallery').get().count,
      jobs: db.prepare('SELECT COUNT(*) as count FROM jobs').get().count,
    };
    res.json(stats);
  });

  app.get(['/api/activity', '/api/activity/'], (req, res) => {
    const logs = db.prepare(`
      SELECT activity_log.*, users.username 
      FROM activity_log 
      JOIN users ON activity_log.user_id = users.id 
      ORDER BY timestamp DESC LIMIT 50
    `).all();
    res.json(logs);
  });

  app.post(['/api/upload', '/api/upload/'], upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // --- Global Error Handler ---
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  });

  // --- Vite Middleware ---
  (async () => {
    if (process.env.NODE_ENV !== 'production' && !isVercel) {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      app.use(express.static('dist'));
      app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist/index.html')));
    }

    if (!isVercel) {
      app.listen(3000, '0.0.0.0', () => {
        console.log('Server running on http://localhost:3000');
      });
    }
  })();

export default app;
