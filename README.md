# finance-monorepo

# 📌 Finance API

## 🚀 Project Setup and Startup

This project uses `pnpm` as the package manager, managed via `Corepack`. Make sure to follow the steps below to configure it correctly in your environment.

### 📦 **Prerequisites**

- **Node.js** `>= v20.15.1`
- **Corepack** enabled.

### 🛠 **Initial Configuration**

1. **Enable Corepack** (if not already enabled on your machine):

   ```bash
   corepack enable
   ```

2. **Set the specific version of `pnpm` for this project**:

   ```bash
   corepack prepare pnpm@10.4.1 --activate
   ```

3. **Verify that `pnpm` is working correctly**:

   ```bash
   pnpm -v
   ```

   It should display `10.4.1` (or the version specified in `package.json`).

### 📂 **Installing Dependencies**

To install the project's dependencies, run:

```bash
pnpm install
```

### 🔧 **Prisma Client**

After installing dependencies, generate the Prisma client:

```bash
cd apps/finance-api
npx prisma generate
```

> This step is required before running the API if Prisma is used.

### ▶️ **Running the Project api**

To start the server in development mode:

```bash
cd apps/finance-api
pnpm start
```

### 🧪 **Running Tests**

To run the tests:

```bash
cd apps/finance-api
pnpm test
```

### 🔄 **Updating `pnpm` (optional)**

If you need to update `pnpm` in the future, edit `package.json` and change the version in:

```json
"packageManager": "pnpm@X.Y.Z"
```

Then run:

```bash
corepack prepare pnpm@X.Y.Z --activate
```

---

## 🛠 **Database Setup (PostgreSQL with Docker)**

This project uses a PostgreSQL database running in a Docker container. Follow these steps to set it up or reset it:

### 🗑 **Resetting the Database**

If you need to delete and recreate the database:

```bash
docker stop pgdb
docker rm pgdb
docker volume prune -f
docker rmi postgres ## OPTIONAL
```

### 🔄 **Re-downloading the PostgreSQL Docker Image**

If you have removed the PostgreSQL image, download it again with:

```bash
docker pull postgres
```

### 🏗 **Creating or Starting the Database**

To avoid conflicts, use this command to **start** the database if it exists, or **create** it if it doesn't:

```bash
pnpm start:db
pnpm start:seed
```

This command ensures credentials are **not hardcoded** in `package.json` and avoids container conflicts.

### 🔄 **Updating `.env` File**

Ensure that the `.env` file contains the correct database credentials:

```env
DATABASE_TYPE=postgres
API_VERSION=V1
PORT=3000
PG_USER=admin
PG_HOST=localhost
PG_DB=mydatabase
PG_PASSWORD=secret
PG_PORT=5432
```

Make sure the `.env` file is **not versioned** by adding it to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

Also, ignore generated Prisma client code:

```bash
# Prisma
prisma/generated/
```

---

## 🧱 **Prisma Migrations**

This project uses [Prisma](https://www.prisma.io/) as the ORM to interact with the database.

### ▶️ Apply existing migrations

```bash
cd apps/finance-api
npx prisma migrate dev
```

> Make sure your `.env` file includes `DATABASE_URL`, or use `dotenv-cli` to load it from `.env.dev`.

### 🔄 Reset the database and re-apply migrations

```bash
npx prisma migrate reset
```

> This will drop and recreate the database, and re-apply all migrations.

📌 **By following these steps, we ensure that all developers and deployment environments use the same version of `pnpm`, and have a consistent and easily restorable PostgreSQL database setup.** 🚀

Finance Monorepo Example

NodeJS with

- Winston
- Loggin middlewares (JSON, durations, status code...)
- Error handlers (asyncHandler, HttpError, Error interceptors)
- Cors
- Helmet
- express validator
- Rate limiter
- Test (supertest, jest) 100% Coverage
- Database provider with memory, file and postgres options
- PostgreSQL (Docker) & scripts to initialize and seed the database

SPA with

- React
- Vite
- Tailwind
- React Router
- React Feather Icons
- React Hooks
