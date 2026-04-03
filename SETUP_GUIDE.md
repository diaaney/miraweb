# Mira Profile System - Complete Setup Guide

This guide will walk you through setting up the complete profile system for Mira bot.

## 📋 Overview

The profile system consists of:
- **Discord Bot** - `/profile` command to view profiles
- **Web App** - User-friendly interface to create profiles
- **Supabase** - Database to store profile data

## 🚀 Step-by-Step Setup

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for it to initialize (~2 minutes)
4. Go to **SQL Editor** and run this schema:

```sql
-- Create profiles table
CREATE TABLE profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    discord_id TEXT UNIQUE NOT NULL,
    discord_username TEXT NOT NULL,
    minecraft_username TEXT NOT NULL,
    minecraft_uuid TEXT,
    skin_url TEXT,
    peak_elo INTEGER DEFAULT 0,
    current_elo INTEGER DEFAULT 0,
    country TEXT,
    country_emoji TEXT,
    city TEXT,
    state TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_discord_id ON profiles(discord_id);
CREATE INDEX idx_minecraft_username ON profiles(minecraft_username);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow all operations (you can make this stricter later)
CREATE POLICY "Allow all operations" ON profiles FOR ALL USING (true);
```

5. Go to **Settings** → **API**
6. Copy your **Project URL** and **anon/public key**

### 2. Discord OAuth2 Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your bot application
3. Go to **OAuth2** → **General**
4. Copy your **Client ID** and **Client Secret**
5. Under **Redirects**, add:
   - Development: `http://localhost:3000/api/auth/callback`
   - Production: `https://your-app.vercel.app/api/auth/callback` (after deploying)

### 3. Web App Setup

1. Navigate to the `mira-web` folder:
```bash
cd mira-web
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` with your credentials:
```env
# Discord OAuth2
DISCORD_CLIENT_ID=your_client_id_from_step_2
DISCORD_CLIENT_SECRET=your_client_secret_from_step_2
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXT_PUBLIC_DISCORD_OAUTH_URL=https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_from_step_1
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key_from_step_1

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run development server:
```bash
npm run dev
```

6. Open http://localhost:3000 to test!

### 4. Discord Bot Setup

1. Navigate to the bot folder:
```bash
cd ../mira
```

2. Update your `.env` file with Supabase credentials:
```env
DISCORD_TOKEN=your_existing_token

# Add these new lines:
SUPABASE_URL=your_supabase_url_from_step_1
SUPABASE_ANON_KEY=your_supabase_key_from_step_1
WEB_APP_URL=http://localhost:3000
```

3. Install Supabase client (if not already done):
```bash
npm install @supabase/supabase-js
```

4. Restart your bot

5. Test the `/profile` command in Discord!

### 5. Deploy to Vercel (Production)

1. Create a GitHub repository for `mira-web`

2. Go to [vercel.com](https://vercel.com) and sign up

3. Click **New Project** → Import your repository

4. Add environment variables in Vercel:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `DISCORD_REDIRECT_URI` = `https://your-app.vercel.app/api/auth/callback`
   - `NEXT_PUBLIC_DISCORD_OAUTH_URL` = Update with your Vercel URL
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` = `https://your-app.vercel.app`

5. Deploy!

6. Update Discord OAuth redirect URLs to include your Vercel URL

7. Update your bot's `.env`:
```env
WEB_APP_URL=https://your-app.vercel.app
```

8. Restart your bot

## 🔍 Testing the System

1. In Discord, type `/profile`
2. Bot should say you don't have a profile
3. Click "Setup Profile" button
4. Redirects to web app
5. Click "Login with Discord"
6. Authorize the application
7. Enter your Minecraft username
8. Click "Create Profile"
9. Go back to Discord
10. Type `/profile` again
11. See your beautiful profile! ✨

## 🐛 Troubleshooting

### "Profile system is not configured yet"
- Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in bot's `.env`
- Restart the bot

### OAuth redirect errors
- Check that redirect URLs match exactly in Discord Developer Portal
- Make sure you're using the correct Client ID in the OAuth URL

### "Minecraft player not found"
- Check that the username is spelled correctly
- Make sure the Mojang API is accessible

### Web app won't start
- Make sure all dependencies are installed (`npm install`)
- Check that all environment variables are set
- Check the console for error messages

## 📝 TODO: Minemen Club ELO

The Minemen Club ELO fetching needs to be investigated. Currently it returns mock data (1000 current, 1200 peak).

To fix this:

1. Open Minemen Club website in browser
2. Go to a player profile (e.g., `minemen.club/player/USERNAME`)
3. Open DevTools → Network tab
4. Look for API calls that fetch player data
5. Update `lib/apis.js` → `getMinemenElo()` function with the correct endpoint

Alternative: Use web scraping with Cheerio/Puppeteer if no public API exists.

## 🎉 You're Done!

Users can now create profiles and view them in Discord. Enjoy!
