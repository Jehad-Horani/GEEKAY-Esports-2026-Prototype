
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

const JWT_SECRET = process.env.JWT_SECRET || 'geekay-esports-secret';

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

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    slug TEXT UNIQUE,
    category TEXT,
    excerpt TEXT,
    image TEXT,
    content TEXT,
    author TEXT,
    date TEXT,
    tags TEXT, -- JSON array of strings
    featured INTEGER DEFAULT 0,
    published INTEGER DEFAULT 1,
    readTime TEXT,
    related_team TEXT,
    related_game TEXT,
    display_order INTEGER DEFAULT 0
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

// Additional events table migrations
const addColumnSafely = (table: string, column: string, type: string) => {
  try {
    db.prepare(`SELECT ${column} FROM ${table} LIMIT 1`).get();
  } catch (e) {
    console.log(`Adding ${column} column to ${table} table...`);
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  }
};

addColumnSafely('events', 'banner', 'TEXT');
addColumnSafely('events', 'organizer', 'TEXT');
addColumnSafely('events', 'teams', 'TEXT');
addColumnSafely('events', 'matches', 'TEXT');
addColumnSafely('events', 'results', 'TEXT');
addColumnSafely('events', 'media', 'TEXT');
addColumnSafely('events', 'social', 'TEXT');

