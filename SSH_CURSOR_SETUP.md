
# SSH Connection Setup for Cursor

This guide explains how to connect Cursor to your Gitpod workspace via SSH.

## Automated Setup

When you start your Gitpod workspace, an automated task will:
1. Generate an SSH key (if one doesn't exist)
2. Display your public key and connection information

## Manual Setup Steps

### 1. Add your SSH key to Gitpod

- Copy the public key displayed in the terminal
- Go to [Gitpod User Settings](https://gitpod.io/user/settings)
- Click on the "SSH Keys" tab
- Paste your public key and save

### 2. Configure Cursor

- Open Cursor on your local machine
- Go to Settings > SSH > Add Remote
- Enter the host and port displayed in your Gitpod terminal
- When prompted, use the SSH key you generated

### 3. Test the connection

- Click "Connect" in Cursor
- You should now have access to your Gitpod workspace files

## Troubleshooting

If you encounter connection issues:
- Ensure your public key is correctly added to Gitpod
- Check if your Gitpod workspace is still running
- Verify that you're using the correct host and port
- Try restarting your Gitpod workspace and reconnecting

## Additional Resources

- [Gitpod SSH Documentation](https://www.gitpod.io/docs/configure/ssh)
- [Cursor SSH Documentation](https://cursor.sh/docs/ssh)

