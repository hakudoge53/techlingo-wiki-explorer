
# SSH Connection Setup for Cursor

This guide explains how to connect Cursor to your Gitpod workspace via SSH.

## Step 1: Start Your Gitpod Workspace

1. Go to your GitHub repository
2. Click the Gitpod button (or prepend `gitpod.io/#` to your repository URL)
3. Wait for the workspace to initialize

## Step 2: Get SSH Connection Details

When your Gitpod workspace starts, you'll see SSH connection information displayed in the terminal. This includes:

- Your SSH public key
- Host URL
- Port (22)
- Username (gitpod)

## Step 3: Set up Cursor

1. Download and install Cursor from [cursor.sh](https://cursor.sh/)
2. Open Cursor on your local machine
3. Go to Settings > SSH > Add Remote
4. Enter the connection details from your Gitpod terminal:
   - Host: The URL shown (without https://)
   - Port: 22
   - Username: gitpod
5. For authentication, choose "SSH Key" and use the key displayed in your terminal

## Step 4: Connect and Start Coding

1. Once configured, click "Connect" in Cursor
2. You should now have access to your Gitpod workspace files through Cursor
3. Try opening and editing a file to verify everything works

## Troubleshooting

If you encounter connection issues:

- Make sure your Gitpod workspace is still running
- Verify port 22 is exposed (this should be automatic)
- Try running `gp ports expose 22` in the Gitpod terminal
- Check if your SSH key was correctly copied
- Restart your Gitpod workspace and try again

For more detailed information, see the complete guide in GITPOD_CURSOR_GUIDE.md
