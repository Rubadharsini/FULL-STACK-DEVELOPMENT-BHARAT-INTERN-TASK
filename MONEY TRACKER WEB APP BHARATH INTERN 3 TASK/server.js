const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// In-memory storage for transactions
let transactions = [];

// Get all transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// Add a new transaction
app.post('/api/transactions', (req, res) => {
  const { description, amount, type } = req.body;
  const newTransaction = { description, amount, type };
  transactions.push(newTransaction);
  res.json(newTransaction);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
