# ProgressiveChart Components

This directory contains Chart.js + react-chartjs-2 based components for creating real-time progressive search visualization.

## Components

### ChartContainer
Main container component that orchestrates the chart display.

**Props:**
- `chartData` (Object): Formatted chart data from `formatChartData()`
- `isLoading` (Boolean): Whether searches are initializing
- `searchPattern` (String): The regex pattern being searched
- `onBarClick` (Function): Callback when a bar is clicked
- `title` (String): Chart title (default: "Idiom-Corpora Histogram")

### ProgressiveBarChart
Core Chart.js horizontal bar chart with real-time updates.

**Props:**
- `data` (Object): Chart data object
- `onBarClick` (Function): Bar click handler
- `animationDuration` (Number): Animation duration in ms (default: 1000)

### ChartHeader
Header section with title, pattern, and progress information.

**Props:**
- `title` (String): Chart title
- `searchPattern` (String): Search pattern to display
- `totalCorpora` (Number): Total number of corpora
- `completedCorpora` (Number): Number of completed searches

### ChartLegend
Optional legend component showing corpus information.

**Props:**
- `corpora` (Array): Array of corpus objects
- `colors` (Array): Array of color strings

## Utility Functions

### `formatChartData(corporaResults)`
Transforms corpus search results into Chart.js compatible format.

**Input:** Array of corpus objects:
```javascript
[
  {
    id: 1,
    name: 'NYT',
    wordCount: 1100000,
    matches: 8,
    isLoading: false,
    isCompleted: true
  },
  // ...
]
```

**Output:** Chart data object:
```javascript
{
  labels: ['NYT (1.1M)', 'Gutenberg (22.0M)', ...],
  frequencies: [0.727, 0.773, ...],
  rawData: [...],
  colors: ['#FF6B6B', '#4ECDC4', ...],
  borderColors: [...]
}
```

### `updateCorpusInChartData(currentData, index, newData)`
Updates a single corpus in existing chart data.

### `calculateFrequency(matches, wordsScanned)`
Calculates frequency per 10,000 words.

## Usage Example

```javascript
import { ChartContainer, formatChartData, updateCorpusInChartData } from './ProgressiveChart';

function MySearchPage() {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize chart data
  const initializeChart = (corporaList) => {
    const initialData = corporaList.map(corpus => ({
      ...corpus,
      matches: 0,
      isLoading: true
    }));
    setChartData(formatChartData(initialData));
  };

  // Update individual corpus
  const updateCorpus = (corpusIndex, searchResults) => {
    setChartData(prevData => 
      updateCorpusInChartData(prevData, corpusIndex, {
        matches: searchResults.matches,
        isLoading: false,
        isCompleted: true
      })
    );
  };

  return (
    <ChartContainer
      chartData={chartData}
      isLoading={isLoading}
      searchPattern="\\bin a nutshell\\b"
      onBarClick={(corpus, data) => console.log('Clicked:', corpus)}
    />
  );
}
```

## Features

- **Real-time updates**: Bars grow and update as searches complete
- **Loading indicators**: Circular progress spinners for active searches
- **Interactive tooltips**: Show detailed match and frequency information
- **Responsive design**: Adapts to different screen sizes
- **Color-coded bars**: Different colors for each corpus
- **Horizontal layout**: Matches the wireframe design
- **Smooth animations**: Chart.js animations for visual appeal

## Dependencies

- chart.js
- react-chartjs-2
- @mui/material (for UI components)
- React (hooks: useState, useRef)
