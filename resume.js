const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionForm = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    let income = 0, expense = 0, balance = 0;
    
    transactionList.innerHTML = "";
    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${transaction.description} 
            <span>${transaction.amount > 0 ? "+" : "-"}$${Math.abs(transaction.amount)}</span>
            <span onclick="deleteTransaction(${index})">❌</span>
        `;
        transactionList.appendChild(li);

        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expense += Math.abs(transaction.amount);
        }
        balance += transaction.amount;
    });

    balanceEl.textContent = balance.toFixed(2);
    incomeEl.textContent = `Rs${income.toFixed(2)}`;
    expenseEl.textContent = `Rs${expense.toFixed(2)}`;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (!description || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    transactions.push({ description, amount });
    updateUI();

    descriptionInput.value = "";
    amountInput.value = "";
});

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();
