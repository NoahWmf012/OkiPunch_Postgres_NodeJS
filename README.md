# OkiPunch

### Install Node Packages

`npm install express-flash express passport bcrypt express-session express-handlebars knex dotenv express-session passport-local path pg redis`

### setup for DB connect

- 3 variables in .env
  `DB_NAME, DB_USERNAME, DB_PASSWORD`

- set up dummy data, run:
  `knex migrate:latest`
  `knex seed:run`

### Use two browser for company admin side and employee admin side separately

### Start the App:

`logo site: http://localhost:8000/logo`
`root site: http://localhost:8000 `
