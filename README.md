
# TechLingo Wiki Chrome Extension

A Chrome extension providing a glossary of technical terms and definitions for recruiters and developers.

## Features

- Quick access to tech terminology right from your browser
- Search functionality to find specific terms
- Category filtering to browse terms by category
- Highlights technical terms on web pages
- Shows tooltips with definitions when hovering over highlighted terms
- Clean, minimalist design with smooth animations
- Responsive popup interface

## Development

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Getting Started

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### Building the Extension

```sh
# Build the extension
npm run build
```

The built extension will be in the `dist` folder.

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select the `dist` directory from your project
4. The extension should now appear in your extensions list and be available in the toolbar

## Features

### Term Highlighting

The extension can highlight technical terms on any web page you visit. Simply:

1. Open the extension popup
2. Click the "Highlight Terms on This Page" button
3. All technical terms found in the page will be highlighted
4. Hover over a highlighted term to see its definition

### Search

You can search for specific terms in the extension's database:

1. Open the extension popup
2. Type your search query in the search bar
3. Results will filter in real-time

### Category Filtering

Browse terms by category:

1. Open the extension popup
2. Click on a category button
3. View terms filtered by that category

## Extension Structure

- `manifest.json`: Extension configuration
- `content.js`: Handles term highlighting on web pages
- React components:
  - `App.tsx`: Main extension popup
  - `TermList.tsx`: Displays the list of terms
  - `TermCard.tsx`: Individual term display
  - `Search.tsx`: Search component
  - `Settings.tsx`: Extension settings

## Future Improvements

- Add user-defined custom terms
- Improve matching algorithm (stemming, lemmatization)
- Add dark mode
- Export/import glossary data
- Customize highlight colors
