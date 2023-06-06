# BFF Flux Control

## Description

Simple REST API for creating and querying a debit and credit flow connected to a TCP service

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

download the service and run it according to your REDME.md

```bash
git clone https://github.com/jusansilva/launch-control-service.git
```
obs.: make sure your service settings match the settings in your API

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
```

## Architecture

The rest API was built in modules using typescript in a Hexagonal approach with layers of controllers and services being orchestrated by a module, unit tests were built to ensure that the endpoint could bring an object that is its purpose.

## Endpoints

### Created Launch

```bash 
curl --request POST \
  --url http://localhost:3000/launch \
  --header 'Content-Type: application/json' \
  --data '{
	"type": "string",
	"description": "string",
	"value": float,
	"date": "timestamp"
}'
```
response: {
  "type": "string",
	"description": "string",
	"value": float,
	"date": "timestamp"
}

obs.: the data "type" accept only ['debit', 'credit']

### Get all launch

```bash
curl --request GET \
  --url http://localhost:3000/launch \
  --header 'Content-Type: application/json'
```
response: [{
  "type": "string",
	"description": "string",
	"value": float,
	"date": "timestamp"
}]
obs.: get all launch in database

### Get Consolidated Launch by today

```bash
curl --request GET \
  --url http://localhost:3000/launch/day \
  --header 'Content-Type: application/json'
```
response: [cretid:[{
  "type": "string",
	"description": "string",
	"value": float,
	"date": "timestamp"
}],
debit:[{
  "type": "string",
	"description": "string",
	"value": float,
	"date": "timestamp"
}],
"debitValue": float,
"creditValue": float,
"total": float
]


### Instructions

First, create some debit and credit entries to be able to complete the day's consolidated

## Stay in touch

- Author - [Jusan Magno](http://jusanmagno.com/)
- LinkedIn - [Jusan Magno](https://www.linkedin.com/in/jusanmagno/)
