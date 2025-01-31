# Olavstoppen Website<!-- omit in toc -->

This repository contains the source code for Olavstoppen’s website, developed to reflect our updated brand platform and vision. The site serves as a dynamic platform to share our stories and showcase collaborative projects with clients. To manage content efficiently and allow non-developers to contribute without code modifications, we’ve integrated Sanity CMS. We chose Sanity for its customizable content schemas, user-friendly interface, real-time collaboration features, powerful API integration, and scalability to meet our growing content demands. This setup ensures consistent branding, centralized content management, and the ability to reuse content across multiple platforms.

**Technologies:**

- [Node](https://nodejs.org/en)/[npm](https://www.npmjs.com/)
- [React](https://react.dev/)/[TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/)

## Getting Started

Follow these steps to get started developing!

1. Clone the project from GitHub.

2. Make a copy of `.env.local.example` and rename it to `.env.local`. Fill it with secrets and keys from the shared Keeper folder. Ask the manager or other contributors for access to the folder.

3. Install dependencies with `npm install`.

4. Run `npm run dev` and open browser at [http://localhost:3000](http://localhost:3000)

## Project Structure

- **app/**: Contains routes for the website using Next.js app router. The routes follow Next.js best practices and do not contain any components other than Next.js `page.tsx`, `layout.tsx`, or `route.tsx` for API routes.
- **components/**: Contains reusable UI components used throughout the application.
  - **global/**: Components like header and footer that are used globally across the site.
  - **pages/**: Components specific to page templates such as home page, subpages, and project pages.
  - **shared/**: Reusable components used across the site.
- **sanity/**: Configuration and setup for Sanity integration.
  - **lib/**: Contains configuration and setup for Sanity integration, including GROQ queries, utils, client setup and environment variable management.
  - **loader/**: Contains tools for loading and querying data from Sanity, including utility functions and hooks for data fetching.
- **public/**: Static assets like images, etc.

## Package.json scripts explained

- **Script:** `"build": "next build"`

  - **Command:** `npm run build`
  - **Description:** This command builds the project for production.

- **Script:** `"export": "next export"`

  - **Command:** `npm run export`
  - **Description:** This command exports the project as a static site.

- **Script:** `"dev": "next"`

  - **Command:** `npm run dev`
  - **Description:** This command starts the Next.js development server.

- **Script:** `"start": "next start"`

  - **Command:** `npm run start`
  - **Description:** This command starts the Next.js production server.

- **Script:** `"lint:check": "next lint ."`

  - **Command:** `npm run lint:check`
  - **Description:** This runs ESLint to check for linting errors in your codebase.

- **Script:** `"lint:fix": "npm run prettier:fix && npm run lint:check -- --fix"`

  - **Command:** `npm run lint:fix`
  - **Description:** This command runs Prettier to fix formatting issues and then runs ESLint to fix linting issues.

- **Script:** `"ts:check": "tsc --noEmit"`

  - **Command:** `npm run ts:check`
  - **Description:** This runs the TypeScript compiler (`TSC`) to type-check the codebase without actually generating output files.

- **Script:** `"prettier:check": "prettier --check \"app/**/*.{js,ts,tsx}\""`

  - **Command:** `npm run prettier:check`
  - **Description:** This command runs Prettier in "check" mode to verify if your code is formatted according to Prettier's rules, without modifying the files.

- **Script:** `"prettier:fix": "npx prettier --write . --ignore-path .gitignore"`

  - **Command:** `npm run prettier:fix`
  - **Description:** This command runs Prettier to automatically format all JavaScript, TypeScript, and JSX/TSX files according to the configured formatting rules.

## Additional Information

For more details on the project setup and configuration, refer to the following files:

- [package.json](./package.json)
- [.env.local.example](./.env.local.example)
- [tailwind.config.ts](./tailwind.config.js)
- [tsconfig.json](./tsconfig.json)
- [sanity.cli.ts](./sanity.cli.ts)
