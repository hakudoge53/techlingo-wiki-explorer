
# Using Cursor in GitHub Codespaces

This guide explains how to use Cursor directly within GitHub Codespaces without requiring a local machine.

## Overview

GitHub Codespaces provides a complete development environment in the cloud. Cursor is an AI-powered code editor that can be used directly within your Codespace.

## Installation Options

### Option 1: Use Cursor Web Version

1. Open your GitHub Codespace
2. In a new browser tab, go to [https://cursor.sh](https://cursor.sh)
3. Look for the "Launch Web Version" or "Use Cursor Web" option
4. Authenticate with GitHub when prompted
5. Select your active Codespace from the list of available environments

### Option 2: Install Cursor in Codespace (VS Code Extension)

If Cursor offers a VS Code extension:

1. In your Codespace VS Code interface, navigate to the Extensions panel (Ctrl+Shift+X)
2. Search for "Cursor"
3. Install the Cursor extension if available
4. Follow the extension's activation instructions

## Connecting to Your Repository

Once Cursor is set up:

1. Ensure you're authenticated with GitHub
2. Select the TechLingo Wiki Extension repository
3. You should now have full access to edit your code with Cursor's AI features

## Testing Your Extension

After making changes with Cursor, you can test your extension:

```bash
# Build the extension
npm run build

# The extension will be built to the dist/ directory
# You can then load it into Chrome using the "Load unpacked" option
```

## Troubleshooting

- If you encounter permission issues, ensure your GitHub account has proper access to the repository
- For connection problems, try refreshing your Codespace session
- If Cursor features aren't working, check if your Codespace has the required resources allocated

## Additional Resources

- [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)
- [Cursor Documentation](https://cursor.sh/docs)
