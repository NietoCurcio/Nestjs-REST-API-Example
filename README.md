<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

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

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Project Example

<p align="center">
 <img src="https://github.com/NietoCurcio/Nestjs-REST-API-Example/blob/main/.github/endpoints.png?raw=true" width="800" alt="Nestjs REST API example">
</p>

> This project is basically an application example made through Nestjs documents. In order to learn how to use Nestjs and build a Nestjs REST API final project to conclude the Server-side Development with NodeJS, Express and MongoDB by Jogesh Muppala on Coursera. As I said, this is the concepts of the documents, the final project will be another repository.

Nestjs is built on top of Expressjs, also supports Fastify framework, comes with Typescript and its architecture is inspired by Angular, it also uses Singleton Design Pattern by default, DRY and SOLID principles, like single responsibility and dependency injection.

## Overview

Overview module talks about getting started, how to use controllers, providers (that are services and much more, in which can be Injected into others providers or controllers), Modules (Nestjs works through modules that can be imported, so that we can use its providers in others modules), middlewares, Exception Filters (a layer to handle unhandled exceptions), Pipes (to make Validation and Transformation on data that comes into controllers), Guards (Decorators to security ours endpoints, useful for authentication and authorization), Interceptors (it adds functionality before and after the request-response pipeline, you can add logic before the request reaches the route handler and after the handler is finished, to even transform data that is being send to the client) and Custom Decorators, Nestjs is a framework that uses a lot of decoratores (marked by '@', very used to improve functionality in controllers or even in Data Transfer Object (DTO) classes), you can create your own decorators to improve readability in a declarative way.

## Fundamentals

You can create some custom providers, using things like useClass, useFactory, useValue and useExistings, providers can also be async. Modules can be dynamic to be imported through a arbitrary configuration. By default, all providers instances are singleton, but it can be customized as well. Nestjs provides ArgumentsHost, ExecutionContext and Reflector to get the current context request pipeline.

## Techniques

It integrates with databases in many ways, such as Sequelize ORM, Knex query builder, TypeORM and our dear Mongoose. To integrate MongoDB using Mongoose ODM with your server, it comes with its respective decorators and a lot of ways to uses the Models in our application. You can inject the connection module (to inject some provider), inject models to use in providers, use plugins and events like "before mdoel save".

There are a lot of ways to handling environment configurations using the built-in config module and ways to perform Serialization on how data is returned to the client.

This project performs File upload using Multer middleware.

## Security

Authentication - Nestjs uses Passport library, to implement authentication strategies, this example project uses LocalStrategy, and once the user has received an JWT token, uses JwtStrategy.

Authorization - This project example uses Role-based access control (RBAC) to define who can perform some actions, for example, delete items or posts would be privilege of only an Administrator. Nest can also be integrated with CASL Authorization library (this project didn't go deep into it).

Since Nestjs is built on top of Express, it supports and uses [Helmet](https://github.com/helmetjs) and [Cors](https://github.com/expressjs/cors) middleware.

<hr>

### [Nestjs](https://docs.nestjs.com/) has a very good documentation and I recommend a reading. It can do much more than showed in this project example, for example, it can use GraphQL and a lot of techniques. As described by its developers "Build once, use everywhere".
