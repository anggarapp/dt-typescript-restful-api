# Setup Project
Create .env file

```
DATABASE_URL="mysql://maidenless:tarnished@localhost:3306/dt_maria_db"
```

```shell
npm install

npx prisma migrate

npx prisma generate

tsc

node dist/main.js

```