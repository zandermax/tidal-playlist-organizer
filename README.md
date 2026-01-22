# Tidal Playlist Organizer

A modern web application built with SvelteKit and TypeScript that lets you view and manage your Tidal playlists using the Tidal Web SDK.

## Features

- 🎵 View all your Tidal playlists with cover art
- 🔐 Secure OAuth 2.0 authentication with PKCE
- 📱 Responsive design for desktop and mobile
- ⚡ Fast, modern SvelteKit architecture
- 🎨 Beautiful gradient UI with smooth animations
- 🔄 Real-time playlist synchronization

## Prerequisites

- Node.js v18 or higher
- A Tidal account
- Tidal API credentials (Client ID)

## Quick Start

### 1. Get Tidal API Credentials

1. Visit [Tidal Developer Portal](https://developer.tidal.com)
2. Sign in with your Tidal account
3. Create a new application
4. Note your **Client ID**
5. Add `http://localhost:5173` and `http://localhost:5173/auth/callback` as redirect URIs

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp env.template .env
```

Edit `.env` and add your credentials:

```env
VITE_TIDAL_CLIENT_ID=your_client_id_here
VITE_TIDAL_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_COUNTRY_CODE=NO  # Your Tidal account's country (NO, US, DE, GB, etc.)
```

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run check

# Run linter
npm run lint

# Format code
npm run format

# Run end-to-end tests
npm run test:e2e
```

## Architecture

This application uses a modern SvelteKit architecture with:

- **TypeScript** for type safety
- **Svelte 5** with runes for reactivity
- **Svelte Stores** for state management
- **Component-based architecture** for reusability
- **Tidal Web SDK** for authentication and API access

For detailed architecture information, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable Svelte components
│   ├── stores/          # Svelte stores for state management
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── routes/              # SvelteKit routes
    ├── auth/callback/   # OAuth callback handler
    ├── +layout.svelte   # Root layout with global styles
    └── +page.svelte     # Main page
```

## Documentation

- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed architecture overview
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Implementation notes

## Security

- OAuth 2.0 Authorization Code Flow with PKCE (no client secret exposed)
- Tokens encrypted and stored securely via Tidal SDK
- Automatic token refresh
- Environment variables for sensitive configuration
- `.env` file excluded from version control

## Troubleshooting

**"Client ID not configured"**
- Ensure `.env` file exists with `VITE_TIDAL_CLIENT_ID` set
- Restart the development server after editing `.env`

**"Invalid redirect URI"**
- Verify redirect URIs in Tidal Developer Portal match exactly
- Both base URL and callback URL should be registered

**TypeScript errors**
- Run `npm run check` to see detailed errors
- Ensure all dependencies are installed with `npm install`

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

See [LICENSE](LICENSE) file for details.

## References

- [Tidal Developer Portal](https://developer.tidal.com)
- [Tidal SDK Documentation](https://tidal-music.github.io/tidal-sdk-web/)
- [SvelteKit Documentation](https://kit.svelte.dev/)
