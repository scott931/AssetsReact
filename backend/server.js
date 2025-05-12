const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Asset Management API is running' });
});

// API Routes
app.get('/api/stats', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM stats');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/assets', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM assets');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/assets', async (req, res) => {
  try {
    const { description, financedBy, serialNumber, tagNumber, makeModel, deliveryDate,
            originalLocation, currentLocation, purchaseAmount, depreciationRate,
            responsibleOfficer, condition } = req.body;

    const [result] = await db.query(
      'INSERT INTO assets (description, financedBy, serialNumber, tagNumber, makeModel, deliveryDate, originalLocation, currentLocation, purchaseAmount, depreciationRate, responsibleOfficer, `condition`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [description, financedBy, serialNumber, tagNumber, makeModel, deliveryDate, originalLocation, currentLocation, purchaseAmount, depreciationRate, responsibleOfficer, condition]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error adding asset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, financedBy, serialNumber, tagNumber, makeModel, deliveryDate,
            originalLocation, currentLocation, purchaseAmount, depreciationRate,
            responsibleOfficer, condition } = req.body;

    await db.query(
      'UPDATE assets SET description = ?, financedBy = ?, serialNumber = ?, tagNumber = ?, makeModel = ?, deliveryDate = ?, originalLocation = ?, currentLocation = ?, purchaseAmount = ?, depreciationRate = ?, responsibleOfficer = ?, `condition` = ? WHERE id = ?',
      [description, financedBy, serialNumber, tagNumber, makeModel, deliveryDate, originalLocation, currentLocation, purchaseAmount, depreciationRate, responsibleOfficer, condition, id]
    );

    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM assets WHERE id = ?', [id]);
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});