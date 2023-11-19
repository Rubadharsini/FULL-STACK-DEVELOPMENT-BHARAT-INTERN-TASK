document.addEventListener('DOMContentLoaded', function () {
  // Fetch transactions on page load
  fetchTransactions();

  // Handle form submission
  document.getElementById('transactionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addTransaction();
  });
});

function fetchTransactions() {
  fetch('/api/transactions')
    .then(response => response.json())
    .then(transactions => displayTransactions(transactions));
}

function displayTransactions(transactions) {
  const transactionsContainer = document.getElementById('transactions');
  transactionsContainer.innerHTML = '';

  transactions.forEach(transaction => {
    const transactionDiv = document.createElement('div');
    transactionDiv.classList.add('transaction');
    transactionDiv.textContent = `${transaction.description} - $${transaction.amount} (${transaction.type})`;
    transactionsContainer.appendChild(transactionDiv);
  });
}

function addTransaction() {
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description, amount, type }),
  })
    .then(response => response.json())
    .then(newTransaction => {
      fetchTransactions();
    });
}
