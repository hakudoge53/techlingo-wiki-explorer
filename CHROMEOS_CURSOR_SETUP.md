
# Setting Up Cursor on ChromeOS Linux (Crostini)

This guide will help you set up Cursor IDE for development with this project on ChromeOS Linux.

## Option 1: Install Cursor in Linux Container

Cursor doesn't have an official Linux build, but you can try these approaches:

### Using the Unofficial Linux Package
```bash
# Download the unofficial AppImage (replace URL with the latest version)
wget https://cursor.sh/downloads/linux-arm64.AppImage -O cursor.AppImage

# Make it executable
chmod +x cursor.AppImage

# Run Cursor
./cursor.AppImage
```

If the AppImage doesn't work, you may need to install additional dependencies:
```bash
sudo apt update
sudo apt install libfuse2 libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils
```

## Option 2: Remote Development Setup

If installing Cursor locally doesn't work, you can use Cursor on another machine and connect to your ChromeOS Linux environment via SSH:

### 1. Set Up SSH Server on ChromeOS Linux

```bash
# Install OpenSSH server if not already installed
sudo apt update
sudo apt install openssh-server

# Start SSH service
sudo service ssh start

# Generate SSH key
ssh-keygen -t ed25519 -C "chromeos-cursor" -f ~/.ssh/id_ed25519 -N ""

# Display your public key (you'll need this for Cursor)
cat ~/.ssh/id_ed25519.pub

# Configure SSH to start automatically
echo "service ssh start" >> ~/.bashrc
```

### 2. Get Your Connection Details

```bash
# Find your Linux container's IP address
hostname -I

# Or for more detailed info
ip addr show
```

### 3. Connect from Cursor on Another Device

1. Install Cursor on a Windows or macOS device
2. In Cursor, go to Settings > SSH > Add Remote
3. Enter your ChromeOS Linux container's IP address, port 22, and your Linux username
4. Add your SSH public key when prompted
5. Connect to your remote environment

## Option 3: Use SSH Through GitHub Codespaces or Gitpod

If direct installation doesn't work, you can:

1. Push your code to GitHub
2. Start a Codespace or Gitpod workspace
3. Connect to that workspace from Cursor using SSH
4. Work on your code remotely

### Setting Up GitHub Codespaces for Cursor

This project already includes `.devcontainer` configuration, so:

1. Push your code to GitHub
2. Start a new Codespace from your repository
3. The Codespace will automatically set up an SSH key for Cursor connectivity
4. Copy the SSH key displayed in the terminal
5. Use this key to configure Cursor for remote connection from another device

## Option 4: Alternative IDEs

If Cursor still won't work properly, consider these alternatives:

1. **VS Code**: Install directly on ChromeOS Linux with:
   ```bash
   wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
   sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
   sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
   sudo apt update
   sudo apt install code
   ```

2. **GitHub Codespaces in Browser**: Access via github.dev with just a browser

## Troubleshooting

If you encounter issues:

- **AppImage doesn't run**: Try extracting with `./cursor.AppImage --appimage-extract` and run the executable inside the `squashfs-root` directory
- **Missing libraries**: Install with `sudo apt install [library-name]`
- **SSH connection issues**: Check your firewall settings with `sudo ufw status` and allow port 22 if needed

## Development Commands

Once you have an IDE set up:

- Start development server: `npm run dev`
- Build extension: `npm run build`
- Package extension: `cd dist && zip -r ../techlingo-wiki-extension.zip *`
