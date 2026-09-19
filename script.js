"use strict";

/* ==========================================================
   SpendWise — script.js (Week 6)

   Flow of the app:
   user action (click / submit / change)
     -> event listener runs
       -> data is validated with conditionals
         -> the expenses array is updated
           -> renderAll() loops over the data and updates the page
   ========================================================== */

/* ---------- 1. DATA ---------- */

const CURRENCY = "$";
const STORAGE_KEY = "spendwise-data";
const CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Shopping", "Other"];

let monthlyBudget = 0;
let expenses = [];      // each item: { id, description, amount, category, date }
let nextId = 1;
let activeFilter = "All";

/* ---------- 2. DOM REFERENCES ---------- */

const overview = document.getElementById("overview");
const statusTitle = document.getElementById("status-title");
const statusMessage = document.getElementById("status-message");
const progressBar = document.querySelector(".progress");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");
const statBudget = document.getElementById("stat-budget");
const statSpent = document.getElementById("stat-spent");
const statRemaining = document.getElementById("stat-remaining");

const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const budgetMessage = document.getElementById("budget-message");

const expenseForm = document.getElementById("expense-form");
const expenseDescription = document.getElementById("expense-description");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseMessage = document.getElementById("expense-message");

const filterCategory = document.getElementById("filter-category");
const expenseList = document.getElementById("expense-list");
const emptyState = document.getElementById("empty-state");
const listCount = document.getElementById("list-count");
const clearButton = document.getElementById("clear-btn");

const categoryList = document.getElementById("category-list");
const categoryEmpty = document.getElementById("category-empty");

/* ---------- 3. HELPER FUNCTIONS ---------- */

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function formatMoney(amount) {
  const sign = amount < 0 ? "-" : "";
  return sign + CURRENCY + Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "form-message " + type;
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      monthlyBudget: monthlyBudget,
      expenses: expenses,
      nextId: nextId
    }));
  } catch (error) {
    console.warn("Could not save data:", error);
  }
}

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved && Array.isArray(saved.expenses)) {
      monthlyBudget = Number(saved.monthlyBudget) || 0;
      expenses = saved.expenses;
      nextId = Number(saved.nextId) || 1;

      // Make sure new ids never collide with saved ones
      for (const expense of expenses) {
        if (expense.id >= nextId) {
          nextId = expense.id + 1;
        }
      }
    }
  } catch (error) {
    console.warn("Could not load saved data:", error);
  }
}

// Loop: fill both category dropdowns from the CATEGORIES array
function populateCategoryOptions() {
  for (let i = 0; i < CATEGORIES.length; i++) {
    expenseCategory.appendChild(new Option(CATEGORIES[i], CATEGORIES[i]));
    filterCategory.appendChild(new Option(CATEGORIES[i], CATEGORIES[i]));
  }
}

/* ---------- 4. DATA PROCESSING (loops) ---------- */

// Loop: add up every amount in the expenses array
function getTotalSpent() {
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }

  return roundMoney(total);
}

// Loop: build an object of totals per category
function getCategoryTotals() {
  const totals = {};

  for (const name of CATEGORIES) {
    totals[name] = 0;
  }

  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  }

  return totals;
}

/* ---------- 5. DECISION MAKING (conditionals) ---------- */

function getBudgetStatus(spent, budget) {
  if (budget <= 0) {
    return {
      level: "neutral",
      title: "No budget yet",
      message: "Set a monthly budget to see how your spending compares."
    };
  }

  const percent = Math.floor((spent / budget) * 100);
  const remaining = roundMoney(budget - spent);

  if (spent > budget) {
    return {
      level: "over",
      title: "Over budget",
      message: "You are " + formatMoney(roundMoney(spent - budget)) +
        " over your budget. Hold off on non-essential spending."
    };
  } else if (spent === budget) {
    return {
      level: "warning",
      title: "Budget used up",
      message: "You have spent your entire budget. Any new expense puts you over."
    };
  } else if (percent >= 80) {
    return {
      level: "warning",
      title: "Close to your limit",
      message: "You have used " + percent + "% of your budget. Only " +
        formatMoney(remaining) + " left."
    };
  } else if (percent >= 50) {
    return {
      level: "caution",
      title: "Past the halfway mark",
      message: "You have used " + percent + "% of your budget. " +
        formatMoney(remaining) + " left to spend."
    };
  } else if (spent === 0) {
    return {
      level: "good",
      title: "Nothing spent yet",
      message: "Your full budget of " + formatMoney(budget) + " is available."
    };
  } else {
    return {
      level: "good",
      title: "On track",
      message: "You have used " + percent + "% of your budget. " +
        formatMoney(remaining) + " left to spend."
    };
  }
}

/* ---------- 6. DOM UPDATES (render functions) ---------- */

function renderOverview() {
  const spent = getTotalSpent();
  const remaining = roundMoney(monthlyBudget - spent);
  const status = getBudgetStatus(spent, monthlyBudget);
  const hasBudget = monthlyBudget > 0;
  const percent = hasBudget ? Math.floor((spent / monthlyBudget) * 100) : 0;
  const barPercent = Math.min(percent, 100);

  overview.className = "overview tone-" + status.level;
  statusTitle.textContent = status.title;
  statusMessage.textContent = status.message;

  statBudget.textContent = hasBudget ? formatMoney(monthlyBudget) : "Not set";
  statSpent.textContent = formatMoney(spent);
  statRemaining.textContent = hasBudget ? formatMoney(remaining) : "—";
  statRemaining.classList.toggle("is-negative", hasBudget && remaining < 0);

  progressFill.style.width = barPercent + "%";
  progressBar.setAttribute("aria-valuenow", String(barPercent));
  progressLabel.textContent = hasBudget ? percent + "% of your budget used" : "No budget set";
}

