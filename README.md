# Mira Web - Profile Setup

Web application for setting up user profiles for the Mira Discord bot.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

#### Discord OAuth2 Setup

1. Go to https://discord.com/developers/applications
2. Select your application (or create one)
3. Go to "OAuth2" → "General"
4. Copy your **Client ID** and **Client Secret**
5. Add redirect URL: `http://localhost:3000/api/auth/callback` (for development)
6. For production (Vercel), add: `https://your-app.vercel.app/api/auth/callback`

#### Supabase Setup

1. Go to https://supabase.com and create a project
2. Go to "Project Settings" → "API"
3. Copy your **Project URL** and **anon/public key**
4. Go to SQL Editor and run the schema from the main README

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 4. Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to https://vercel.com
3. Click "New Project" and import your repository
4. Add all environment variables from `.env`
5. Deploy!

## How It Works

1. User clicks "Setup Profile" button in Discord bot
2. Redirects to this web app
3. User logs in with Discord OAuth2
4. User enters their Minecraft username
5. App automatically fetches:
   - Minecraft skin from Mojang API
   - Minemen Club ELO (needs investigation)
   - User location from IP (ipapi.co)
6. Saves everything to Supabase
7. User can now use `/profile` command in Discord

## TODO

- [ ] Investigate Minemen Club API/scraping method
- [ ] Add profile editing functionality
- [ ] Add profile deletion
- [ ] Improve error handling
- [ ] Add rate limiting
