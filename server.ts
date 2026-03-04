
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

const db = new Database('geekay.db');
const JWT_SECRET = process.env.JWT_SECRET || 'geekay-secret-2026';

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

// Seed default admin if not exists
const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hashedPassword, 'admin');
  console.log('Default admin created: admin / admin123');
}

// --- Multer Setup for Uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './public/uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static('public/uploads'));

  // --- Auth Middleware ---
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  const isAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
  };

  // --- Auth Routes ---
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'none' });
    res.json({ user: { id: user.id, username: user.username, role: user.role } });
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  });

  app.get('/api/auth/me', authenticate, (req: any, res) => {
    res.json({ user: req.user });
  });

  // --- API Routes (Generic CRUD Helper) ---
  const createCrudRoutes = (tableName: string, entityName: string) => {
    app.get(`/api/${tableName}`, (req, res) => {
      const items = db.prepare(`SELECT * FROM ${tableName} ORDER BY display_order ASC`).all();
      res.json(items);
    });

    app.get(`/api/${tableName}/:id`, (req, res) => {
      const item = db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`).get(req.params.id);
      res.json(item);
    });

    app.post(`/api/${tableName}`, authenticate, (req: any, res) => {
      const fields = Object.keys(req.body).filter(k => k !== 'id');
      const placeholders = fields.map(() => '?').join(',');
      const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
      
      const info = db.prepare(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`).run(...values);
      
      db.prepare('INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)')
        .run(req.user.id, `Created ${entityName}`, tableName, info.lastInsertRowid);
        
      res.json({ id: info.lastInsertRowid });
    });

    app.put(`/api/${tableName}/:id`, authenticate, (req: any, res) => {
      const fields = Object.keys(req.body).filter(k => k !== 'id');
      const setClause = fields.map(f => `${f} = ?`).join(',');
      const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
      
      db.prepare(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`).run(...values, req.params.id);
      
      db.prepare('INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)')
        .run(req.user.id, `Updated ${entityName}`, tableName, req.params.id);
        
      res.json({ success: true });
    });

    app.delete(`/api/${tableName}/:id`, authenticate, isAdmin, (req: any, res) => {
      db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(req.params.id);
      
      db.prepare('INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)')
        .run(req.user.id, `Deleted ${entityName}`, tableName, req.params.id);
        
      res.json({ success: true });
    });
  };

  createCrudRoutes('leadership', 'Leadership Member');
  createCrudRoutes('teams', 'Team');
  createCrudRoutes('creators', 'Content Creator');
  createCrudRoutes('events', 'Event');
  createCrudRoutes('gallery', 'Gallery Item');
  createCrudRoutes('jobs', 'Job Opening');

  // --- Specialized Routes ---
  app.get('/api/teams/:id/players', (req, res) => {
    const players = db.prepare('SELECT * FROM players WHERE team_id = ? ORDER BY display_order ASC').all(req.params.id);
    res.json(players);
  });

  app.post('/api/players', authenticate, (req: any, res) => {
    const fields = Object.keys(req.body).filter(k => k !== 'id');
    const placeholders = fields.map(() => '?').join(',');
    const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
    const info = db.prepare(`INSERT INTO players (${fields.join(',')}) VALUES (${placeholders})`).run(...values);
    res.json({ id: info.lastInsertRowid });
  });

  app.put('/api/players/:id', authenticate, (req: any, res) => {
    const fields = Object.keys(req.body).filter(k => k !== 'id');
    const setClause = fields.map(f => `${f} = ?`).join(',');
    const values = fields.map(f => typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
    db.prepare(`UPDATE players SET ${setClause} WHERE id = ?`).run(...values, req.params.id);
    res.json({ success: true });
  });

  app.delete('/api/players/:id', authenticate, isAdmin, (req: any, res) => {
    db.prepare('DELETE FROM players WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  app.get('/api/stats', (req, res) => {
    const stats = {
      teams: db.prepare('SELECT COUNT(*) as count FROM teams').get().count,
      players: db.prepare('SELECT COUNT(*) as count FROM players').get().count,
      events: db.prepare('SELECT COUNT(*) as count FROM events').get().count,
      gallery: db.prepare('SELECT COUNT(*) as count FROM gallery').get().count,
      jobs: db.prepare('SELECT COUNT(*) as count FROM jobs').get().count,
    };
    res.json(stats);
  });

  app.get('/api/activity', authenticate, (req, res) => {
    const logs = db.prepare(`
      SELECT activity_log.*, users.username 
      FROM activity_log 
      JOIN users ON activity_log.user_id = users.id 
      ORDER BY timestamp DESC LIMIT 50
    `).all();
    res.json(logs);
  });

  app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist/index.html')));
  }

  app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();
