
# Complete Guide: Using Cursor with Gitpod

This comprehensive guide walks you through setting up and using Cursor with Gitpod for an enhanced development experience.

## What is Cursor?

Cursor is an AI-powered code editor built on VS Code that helps you understand, improve, and debug your code. It integrates GPT-4 directly into your editor for AI-assisted coding.

## Prerequisites

- A Gitpod account
- Cursor installed on your local machine (download from [cursor.sh](https://cursor.sh/))
- Basic familiarity with SSH connections

## Initial Setup

### 1. Start your Gitpod Workspace

When you start your Gitpod workspace, the SSH setup task will automatically:
- Generate an SSH key if one doesn't exist
- Display connection information in the terminal

### 2. Install Cursor Locally

- Download Cursor for your operating system from [cursor.sh](https://cursor.sh/)
- Follow the installation instructions for your OS
- Launch Cursor after installation

## Connecting Cursor to Gitpod

### 1. Get Connection Details

In your Gitpod terminal, look for the "CURSOR SSH CONNECTION SETUP" section, which contains:
- Your SSH public key
- Host URL
- Port (usually 22)
- Username (gitpod)

### 2. Configure Cursor

1. In Cursor, go to Settings (⚙️)
2. Select SSH > Add Remote
3. Enter the connection details:
   - Host: The URL from Gitpod (without https://)
   - Port: 22
   - Username: gitpod
4. Choose SSH Key authentication and paste your public key

### 3. Connect to Gitpod

1. Click "Connect" in Cursor
2. If prompted about host authenticity, click "Continue"
3. You should now see your Gitpod workspace files in Cursor

## Best Practices

### Optimizing Your Workflow

1. **Use Split Terminals**: Keep one terminal for Gitpod commands and another for Cursor operations
2. **Sync Local Changes**: If working between both interfaces, use `git pull` frequently
3. **Extend Session Timeout**: For longer coding sessions, use `gp timeout set` to extend your workspace lifetime

### Troubleshooting Connection Issues

If you encounter connection problems:

1. **Check Workspace Status**: Ensure your Gitpod workspace is running
2. **Verify Port Exposure**: Run `gp ports list` to confirm port 22 is exposed
3. **Reset Host Key**: If you get host verification errors, run `ssh-keygen -R "[hostname]"`
4. **Regenerate SSH Key**: If authentication fails, create a new key with:
   ```bash
   ssh-keygen -t ed25519 -C "gitpod-cursor" -f ~/.ssh/id_ed25519 -N ""
   ```
5. **Test Direct SSH**: Try connecting directly with SSH:
   ```bash
   ssh -T gitpod@[host-from-gitpod]
   ```

## Advanced Features

### Using AI Features in Cursor

With your connection established, you can use Cursor's AI features:
- Command+K (Mac) or Ctrl+K (Windows/Linux) to open the AI prompt
- Highlight code and press Command+L for explanations
- Use `/edit` command to suggest code improvements

### Customizing Your Setup

You can further enhance your Gitpod-Cursor setup:
- Add custom SSH config in your `~/.ssh/config` file
- Set up aliases for common commands
- Configure persistent workspace storage with Gitpod user settings

## Resources

- [Gitpod Documentation](https://www.gitpod.io/docs)
- [Cursor Documentation](https://cursor.sh/docs)
- [SSH Key Management Best Practices](https://www.ssh.com/academy/ssh/keygen)

