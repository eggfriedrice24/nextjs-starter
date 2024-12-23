# Next.js Starter Kit

A modern Next.js starter kit equipped with all the essential tools and features to kickstart your project.

## Features

- **Next.js** for server-side rendering and static site generation
- **TypeScript** for type safety and better development experience
- **TailwindCSS** for utility-first styling
- **Shadcn UI** components for accessible and customizable UI elements
- **Zod** for schema validation
- **Drizzle ORM** for database management
- **Prettier** and **ESLint** for code formatting and linting
- **Postgres** as the database (via `postgres` library)
- Pre-configured environment management using `dotenv`
- CLI tools for database migrations, seeding, and management

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [pnpm](https://pnpm.io/) (preferred package manager)
- [PostgreSQL](https://www.postgresql.org/) for the database

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:eggfriedrice24/nextjs-starter.git
   cd nextjs-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the required environment variables. Use `.env.example` as a reference.

4. Run the development server:

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:2424](http://localhost:2424).

## Scripts

The following scripts are available:

| Script                   | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `pnpm dev`               | Start the development server                   |
| `pnpm build`             | Build the project for production               |
| `pnpm start`             | Start the production server                    |
| `pnpm lint`              | Run ESLint to find linting issues              |
| `pnpm lint:fix`          | Fix linting issues automatically               |
| `pnpm typecheck`         | Run TypeScript type checks                     |
| `pnpm format:write`      | Format code using Prettier                     |
| `pnpm format:check`      | Check code formatting using Prettier           |
| `pnpm check`             | Run linting, type checks, and formatting check |
| `pnpm clean`             | Remove node_modules, dist, and cache files     |
| `pnpm db:generate`       | Generate Drizzle ORM schema                    |
| `pnpm db:introspect`     | Introspect the database schema                 |
| `pnpm db:push`           | Push schema changes to the database            |
| `pnpm db:migrate`        | Run database migrations                        |
| `pnpm db:drop-migration` | Drop the last database migration               |
| `pnpm db:seed`           | Seed the database                              |
| `pnpm db:studio`         | Open Drizzle ORM Studio                        |

## Database Management

This starter kit uses Drizzle ORM for database management. Use the following commands to manage your database:

- **Generate Schema:**

  ```bash
  pnpm db:generate
  ```

- **Run Migrations:**

  ```bash
  pnpm db:migrate
  ```

- **Seed Data:**
  ```bash
  pnpm db:seed
  ```

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or new features.

---

Happy coding! 🚀
