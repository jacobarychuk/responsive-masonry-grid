# `responsive-masonry-grid`

A standalone React component for creating a pixel-perfect masonry grid layout, adaptable to any viewport size.

# Is this package right for your project?

Consider using this package if:
- You need to arrange **grid items of variable height and uniform width** to maximize space efficiency
- You require a responsive, pixel-perfect layout that adapts seamlessly to **all viewport sizes**
- You prefer a lightweight solution with **no external dependencies**
- You value **performance and minimal re-renders** for a smooth user experience

# Installation:

Install the package in your project directory with:

```bash
npm install responsive-masonry-grid
```

# Usage:

```javascript
import Masonry from 'responsive-masonry-grid';

function App() {
  const items = [
    <div style={{ width: '20rem', height: '25rem', backgroundColor: 'red' }}></div>,
    <div style={{ width: '20rem', height: '10rem', backgroundColor: 'orange' }}></div>,
    <div style={{ width: '20rem', height: '20rem', backgroundColor: 'yellow' }}></div>,
    <div style={{ width: '20rem', height: '25rem', backgroundColor: 'green' }}></div>,
    <div style={{ width: '20rem', height: '30rem', backgroundColor: 'blue' }}></div>,
    <div style={{ width: '20rem', height: '25rem', backgroundColor: 'indigo' }}></div>,
    <div style={{ width: '20rem', height: '20rem', backgroundColor: 'violet' }}></div>,
  ];

  return <Masonry items={items} columnWidth={20} maxColumns={3} spacing={2} />;
}

export default App;
```

# Props:

## `items`

An array of React elements to display in the grid.

## `columnWidth`

Specifies the width of each column, in units of `rem`, as a numeric value. For example, to create columns with a width of `20rem`, provide the value `20`.

## `maxColumns`

Specifies the maximum number of columns in the grid. The actual number of columns displayed adjusts dynamically based on the viewport width, but there will always be at least one column.

## `spacing`

Specifies the spacing around each item, in units of `rem`, as a numeric value. For example, to create spacing of `2rem`, provide the value `2`.
