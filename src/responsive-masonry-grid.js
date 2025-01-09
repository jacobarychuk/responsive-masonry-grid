import React, { useState, useRef, createRef, useEffect } from 'react';

function Masonry({ items, columnWidth, maxColumns, spacing }) {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const remSpacing = spacing * rootFontSize;
  const remColumnWidth = columnWidth * rootFontSize;
  const [columns, setColumns] = useState(maxColumns);
  const [columnData, setColumnData] = useState(Array.from({ length: columns }, () => []));
  const gridRef = useRef(null);
  const itemRefs = Array.from({ length: items.length }, () => createRef());

  // Distributes items into columns based on their height
  useEffect(() => {
    const columnHeights = Array.from({ length: columns }, () => 0);
    const newColumnData = Array.from({ length: columns }, () => []);

    itemRefs.forEach((ref, index) => {
      if (!ref?.current) return;

      const itemHeight = ref.current.offsetHeight || 0;
      const smallestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumnData[smallestColumnIndex].push(items[index]);
      columnHeights[smallestColumnIndex] += itemHeight;
    });

    setColumnData(newColumnData);
  }, [items, columns]);

  useEffect(() => {
    const handleResize = () => {
      if (!gridRef.current) return;

      const offsetWidth = gridRef.current.offsetWidth;
      const gridWidth = offsetWidth - remSpacing * 2; // Account for padding on both sides
      const newColumns = Math.min(
        maxColumns,
        Math.max(1, Math.floor((gridWidth + remSpacing) / (remColumnWidth + remSpacing))) // Account for gap between columns
      );

      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (gridRef.current) resizeObserver.observe(gridRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  });

  return (
    <div
      key={columns}
      style={{
        justifyContent: 'center',
        alignItems: 'start',
        gap: remSpacing,
        display: 'flex',
        padding: remSpacing,
      }}
      ref={gridRef}
    >
      {/* Hidden container for initial rendering */}
      <div style={{ visibility: 'hidden', position: 'absolute', height: '0', overflow: 'hidden' }}>
        {items.map((item, index) => (
          <div key={index} ref={itemRefs[index]}>
            {item}
          </div>
        ))}
      </div>

      {/* Visible grid with columns */}
      {columnData && columnData.map((columnItems, columnIndex) => (
        <div key={columnIndex}>
          {columnItems.map((item, itemIndex) => (
            <div
              key={itemIndex}
              style={{ marginBottom: itemIndex !== columnItems.length - 1 ? remSpacing : 0 }}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Masonry;
