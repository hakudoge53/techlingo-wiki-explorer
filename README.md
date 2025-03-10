
# TechLingo Wiki Chrome Extension

A Chrome extension providing a glossary of technical terms and definitions for developers.

## Features

- Quick access to tech terminology right from your browser
- Search functionality to find specific terms
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

## Uploading to Chrome Web Store

1. Create a ZIP file of the `dist` directory
2. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Click "New Item" and upload your ZIP file
4. Fill in the required information and submit for review

