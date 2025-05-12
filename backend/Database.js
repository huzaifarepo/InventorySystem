// backend/db.js
const Database = require('better-sqlite3');

// Connect to the SQLite database (using your existing file)
const db = new Database('./example.db');

// Ensure the 'Login' table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS Login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Ensure the 'packed_paper_rims' table exists
// db.exec(`
//   CREATE TABLE IF NOT EXISTS packed_paper_rims (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     productName TEXT,
//     size TEXT,
//     gram TEXT,
//     quantity INTEGER,
//     customer TEXT,
//     inUse INTEGER,
//     remaining INTEGER
//   )
// `);
db.exec(`
  CREATE TABLE IF NOT EXISTS packed_paper_rims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    size TEXT NOT NULL,
    gram TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    customer TEXT NOT NULL,
    inUse INTEGER NOT NULL,
    remaining INTEGER NOT NULL,
    EntryTime TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS rolled_paper_rims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    size TEXT NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    customer TEXT NOT NULL,
    EntryTime TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS packed_card_rims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    size TEXT NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    customer TEXT NOT NULL,
    EntryTime TEXT NOT NULL
  )
`);

// Insert a fixed user (only if not exists)
const checkUser = db.prepare('SELECT * FROM Login WHERE username = ?').get('admin');
if (!checkUser) {
  db.prepare('INSERT INTO Login (username, password) VALUES (?, ?)').run('admin', 'admin123');
}

module.exports = db;
