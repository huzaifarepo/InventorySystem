// backend/routes/packedPaperRims.js
const express = require('express');
const router = express.Router();
const db = require('../Database');

// POST endpoint
router.post('/api/packed-paper-rims', (req, res) => {
  const { productName, size, gram, quantity, customer, inUse, remaining } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO packed_paper_rims (productName, size, gram, quantity, customer, inUse, remaining,EntryTime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const now = new Date();
    const EntryTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Karachi' });
    stmt.run(productName, size, gram, quantity, customer, inUse, remaining,EntryTime);

    res.status(201).json({ message: 'Product saved successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

router.get('/api/packed-paper-rims', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM packed_paper_rims').all(); // fetch all rows
    res.json(rows); // return as JSON array
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


router.put('/api/update/:id', (req, res) => {
  const { id } = req.params;
  const { productName, size, gram, quantity, customer, inUse } = req.body;
  const remaining = Math.max(quantity - inUse, 0);

  const sql = `UPDATE packed_paper_rims SET productName = ?, size = ?, gram = ?, quantity = ?, customer = ?, inUse = ?, remaining = ? WHERE id = ?`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(productName, size, gram, quantity, customer, inUse, remaining, id);

    if (info.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM packed_paper_rims WHERE id = ?`;

  try {
    // Preparing and running the SQL query
    const stmt = db.prepare(sql);
    const info = stmt.run(id);

    // Checking if any row was deleted
    if (info.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});





module.exports = router;

