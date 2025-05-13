const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const packedPaperRimsRoutes = require('../backend/Routes/Paked_Paper_Rim_Route');
const RolledPaperrimsRoutes= require('./Routes/Rolled_Paper_Rim_Route');
const PackedCardRimsRoutes = require('./Routes/Packed_Card_Rim_Route');
const TitleCardRimsRoutes =require('./Routes/Title_Card_Rim_Route');
const FinalGoodsRoutes =require('./Routes/Final_Good_Route');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(packedPaperRimsRoutes);
app.use(RolledPaperrimsRoutes);
app.use(PackedCardRimsRoutes);
app.use(TitleCardRimsRoutes);
app.use(FinalGoodsRoutes);



const db = new Database('example.db');

// API route for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare('SELECT * FROM Login WHERE username = ? AND password = ?');
  const user = stmt.get(username, password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


