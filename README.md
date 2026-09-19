# SpendWise Dashboard

A responsive budget tracking dashboard built with HTML, CSS, and JavaScript.

## What SpendWise does

SpendWise is a budget tracking web app. It displays spending categories on a dashboard, and now uses JavaScript to collect a user's budget and an expense amount, calculate the remaining balance and percentage spent, and log the results to the browser console.

## JavaScript concepts implemented

- **Variables:** `let` variables store budgeting data such as the monthly budget, expense name, amount, category, and a boolean flag for whether a budget is set.
- **User input:** `prompt()` is used to ask the user for their monthly budget and an expense amount. The returned text is converted to numbers using `Number()`.
- **Calculations:** Two functions calculate the remaining balance (`budget - expense`) and the percentage of the budget spent (`(expense / budget) * 100`).
- **Functions:** `calculateRemainingBalance()` and `calculateSpentPercentage()` are reusable functions that take budget and expense values as parameters and return a result, keeping the calculation logic organized and separate from the rest of the script.
- **Output:** Results are printed to the browser console with `console.log()`, clearly labeled, along with a conditional message warning if the user has gone over budget.

## Features

- **Dashboard layout:** Sidebar navigation, header, and a grid of 6 category cards (Food, Transport, Rent, Entertainment, Savings, Utilities).
- **CSS Grid & Flexbox:** CSS Grid handles the overall page layout. Flexbox arranges items inside the sidebar, header, and each card.
- **CSS custom properties:** Colors are defined as variables in `:root` and reused throughout the stylesheet.
- **Responsive design:** A media query collapses the layout into a single column below 768px.
- **Micro-interactions:** Cards have a subtle lift and shadow animation on hover and keyboard focus.
- **Dark theme (stretch goal):** Overrides CSS variables using `prefers-color-scheme: dark`.

## Files

- `index.html` — page structure
- `style.css` — styling, layout, and responsive rules
- `script.js` — budgeting variables, user input, calculations, and console output
