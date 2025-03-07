This is a minimal Next.js integration on top of https://github.com/JoshuaC215/agent-service-toolkit

This is meant to show as an example of how to integrate with the service backend and serve as a general starting point when creating AI Agents

## Live Demo
https://agent-web-kit-production.up.railway.app/


## Getting Started

First, copy example.env to .env

Then run the agent service kit in your agent service kit repo

Then run the next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

The routes under src/app/api serve as a proxy server for your agent service kit, pending some additional work the proxy server is meant to manage authenticating requests.

The pages within the front end will use the routes exposed by the proxy server

