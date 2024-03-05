## Description

# NTT Data Test - Application

This application was developed as a requirement for the NTT Data test. It utilizes a variety of technologies, including:

- **NestJS 8.0**: Framework for building efficient and scalable Node.js applications.
- **Prisma 3.5**: ORM (Object-Relational Mapping) for SQL databases and related database functionalities.
- **PostgreSQL**: Relational database used by the application.
- **Docker**: Platform for developing, testing, and deploying applications in containers.
- **TypeScript**: Programming language adding static typing to JavaScript.
- **Jest**: JavaScript testing framework.
- **Node.js**: Server-side JavaScript runtime environment.

## Initialization Instructions

To start the application:

1. **Install Dependencies**: In the command line, type `npm install` to download all necessary dependencies.

2. **Initialize Docker**:
   - Make sure you have Docker Desktop installed.
   - Open the terminal and navigate to the application's directory using `cd (path/to/directory)`.
   - Run `docker compose build` to build the containers.
   - Then, execute `docker compose up` to start Docker.

3. **Initialize Prisma**:
   - Run `npm install prisma` to install Prisma.
   - Next, use `npx prisma migrate dev` to apply Prisma migrations and update the database.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
