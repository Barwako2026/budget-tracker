# SpendWise Dashboard

A responsive budget tracking dashboard built with HTML, CSS, and JavaScript. Set a monthly budget, log expenses, and see instantly how your spending compares to your plan.

## Features

- Set a monthly budget and see a live status message, progress bar, and totals
- Add expenses with a description, amount, and category
- Remove individual expenses or clear them all
- Filter the expense list by category
- See spending broken down by category
- Data is saved in the browser (localStorage) so it is still there after a refresh

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: overview, forms, expense list, category breakdown |
| `style.css` | Responsive layout using CSS Grid and Flexbox |
| `script.js` | Application logic: data, decisions, loops, DOM updates, and events |

## How to Run

1. Download or clone this repository.
2. Open `index.html` in a web browser.
3. Set a budget, then start adding expenses.

## Week 6: What Improved in SpendWise

Before this week, SpendWise was a styled layout with JavaScript that only worked with single variables and the console. It is now a working application:

- Expenses are stored as records in an array instead of individual variables
- Results are displayed on the page instead of in the console
- Buttons, forms, and a dropdown respond to the user
- The budget status message changes based on how much has been spent

## How Conditionals Are Used

Conditionals let the app make decisions about the user's data.

- **Budget status:** `getBudgetStatus()` uses an `if / else if / else` chain to compare spending with the budget. It returns "On track" under 50% used, "Past the halfway mark" from 50%, "Close to your limit" from 80%, "Budget used up" at 100%, and "Over budget" beyond that. The status also sets the color of the overview.
- **Form validation:** Before an expense is added, the app checks that the description is not empty, the amount is a number greater than 0, and a category is chosen. If a check fails, an error message is shown and nothing is saved.
- **Large expense warning:** If a new expense is more than half of the monthly budget, the confirmation message turns into a warning.
- **Display choices:** The filter skips expenses that do not match the selected category, and empty-state messages only appear when there is nothing to show.

## How Arrays Are Used to Store Data

- `expenses` is an array of objects. Each object has an `id`, `description`, `amount`, `category`, and `date`.
- `CATEGORIES` is an array of category names. It builds both dropdowns and the category totals.
- New expenses are added with `push()`, and expenses are removed with `filter()` using the expense `id`.

Loops work through these arrays:

- A `for` loop adds up all amounts in `getTotalSpent()`.
- A `for...of` loop builds category totals in `getCategoryTotals()`.
- A backwards `for` loop in `renderExpenses()` shows the newest expense first.
- A `for` loop fills the category dropdowns.

## How the DOM Is Updated

After every change, `renderAll()` runs three functions:

- `renderOverview()` updates the status message, progress bar, and the Budget, Spent, and Remaining figures
- `renderExpenses()` clears the list and rebuilds it with `createElement()` and `appendChild()`
- `renderCategories()` rebuilds the category bars

Text is inserted with `textContent`, so anything a user types is displayed as plain text and never as HTML.

## How User Interactions Are Handled Through Events

| Event | Element | What happens |
| --- | --- | --- |
| `submit` | Budget form | Validates and saves the budget, then re-renders |
| `submit` | Expense form | Validates the input, adds the expense to the array, then re-renders |
| `click` | Expense list | Removes the matching expense (one listener handles every Remove button) |
| `change` | Category filter | Filters the visible expenses |
| `click` | Clear all button | Asks for confirmation, then empties the array |

The flow is always the same: **user action → event listener → data check → array updated → page re-rendered.**

## Challenges and How I Solved Them

- **Buttons created by JavaScript did not respond to clicks.** Remove buttons are created after the page loads, so listeners attached to them individually would be lost on every re-render. I used event delegation: one click listener on the list checks which button was clicked using `closest()` and a `data-id` attribute.
- **Totals like 0.1 + 0.2 gave long decimals.** JavaScript floating point math is not exact. I wrote a `roundMoney()` helper that rounds to two decimals and used it wherever totals are calculated.
- **Keeping the data and the page in sync.** At first, I updated the array in one place and the page in another, and they drifted apart. I fixed it by having every event change the array first and then call `renderAll()`, so the page always reflects the data.
- **Forms reloading the page.** The default form submit refreshed the page and wiped the input. `event.preventDefault()` stopped that.

## Future Improvements

- Edit an existing expense
- Set a separate budget per category
- Choose the currency and month

## Author

Built as part of my web development coursework.