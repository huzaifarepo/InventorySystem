// backend/routes/packedPaperRims.js
const express = require('express');
const router = express.Router();
const db = require('../Database');

// POST endpoint
router.post('/api/final-good', (req, res) => {
  const { productName, bundle,retail,quantity,description  } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO final_goods (productName,bundle,retail,quantity,description,EntryTime)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const now = new Date();
    const EntryTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Karachi' });
    stmt.run(productName,bundle,retail,quantity,description, EntryTime);

    res.status(201).json({ message: 'Product saved successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

router.get('/api/final-good', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM final_goods').all(); // fetch all rows
    res.json(rows); // return as JSON array
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


router.put('/api/final_good_update/:id', (req, res) => {
  const { id } = req.params;
  const { productName,bundle,retail,quantity,description } = req.body;
  

  const sql = `UPDATE final_goods SET productName = ?, bundle = ?, retail= ? ,quantity = ?, description=? WHERE id = ?`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(productName,bundle,retail,quantity,description,id);

    if (info.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/api/final_good_delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM final_goods WHERE id = ?`;

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

