
# Development Container Setup with Cursor

This project is configured to work with GitHub Codespaces and local development containers. This guide explains how to connect Cursor to your development environment.

## Connecting with GitHub Codespaces

When you start a new GitHub Codespace for this project:

1. The devcontainer will automatically set up an SSH key for Cursor connectivity
2. You'll see the SSH key displayed in the terminal after startup
3. Use this key to configure Cursor for remote connection

## Manual SSH Setup

If you need to set up SSH access manually:

```bash
# Generate a new SSH key
ssh-keygen -t ed25519 -C "codespace-cursor-connection"

# Display your public key
cat ~/.ssh/id_ed25519.pub
```

## Connecting Cursor

1. Copy the SSH public key displayed in your terminal
2. Add this key to Cursor's SSH configuration
3. Connect using Cursor's remote development features

## Verifying Connection

After connecting:
- Ensure Cursor can access all project files
- Verify terminal access works from Cursor
- Test your development workflow to ensure everything is correctly set up

## Additional Resources

- [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)
- [Cursor Remote Development Documentation](https://cursor.sh/docs)
