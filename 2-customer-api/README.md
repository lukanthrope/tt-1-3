# Task 2 - A Crude Server

## How to run

1. Create .env file:
   `cp .env.example .env`

2. Run docker compose to use the database:
   `docker compose up`

3. Install dependencies:
   `npm i`

4. Apply migrations:
   `npx drizzle-kit migrate`

5. [Optional] Run seeds:
   `npm run seed`

6. Run the app:
   `npm run dev`

7. Open Swagger page to see the API documentation
   `http://localhost:8000/api-docs`
