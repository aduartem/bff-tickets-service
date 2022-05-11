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
APP_NAME=api-tickets-service
PORT=3002
DB_USER=root
DB_PASS=root
DB_NAME=tickets
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
DB_TIMEZONE=false
DB_LOGGING=true
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
