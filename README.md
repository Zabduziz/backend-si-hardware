# Backend SI Hardware

A RESTful API backend for managing computer hardware laboratories, inventory, and practical activities (Praktikum). Built with Node.js and Express.

## Tech Stack

* **Runtime:** Node.js (v20)
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Sequelize
* **Authentication:** JWT & Bcrypt
* **Containerization:** Docker

## Prerequisites

Before you start, make sure you have these installed:
* [Node.js](https://nodejs.org/) (v20+ recommended)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/) (Optional, if you want to containerize)

## Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd backend-si-hardware
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Copy the example environment file and fill in your database credentials.
    ```bash
    cp .env.example .env
    ```
    *Open `.env` and configure your `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE_DEVELOPMENT`, etc.*

4.  **Database Migration & Seeding**
    Set up the database schema and insert default data (Roles, Admin User, etc.).
    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

## Running the App

**Standard Mode:**
Since there is no `start` script currently in `package.json`, run directly:
```bash
node src/app.js
```

## Docker
You can run this porject using docker with this command:
```bash
docker build -t backend-si-hardware .
```
```bash
docker run -p 3000:3000 backend-si-hardware
```

## License
This project is licensed under the MIT License.