
# SSH Connection Setup for Cursor

This guide explains how to connect Cursor to your Gitpod workspace via SSH.

## Automated Setup

When you start your Gitpod workspace, an automated task will:
1. Generate an SSH key (if one doesn't exist)
2. Display your public key and connection information

## Manual Setup Steps

### 1. Copy Your SSH Public Key

The public key is displayed in the terminal when your workspace starts. You can also view it anytime with:

```bash
cat ~/.ssh/id_ed25519.pub
```

### 2. Configure Cursor

- Download and install Cursor from [cursor.sh](https://cursor.sh/)
- Open Cursor on your local machine
- Go to Settings > SSH > Add Remote
- Enter the connection details displayed in your Gitpod terminal:
  - Host: The URL shown in your Gitpod terminal (without https://)
  - Port: 22
  - Username: gitpod
- When prompted for authentication, choose "SSH Key" and paste your public key

### 3. Test the connection

- Click "Connect" in Cursor
- You should now have access to your Gitpod workspace files
- Try opening and editing a file to confirm everything works

## Troubleshooting

If you encounter connection issues:

### Connection Refused
- Ensure your Gitpod workspace is still running
- Check if port 22 is exposed (it should be configured in .gitpod.yml)
- Try restarting your workspace with `gp stop && gp start`

### Authentication Failed
- Verify you're using the correct SSH key
- Check if your key has the correct permissions: `chmod 600 ~/.ssh/id_ed25519`
- Regenerate your SSH key if needed: `ssh-keygen -t ed25519 -C "gitpod-cursor" -f ~/.ssh/id_ed25519 -N ""`

### Invalid Host Key
If you see a "host key verification failed" error:
```bash
ssh-keygen -R "[hostname]"
```

### Linux-Specific Troubleshooting
If you're using Linux and Cursor appears as a directory:
```bash
# Find the Cursor executable
find /opt -name "cursor" -type f 2>/dev/null

# Make it executable if needed
chmod +x /path/to/cursor

# Run it directly
/path/to/cursor
```

## Additional Resources

- [Gitpod SSH Documentation](https://www.gitpod.io/docs/configure/ssh)
- [Cursor SSH Documentation](https://cursor.sh/docs/ssh)
- [Cursor GitHub Repository](https://github.com/getcursor/cursor)

