# Okto SDK Next.js Template

This is a Next.js template pre-configured with [Okto SDK](https://docs.okto.tech/) for building chain abstracted decentralized applications. It provides a solid foundation for creating Web3-enabled applications with best practices and essential tooling.

## Features

- ⚡️ **Next.js 14** with App Router
- 🔐 **Okto SDK** integration for seamless Web3 functionality
- 📱 **Responsive Design** out of the box
- 🔒 **Authentication** setup with NextAuth.js

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later and npm/pnpm/yarn
- **Okto API Keys:** `NEXT_PUBLIC_CLIENT_PRIVATE_KEY` and `NEXT_PUBLIC_CLIENT_SWA`. Obtain these from the [Okto Developer Dashboard](https://dashboard.okto.tech/login).
- Google OAuth Credentials
- Auth Secret

## Getting Started

1. Clone this template:
   ```bash
   git clone https://github.com/okto-hq/okto-sdkv2-nextjs-template-app.git
   cd okto-sdkv2-nextjs-template-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.sample .env
   ```
   Edit `.env` and add your Okto API credentials and other required environment variables.

    ``` title=".env"
    # The Okto environment "sandbox" or "production"
    NEXT_PUBLIC_ENVIRONMENT = "sandbox"

    # Get the below values from Okto Developer Dashboard. Learn how here- https://docsv2.okto.tech/docs/developer-admin-dashboard
    NEXT_PUBLIC_CLIENT_PRIVATE_KEY = "YOUR_CLIENT_PRIVATE_KEY"
    NEXT_PUBLIC_CLIENT_SWA = "YOUR_CLIENT_SWA"

    # Generate using command: openssl rand -base64 32
    AUTH_SECRET = "YOUR_AUTH_SECRET"

    # Only needed if google authentication is used
    GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET"  
    ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see your application.

## Deployment

This template can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fokto-sdkv2-nextjs-template-app)

For other deployment options, follow the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Learn More

- [Okto SDK Documentation](https://docs.okto.tech/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Contributing

Contributions are welcome! Please take a moment to review our [CONTRIBUTING.md](CONTRIBUTING.md) guidelines before submitting any Pull Requests. Your contributions are invaluable to the Okto community.