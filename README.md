## Description

API Service Template written in Nest.js

## Features

### Out of box API Endpoints

    - Auth with JWT
        - Login
        - Register
        - Forgot Password
    - SMS with Twilio
        - Send verification message
        - Verify code
    - Users
        - Look up all users
        - Find user by id
        - Create user

### Rate limiting to prevent DDos attacks

### Password hashing and salting

## Installation

```bash
$ npm install
```

## Running the app on port 3000

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

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
