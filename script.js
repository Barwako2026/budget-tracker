// ===== Store Application Data =====
let monthlyBudget = 1500;
let expenseName = "Groceries";
let expenseAmount = 245;
let expenseCategory = "Food";
let isBudgetSet = true;

// ===== Collect User Input =====
let userBudgetInput = prompt("Enter your monthly budget ($):", "1500");
let userExpenseInput = prompt("Enter an expense amount ($):", "50");

let userBudget = Number(userBudgetInput);
let userExpense = Number(userExpenseInput);

// ===== Perform Budget Calculations =====
function calculateRemainingBalance(budget, expense) {
  return budget - expense;
}

function calculateSpentPercentage(budget, expense) {
  return (expense / budget) * 100;
}

let remainingBalance = calculateRemainingBalance(userBudget, userExpense);
let spentPercentage = calculateSpentPercentage(userBudget, userExpense);

// ===== Display Results in the Console =====
console.log("----- SpendWise Budget Summary -----");
console.log("Monthly Budget: $" + userBudget);
console.log("Expense Entered: $" + userExpense);
console.log("Remaining Balance: $" + remainingBalance);
console.log("Percentage of Budget Spent: " + spentPercentage.toFixed(1) + "%");

if (remainingBalance < 0) {
  console.log("Warning: You have gone over your budget!");
} else {
  console.log("You are within your budget.");
}