// Seed default events if table is empty
const eventCount: any = db.prepare('SELECT COUNT(*) as count FROM events').get();
if (eventCount.count === 0) {
  console.log('Seeding initial events into database...');
  const initialEvents = [
    {
      title: 'RLCS Major 2026',
      game: 'RL',
      type: 'tournament',
      start_date: '2026-02-10',
      end_date: '2026-02-15',
      time: '17:00',
      region: 'EMEA',
      status: 'finished',
      link: 'https://x.com/geekay_esports',
      featured: 1,
      description: 'The Rocket League Championship Series Major 1 gathers the best rosters globally to fight for EMEA dominance and international ranking points in London. Geekay Esports has qualified through exceptional regional performance and is set to clash with global giants.',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
      organizer: 'Psyonix / BLAST',
      teams: JSON.stringify([
        { name: "Geekay Esports", logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100", region: "Saudi Arabia" },
        { name: "Team Falcons", logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100&h=100", region: "Saudi Arabia" },
        { name: "Karmine Corp", logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=100&h=100", region: "France" },
        { name: "G2 Esports", logo: "https://images.unsplash.com/photo-1548685913-fe6574abf1a5?auto=format&fit=crop&q=80&w=100&h=100", region: "North America" }
      ]),
      matches: JSON.stringify([
        { date: "2026-02-10", teams: "Geekay vs Karmine Corp", score: "3 - 2", status: "completed" },
        { date: "2026-02-12", teams: "Geekay vs Team Falcons", score: "1 - 3", status: "completed" },
        { date: "2026-02-14", teams: "Karmine Corp vs G2 Esports", score: "3 - 1", status: "completed" }
      ]),
      results: JSON.stringify({
        winner: "Team Falcons",
        runnerUp: "Geekay Esports",
        mvp: "M7sN"
      }),
      media: JSON.stringify([
        { type: "photo", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=500" },
        { type: "photo", url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=500" },
        { type: "photo", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800&h=500" }
      ]),
      social: JSON.stringify([
        { platform: "twitter", handle: "@Geekay_Esports", text: "THE CHANCE TO MAKE HISTORY. We take on Karmine Corp in the opening round of the RLCS London Major! 🇸🇦 #GKDominance" },
        { platform: "instagram", handle: "geekay_esports", text: "London, we have arrived. The squad is locked in for the RLCS Major. Drop your support below! 👇 #GeekayArena" }
      ])
    },
    {
      title: 'PUBG Mobile World Cup',
      game: 'PUBG',
      type: 'tournament',
      start_date: '2026-02-18',
      end_date: '2026-02-23',
      time: '13:00',
      region: 'GLOBAL',
      status: 'upcoming',
      link: 'https://x.com/geekay_esports',
      featured: 1,
      description: 'The PUBG Mobile World Cup brings together top teams to battle on the grandest stage. With high stakes and mechanical mastery, Geekay Esports strives to make their mark on global PUBG Mobile history.',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
      organizer: 'Tencent Games / Krafton',
      teams: JSON.stringify([
        { name: "Geekay Esports", logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100", region: "Saudi Arabia" },
        { name: "Vampire Esports", logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100&h=100", region: "Thailand" },
        { name: "Nigma Galaxy", logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=100&h=100", region: "UAE" }
      ]),
      matches: JSON.stringify([
        { date: "2026-02-18", teams: "Group Stage Day 1", score: "Upcoming", status: "upcoming" },
        { date: "2026-02-19", teams: "Group Stage Day 2", score: "Upcoming", status: "upcoming" }
      ]),
      results: JSON.stringify({}),
      media: JSON.stringify([]),
      social: JSON.stringify([])
    },
    {
      title: 'VCT Global Finals 2026',
      game: 'VALORANT',
      type: 'tournament',
      start_date: '2026-10-12',
      end_date: '2026-10-18',
      time: '18:00',
      region: 'GLOBAL',
      status: 'upcoming',
      link: 'https://x.com/geekay_esports',
      featured: 1,
      description: 'The ultimate showcase of tactical FPS mastery. The VCT Global Finals 2026 in Tokyo will host the elite division of Valorant. Expect unparalleled aim and mind-bending strategy as Geekay takes on the global stage.',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
      organizer: 'Riot Games',
      teams: JSON.stringify([
        { name: "Geekay Esports", logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100", region: "Saudi Arabia" },
        { name: "Sentinels", logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100&h=100", region: "North America" },
        { name: "Fnatic", logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=100&h=100", region: "Europe" }
      ]),
      matches: JSON.stringify([
        { date: "2026-10-12", teams: "Geekay vs Sentinels", score: "TBD", status: "upcoming" }
      ]),
      results: JSON.stringify({}),
      media: JSON.stringify([]),
      social: JSON.stringify([])
    },
    {
      title: 'OWCS EMEA Stage 2',
      game: 'VALORANT',
      type: 'tournament',
      start_date: '2026-06-24',
      end_date: '2026-06-29',
      time: '16:00',
      region: 'EMEA',
      status: 'live',
      link: 'https://x.com/geekay_esports',
      featured: 1,
      description: 'The Overwatch Champions Series EMEA Stage 2 is currently underway, pitting the sharpest team-fighters in Europe and the Middle East against each other. Action-packed brawls and strategic compositions define this premier series.',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
      organizer: 'Blizzard Entertainment / ESL',
      teams: JSON.stringify([
        { name: "Geekay Esports", logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100", region: "Saudi Arabia" },
        { name: "Spacestation Gaming", logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100&h=100", region: "EMEA" },
        { name: "Twisted Minds", logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=100&h=100", region: "Saudi Arabia" }
      ]),
      matches: JSON.stringify([
        { date: "2026-06-24", teams: "Geekay vs SSG", score: "2 - 1", status: "live" },
        { date: "2026-06-25", teams: "Geekay vs Twisted Minds", score: "Upcoming", status: "upcoming" }
      ]),
      results: JSON.stringify({}),
      media: JSON.stringify([]),
      social: JSON.stringify([])
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO events (
      title, game, type, start_date, end_date, time, region, status, link, featured, description, banner, organizer, teams, matches, results, media, social, published
    ) VALUES (
      @title, @game, @type, @start_date, @end_date, @time, @region, @status, @link, @featured, @description, @banner, @organizer, @teams, @matches, @results, @media, @social, 1
    )
  `);

  initialEvents.forEach(e => stmt.run(e));
  console.log('Seeded initial events successfully.');
}

// Seed default news if table is empty
const newsCount: any = db.prepare('SELECT COUNT(*) as count FROM news').get();
if (newsCount.count === 0) {
  console.log('Seeding initial news into database...');
  const initialNews = [
    {
      title: 'GEEKAY SECURES SPOT IN INTERNATIONAL CHAMPIONSHIP QUALIFIERS',
      slug: 'international-qualifications-2026',
      category: 'TOURNAMENT',
      date: 'FEB 26, 2026',
      readTime: '5 MIN READ',
      excerpt: 'After a dominant regional run, our elite squads have officially qualified for the global stage in London.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=800',
      content: 'The competitive landscape in the MENA region is evolving at an unprecedented pace. As Geekay Esports continues to dominate the regional circuits, our focus remains on operational excellence and the professional development of our operatives. This latest update follows our strategic roadmap for the 2026 season, emphasizing our commitment to the global esports ecosystem.\n\nOur performance analytics team has been working closely with the coaching staff to refine tactics and ensure peak performance across all divisions. We are seeing significant growth in our strategic initiatives, particularly in the integration of youth talent into our championship-winning rosters.\n\nLooking ahead to the upcoming international qualifiers, we have implemented a rigorous training regimen designed to address high-pressure scenarios and diverse meta-shifts. Our operatives consistently demonstrate the resilience and technical proficiency required to compete at the highest levels of global competition.\n\nGeekay Esports values the overwhelming support from our community. Every victory is shared with our fans, and we are dedicated to delivering world-class entertainment and competitive success. Stay tuned for more operational briefings as we progress through the competitive calendar.',
      author: 'GEEKAY HQ',
      tags: JSON.stringify(['QUALIFIERS', 'CHAMPIONSHIP', 'LONDON', 'MENA']),
      featured: 1,
      published: 1,
      related_team: 'Rocket League Squad',
      related_game: 'RL'
    },
    {
      title: 'OFFICIAL GEEKAY ROCKET LEAGUE DECALS NOW AVAILABLE IN-GAME',
      slug: 'rl-decals-launch-2026',
      category: 'ANNOUNCEMENT',
      date: 'FEB 24, 2026',
      readTime: '3 MIN READ',
      excerpt: 'Represent the pride of MENA on the pitch. The 2026 GEEKAY decal collection is now live in the Rocket League item shop.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=800',
      content: 'We are thrilled to announce that the official Geekay Esports in-game decals are now officially live in the Rocket League Esports Shop! This marks a historic milestone for our organization and the entire Middle East and North Africa competitive gaming scene.\n\nDesigned with our signature premium dark navy and gold aesthetics, the 2026 decal allows fans and players alike to represent GEEKAY on the pitch. The bundle features both Home and Away decal variants, along with dynamic wheels and customized banners to deck out your battle-car in style.\n\nEvery purchase directly supports our Rocket League roster and competitive operations as we strive for global glory. Head over to the Rocket League Esports Shop today, grab your gear, and show the world the power of GEEKAY!',
      author: 'MARKETING TEAM',
      tags: JSON.stringify(['DECALS', 'ROCKET LEAGUE', 'SHOP', 'CUSTOMIZATION']),
      featured: 0,
      published: 1,
      related_team: 'Rocket League Squad',
      related_game: 'RL'
    },
    {
      title: 'MAJOR ROSTER UPDATE: GEEKAY REVEALS NEW TALENT FOR 2026 SEASON',
      slug: 'major-roster-announcement-2026',
      category: 'ROSTER',
      date: 'FEB 22, 2026',
      readTime: '4 MIN READ',
      excerpt: 'Strategic reinforcements have arrived. Meet the new operatives joining our championship-winning divisions.',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200&h=800',
      content: 'As we prepare to face the world on international stages, the GEEKAY command center is proud to announce strategic roster updates for our elite divisions. These roster acquisitions align perfectly with our goal of maintaining absolute regional dominance and breaking into the top tiers of international play.\n\nWe have secured some of the most mechanically gifted and tactically sound players in the EMEA region. These elite operatives have already begun training with our existing core and coaching staff, displaying incredible synergy and operational alignment.\n\n"We are building more than just a winning team; we are building a legacy," said our Competitive Director. "These new players bring a wealth of experience, hunger, and technical mastery that will elevate GEEKAY to new heights."\n\nMake sure to follow our socials to see the official player cards and upcoming roster deep-dive videos!',
      author: 'COMPETITIVE OPERATIONS',
      tags: JSON.stringify(['ROSTER', 'REINFORCEMENTS', 'SEASON 2026', 'NEW TALENT']),
      featured: 0,
      published: 1,
      related_team: 'Valorant Squad',
      related_game: 'VALORANT'
    }
  ];

  const newsStmt = db.prepare(`
    INSERT INTO news (
      title, slug, category, date, readTime, excerpt, image, content, author, tags, featured, published, related_team, related_game
    ) VALUES (
      @title, @slug, @category, @date, @readTime, @excerpt, @image, @content, @author, @tags, @featured, @published, @related_team, @related_game
    )
  `);

  initialNews.forEach(n => newsStmt.run(n));
  console.log('Seeded initial news successfully.');
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
  createCrudRoutes('news', 'News Article');

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
      news: db.prepare('SELECT COUNT(*) as count FROM news').get().count,
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
