# Variables de Entorno para Vercel

Copia estas variables en tu proyecto de Vercel:

## Discord OAuth2

```
DISCORD_CLIENT_ID=1441374733009682433
```

```
DISCORD_CLIENT_SECRET=G57kKOoBl8Dlc11a8ywLWRCVOi3HygQV
```

```
DISCORD_REDIRECT_URI=https://miraweb-jade.vercel.app/api/auth/callback
```

```
NEXT_PUBLIC_DISCORD_OAUTH_URL=https://discord.com/api/oauth2/authorize?client_id=1441374733009682433&redirect_uri=https%3A%2F%2Fmiraweb-jade.vercel.app%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify
```

## Supabase

```
NEXT_PUBLIC_SUPABASE_URL=https://rscnkbrkhhosnfyiwofi.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY25rYnJraGhvc25meWl3b2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTkzMTgsImV4cCI6MjA5MDc3NTMxOH0.B5mPHIsvG6neye_De9EI2cYkWe-Mgs5FUO1ZAXm6EjY
```

## App URL

```
NEXT_PUBLIC_APP_URL=https://miraweb-jade.vercel.app
```

---

## Cómo agregar en Vercel:

1. Ve a https://vercel.com/diaaney/miraweb/settings/environment-variables
2. Para cada variable:
   - Pega el nombre (ej: `DISCORD_CLIENT_ID`)
   - Pega el valor
   - Selecciona: Production, Preview, Development
   - Click "Add"
3. Después de agregar todas, ve a "Deployments"
4. Click en los 3 puntos del último deploy → "Redeploy"

---

## IMPORTANTE: Configurar Discord Developer Portal

También necesitas agregar la redirect URL en Discord:

1. Ve a https://discord.com/developers/applications/1441374733009682433
2. OAuth2 → General
3. En "Redirects", agrega:
   ```
   https://miraweb-jade.vercel.app/api/auth/callback
   ```
4. Click "Save Changes"
