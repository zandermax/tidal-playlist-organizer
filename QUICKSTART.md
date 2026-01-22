# Quick Start Guide

Get up and running with Tidal Playlist Organizer in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js v18+ installed ([download](https://nodejs.org))
- [ ] A Tidal account
- [ ] Tidal API credentials ready (see step 1)

## Step-by-Step Setup

### Step 1: Get Tidal API Credentials (5 minutes)

1. Go to [https://developer.tidal.com](https://developer.tidal.com)
2. Sign in with your Tidal account
3. Click "Create App" or "My Apps"
4. Create a new application:
   - **App Name**: Tidal Playlist Organizer (or any name you prefer)
   - **Description**: Personal playlist viewer
5. Once created, note your **Client ID**
6. In the app settings, add this redirect URI:
   ```
   http://localhost:5173/auth/callback
   ```
7. Save the changes

### Step 2: Install Dependencies

```bash
cd tidal-playlist-organizer
npm install
```

### Step 3: Configure Environment

```bash
# Copy the template
cp env.template .env

# Edit .env and add your Client ID and country
# Use your favorite editor (nano, vim, VS Code, etc.)
nano .env
```

Your `.env` should look like this:

```env
VITE_TIDAL_CLIENT_ID=abc123xyz456  # Your actual Client ID here
VITE_TIDAL_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_COUNTRY_CODE=DE  # Your Tidal account country (DE=Germany, US=USA, NO=Norway, etc.)
```

**Important:** Set `VITE_COUNTRY_CODE` to match your Tidal account's country. This ensures proper content licensing. Common codes:

- 🇳🇴 `NO` - Norway (Tidal's home, also the default!)
- 🇩🇪 `DE` - Germany
- 🇺🇸 `US` - United States
- 🇬🇧 `GB` - United Kingdom
- 🇸🇪 `SE` - Sweden
- 🇫🇷 `FR` - France

### Step 4: Start the App

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:5173`

### Step 5: Login and View Playlists

1. Click the **"Login with Tidal"** button
2. You'll be redirected to Tidal's login page
3. Enter your Tidal username and password
4. Grant permission to the app
5. You'll be redirected back and see your playlists!

## That's It!

You should now see all your Tidal playlists displayed with cover art and metadata.

## Common Issues

**"Client ID not configured"**

- Make sure you created the `.env` file and added your Client ID
- Restart the dev server after editing `.env`

**"Invalid redirect URI"**

- Make sure you added `http://localhost:5173` to your Tidal app's redirect URIs
- Check for typos or extra spaces

**Page won't load**

- Make sure port 5173 isn't already in use
- Try `npm run dev -- --port 3000` to use a different port (and update your redirect URI)

## Next Steps

- Explore the code in `index.html` to understand how it works
- Customize the styling to match your preferences
- Check out the [full README](README.md) for more details

## Need Help?

- Check the browser console (F12) for error messages
- Review the full [README](README.md) for detailed troubleshooting
- Visit [Tidal Developer Documentation](https://developer.tidal.com/documentation)
