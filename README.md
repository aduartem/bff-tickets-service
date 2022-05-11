# bff-tickets-service

## Requirements

- Node v16.15.0
- NPM 8.5.5
- MySQL 8.0.25

## Installation

<br>

### 1. Install node dependencies

<br>

At the root of the project:

```
npm i
```

<br>

### 2. Environment Variables

<br>

Example environment file

```
NODE_ENV=dev
APP_NAME=bff-tickets-service
PORT=3000
API_AUTHENTICATION=http://localhost:3001/api/v1
API_TICKETS=http://localhost:3002/api/v1
SECRET=sd12532fb784c48129675fb27168c0ea744b2cf58ee02337c5918dhsd
```

<br>

### 3. Starting the service

<br>

At the root of the project:

```
npm start
```

## Check code style with eslint

<br>

At the root of the project:

```
npm run eslint
```
