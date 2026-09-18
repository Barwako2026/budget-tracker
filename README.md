# My Budget Tracker

A simple front-end budget tracking web page built with HTML and CSS. This project is being developed incrementally week by week as part of a coding course, starting from a basic layout and progressively adding structure, styling, and interactivity.

## What's Built So Far

### Structure & Layout
- A header section with a logo image and page title.
- An "Add Expense" form section for entering new expenses.
- An "Expenses" section displaying existing expenses in a table.

### Expense Table
- Built using semantic HTML: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`.
- Column headers: Name, Amount, Category, Date.
- Pre-filled with 5 sample expense rows (hardcoded data — no JavaScript yet).
- Styled with `border-collapse: collapse`, padded cells, a colored header row, and alternating row background colors for readability.

### Add Expense Form
- Wrapped in a proper `<form>` element.
- Text input for expense name (`#expense-name`) and number input for amount (`#expense-amount`).
- A `<select>` dropdown for category (`#expense-category`) with 5 options: Food, Transport, Rent, Entertainment, Other.
- A `<button type="button">` labeled "Add Expense" — not yet functional; JavaScript logic will be added in a later week.
- All inputs have matching `id` attributes so they can be targeted by JavaScript in the future.

### Multimedia
- A logo image near the main heading, using `<img>` with `src`, `alt`, and `width` attributes.
- An embedded YouTube video (a budgeting tips video) using an `<iframe>` with `width`, `height`, `src`, `title`, and `frameborder` attributes.

### Interactive Elements
- A collapsible `<details>`/`<summary>` section explaining how to use the tracker.
- A `:hover` effect on table rows that highlights the row under the mouse.
- `cursor: pointer` on the "Add Expense" button to indicate it's clickable.

### CSS Selectors Used
- **Descendant selector**: `#expense-list td` — styles table cell text size.
- **Direct child selector**: `#add-expense > input` — styles only the direct input children of the form section.
- **Positional pseudo-class**: `tbody tr:first-child` — bolds the first row of the table.
- **Negation pseudo-class**: `input:not([type="number"])` — styles text inputs differently from number inputs.
- **Focus state**: `input:focus, select:focus` — adds a visible outline when a form field is focused, for accessibility.

## Files
- `index.html` — page structure and content.
- `style.css` — all styling and layout rules.
- `README.md` — this file.

## How to View
Open `index.html` in any web browser. No build steps or dependencies required.

## Coming Later
- JavaScript functionality to actually add, calculate, and display expenses dynamically (planned for a future week).