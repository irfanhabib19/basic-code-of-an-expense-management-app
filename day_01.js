document.addEventListener('DOMContentLoaded', () => {
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseAmountInput = document.getElementById('expense-amount');
    const budgetAmountInput = document.getElementById('budget-amount');
    const setBudgetBtn = document.getElementById('set-budget-btn');
    const expensesList = document.getElementById('expenses-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    const budgetMessage = document.getElementById('budget-message');
    let totalAmount = 0;
    let monthlyBudget = 0;

    addExpenseBtn.addEventListener('click', () => {
        const description = expenseDescriptionInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (description && !isNaN(amount) && amount > 0) {
            addExpense(description, amount);
            updateTotal(amount);
            clearInputs();
            checkBudget();
        } else {
            alert('Please enter a valid description and amount.');
        }
    });

    setBudgetBtn.addEventListener('click', () => {
        const budget = parseFloat(budgetAmountInput.value);

        if (!isNaN(budget) && budget > 0) {
            monthlyBudget = budget;
            checkBudget();
        } else {
            alert('Please enter a valid budget amount.');
        }
    });

    expensesList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const li = e.target.parentElement;
            const amount = parseFloat(li.dataset.amount);
            li.remove();
            updateTotal(-amount);
            checkBudget();
        }
    });

    function addExpense(description, amount) {
        const li = document.createElement('li');
        li.dataset.amount = amount;
        li.innerHTML = `${description} - $${amount.toFixed(2)} <span>&times;</span>`;
        expensesList.appendChild(li);
    }

    function updateTotal(amount) {
        totalAmount += amount;
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function clearInputs() {
        expenseDescriptionInput.value = '';
        expenseAmountInput.value = '';
    }

    function checkBudget() {
        if (monthlyBudget > 0 && totalAmount > monthlyBudget) {
            budgetMessage.textContent = 'Warning: Expenses exceed budget!';
        } else {
            budgetMessage.textContent = '';
        }
    }
});
