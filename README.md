## Environment config
<p>Just copy .env.example and rename to .env all configs are the same like in .env.example</p>
<p>Application will run on :3000 port, db port :5432</p>

## Postgres install and start

<p>All configs already inserted inside .env</p>

```bash
docker compose up -d
```

## Compile and run the project

<p>Swagger documentation on - http://localhost:3000/api</p>

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
