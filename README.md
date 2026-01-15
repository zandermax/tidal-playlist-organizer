# Tidal Playlist Organizer

A web application to view and organize your Tidal playlists using the Tidal Web SDK.

## Features

- User authentication with Tidal OAuth
- View all your personal playlists
- Display playlist cover art, track count, and last modified date
- Direct links to open playlists in Tidal

## Prerequisites

- Node.js (v18 or higher recommended)
- A Tidal account
- Tidal API credentials (Client ID)

## Getting Tidal API Credentials

1. Visit [Tidal Developer Portal](https://developer.tidal.com)
2. Sign in with your Tidal account
3. Create a new application
4. Note your **Client ID**
5. Add `http://localhost:5173` to your app's **Redirect URIs**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root (you can copy from `env.template`):

```bash
cp env.template .env
```

Edit `.env` and add your credentials:

```env
VITE_TIDAL_CLIENT_ID=your_actual_client_id_from_developer_portal
VITE_TIDAL_REDIRECT_URI=http://localhost:5173
VITE_COUNTRY_CODE=DE
```

**About Country Code:**

- Use the **ISO 3166-1 alpha-2** code for your Tidal account's registered country
- This determines which music content is available due to regional licensing agreements
- Common codes: `NO` (Norway), `US` (USA), `DE` (Germany), `GB` (UK), `SE` (Sweden), `FR` (France)
- **Why it matters**: Music catalogs vary by country due to licensing. Setting this to your account's country ensures you see playlists with accurate content availability
- If not set, defaults to `NO` (Norway, where Tidal was founded 🇳🇴)

**Important Notes:**

- The redirect URI must match exactly what you registered in the Tidal Developer Portal
- Vite uses the `VITE_` prefix to expose environment variables to the browser
- Never commit your `.env` file (it's already in `.gitignore`)

### 3. Run the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Usage

1. Open the application in your browser
2. Click "Login with Tidal"
3. You'll be redirected to Tidal's login page
4. Enter your Tidal credentials
5. After successful login, you'll be redirected back to the app
6. Your playlists will be displayed automatically

## Security Notes

- Never commit your `.env` file or share your Client ID publicly
- The Authorization Code Flow with PKCE is used for secure authentication
- Tokens are encrypted and stored securely in your browser's localStorage
- No client secret is required or used in the browser

## Technology Stack

- [@tidal-music/auth](https://www.npmjs.com/package/@tidal-music/auth) - Authentication SDK
- [@tidal-music/api](https://www.npmjs.com/package/@tidal-music/api) - API client SDK
- [Vite](https://vitejs.dev/) - Build tool and dev server
- Vanilla JavaScript (ES modules)

## How It Works

The application uses the Tidal Web SDK's Authorization Code Flow with PKCE:

1. **Authentication**: When you click "Login with Tidal", you're redirected to Tidal's secure login page
2. **Authorization**: After logging in, Tidal redirects you back with an authorization code
3. **Token Exchange**: The SDK automatically exchanges the code for access tokens
4. **API Calls**: The app uses your access token to fetch your playlists from the Tidal API
5. **Token Management**: The SDK handles token refresh and secure storage automatically

## Project Structure

```
tidal-playlist-organizer/
├── index.html          # Main application (HTML + JavaScript)
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── env.template        # Environment variables template
├── .env               # Your credentials (create this, not in git)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Troubleshooting

### "Client ID not configured" error

- Make sure you've created a `.env` file (copy from `env.template`)
- Verify your `VITE_TIDAL_CLIENT_ID` is set correctly
- Restart the dev server after changing `.env` files

### "Invalid redirect URI" error

- The redirect URI in your `.env` file must exactly match what's registered in the Tidal Developer Portal
- Check for trailing slashes or http vs https mismatches
- The default is `http://localhost:5173` (no trailing slash)

### "Failed to fetch" or CORS errors

- Ensure you're running the app on `localhost` (not `127.0.0.1`)
- The Tidal OAuth server requires valid HTTPS or localhost
- Try clearing your browser cache and localStorage

### Playlists not showing

- Check the browser console (F12) for errors
- Ensure you have playlists in your Tidal account
- Verify the country code in your `.env` matches your Tidal account region
- Try logging out and logging back in

### Songs/playlists showing as unavailable

- Verify your `VITE_COUNTRY_CODE` matches your Tidal account's registered country
- Music licensing varies by region - content available in one country may not be in another
- If you've recently moved countries, your account country may differ from your current location

### Dependencies not installing

- Make sure you have Node.js v18 or higher installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

## License

See [LICENSE](LICENSE) file for details.

## References

- [Tidal Developer Documentation](https://developer.tidal.com/documentation)
- [Tidal SDK Web GitHub](https://github.com/tidal-music/tidal-sdk-web)