function createExpenseItem(expense) {
  const item = document.createElement("li");
  item.className = "expense-item";

  const main = document.createElement("div");
  main.className = "expense-main";

  const name = document.createElement("span");
  name.className = "expense-name";
  name.textContent = expense.description;

  const meta = document.createElement("span");
  meta.className = "expense-meta";

  const chip = document.createElement("span");
  chip.className = "chip";
  chip.textContent = expense.category;

  const date = document.createElement("span");
  date.textContent = new Date(expense.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  meta.append(chip, date);
  main.append(name, meta);

  const side = document.createElement("div");
  side.className = "expense-side";

  const amount = document.createElement("span");
  amount.className = "expense-amount";
  amount.textContent = formatMoney(expense.amount);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "remove-btn";
  remove.textContent = "Remove";
  remove.dataset.id = expense.id;
  remove.setAttribute("aria-label", "Remove " + expense.description);

  side.append(amount, remove);
  item.append(main, side);

  return item;
}

function renderExpenses() {
  expenseList.textContent = "";
  let shown = 0;

  // Loop backwards so the newest expense appears first
  for (let i = expenses.length - 1; i >= 0; i--) {
    const expense = expenses[i];

    if (activeFilter !== "All" && expense.category !== activeFilter) {
      continue;
    }

    expenseList.appendChild(createExpenseItem(expense));
    shown++;
  }

  listCount.textContent = shown + (shown === 1 ? " expense" : " expenses");
  emptyState.hidden = shown > 0;

  if (expenses.length === 0) {
    emptyState.textContent = "No expenses yet. Add your first one to get started.";
  } else {
    emptyState.textContent = "No expenses in this category.";
  }

  clearButton.disabled = expenses.length === 0;
}

function renderCategories() {
  const totals = getCategoryTotals();
  const spent = getTotalSpent();
  const rows = [];

  for (const name in totals) {
    if (totals[name] > 0) {
      rows.push({ name: name, total: roundMoney(totals[name]) });
    }
  }

  rows.sort(function (a, b) {
    return b.total - a.total;
  });

  categoryList.textContent = "";

  for (const row of rows) {
    const share = Math.round((row.total / spent) * 100);

    const item = document.createElement("li");

    const head = document.createElement("div");
    head.className = "category-head";

    const label = document.createElement("span");
    label.textContent = row.name;

    const value = document.createElement("span");
    value.textContent = formatMoney(row.total) + " (" + share + "%)";

    head.append(label, value);

    const bar = document.createElement("div");
    bar.className = "bar";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = share + "%";

    bar.appendChild(fill);
    item.append(head, bar);
    categoryList.appendChild(item);
  }

  categoryEmpty.hidden = rows.length > 0;
}

function renderAll() {
  renderOverview();
  renderExpenses();
  renderCategories();
}

/* ---------- 7. EVENT LISTENERS (user interactions) ---------- */

// Set the monthly budget
budgetForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = parseFloat(budgetInput.value);

  if (isNaN(value) || value <= 0) {
    showMessage(budgetMessage, "Enter a budget greater than 0.", "error");
    return;
  }

  monthlyBudget = roundMoney(value);
  saveData();
  renderAll();
  showMessage(budgetMessage, "Budget set to " + formatMoney(monthlyBudget) + ".", "success");
});

// Add a new expense
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = expenseDescription.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (description === "") {
    showMessage(expenseMessage, "Enter a description for this expense.", "error");
    expenseDescription.focus();
    return;
  } else if (isNaN(amount) || amount <= 0) {
    showMessage(expenseMessage, "Enter an amount greater than 0.", "error");
    expenseAmount.focus();
    return;
  } else if (category === "") {
    showMessage(expenseMessage, "Choose a category.", "error");
    expenseCategory.focus();
    return;
  }

  const expense = {
    id: nextId,
    description: description,
    amount: roundMoney(amount),
    category: category,
    date: new Date().toISOString()
  };

  nextId++;
  expenses.push(expense);
  saveData();
  renderAll();
  expenseForm.reset();
  expenseDescription.focus();

  // Feedback depends on the size of the expense compared to the budget
  if (monthlyBudget > 0 && expense.amount > monthlyBudget / 2) {
    showMessage(expenseMessage, "Added " + expense.description +
      ". Note: this is more than half of your monthly budget.", "warning");
  } else {
    showMessage(expenseMessage, "Added " + expense.description + " (" +
      formatMoney(expense.amount) + ").", "success");
  }
});

// Remove one expense (event delegation: one listener for every Remove button)
expenseList.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-id]");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  saveData();
  renderAll();
  showMessage(expenseMessage, "Expense removed.", "success");
});

// Filter the list by category
filterCategory.addEventListener("change", function () {
  activeFilter = filterCategory.value;
  renderExpenses();
});

// Clear every expense
clearButton.addEventListener("click", function () {
  if (confirm("Remove all expenses? This cannot be undone.")) {
    expenses = [];
    nextId = 1;
    activeFilter = "All";
    filterCategory.value = "All";
    saveData();
    renderAll();
    showMessage(expenseMessage, "All expenses cleared.", "success");
  }
});

/* ---------- 8. START THE APP ---------- */

function init() {
  populateCategoryOptions();
  loadData();

  if (monthlyBudget > 0) {
    budgetInput.value = monthlyBudget;
  }

  renderAll();
}

init();