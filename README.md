# Admin UI Frontend

This is the frontend admin dashboard for the project, built using Next.js 16 (App Router), TypeScript, and Tailwind CSS.

---

> [!IMPORTANT]  
> **First-time macOS Setup?**  
> If you are setting up a brand new macOS machine, please follow the step-by-step instructions in the [macOS Setup Guide](docs/setup-guide.md) to install all developer dependencies (Homebrew, Git, NVM, and Node.js 20).

---

## Quick Start

If you already have your development environment configured (Node.js 20+):

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy the sample environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Modify `.env.local` as needed.

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

*Note: Ensure your backend server is running (typically on `http://localhost:3001`).*

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
