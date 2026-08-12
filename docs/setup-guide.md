# macOS Development Setup Guide

This guide is designed for developers setting up a brand new macOS machine to run the `admin_ui` project.

---

## 1. Install Homebrew

Homebrew is the package manager for macOS.

1. Open your terminal and run the following command:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Add Homebrew to your shell configuration (`~/.zprofile`):

   **For Apple Silicon (M1/M2/M3/M4) Macs:**
   ```bash
   echo >> ~/.zprofile
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```

   **For Intel Macs:**
   ```bash
   echo >> ~/.zprofile
   echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/usr/local/bin/brew shellenv)"
   ```

3. Verify that Homebrew is installed correctly:
   ```bash
   brew --version
   ```

---

## 2. Install Git

Use Homebrew to install Git:

```bash
brew install git
```

Verify the installation:
```bash
git --version
```

---

## 3. Install NVM (Node Version Manager)

NVM allows you to install and manage multiple versions of Node.js.

1. Install NVM using curl:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

2. Add the following lines to your `~/.zshrc` file to load NVM automatically when opening a new terminal session:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
   ```

3. Reload your terminal configuration:
   ```bash
   source ~/.zshrc
   ```

4. Verify that NVM is installed correctly:
   ```bash
   nvm --version
   ```

---

## 4. Install Node.js

This project requires **Node.js 20 (LTS)**.

1. Install and use Node.js 20 using NVM:
   ```bash
   nvm install 20
   nvm use 20
   ```

2. Set Node.js 20 as the default version for new shell sessions:
   ```bash
   nvm alias default 20
   ```

3. Verify the installed version:
   ```bash
   node -v
   npm -v
   ```

---

## 5. Project Installation & Setup

1. Clone the project repository (if not already done):
   ```bash
   git clone <repository-url>
   cd admin_ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the sample environment file to create a local environment file:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Edit `.env.local` to adjust backend API URLs if yours differ from the defaults.*

---

## 6. Run the Development Server

1. Start the local server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

3. Make sure the backend server is running separately (usually on `http://localhost:3001`).
