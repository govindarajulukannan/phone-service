# API & Lambda Approach

### Create a lambda to handle three API services
```
1) Get All Phone Numbers (for all customers or for an Account?)
2) Get All Phone Numbers of a Customer
3) Activate a phone number
```

### Assumptions:
```
API 1 - This may be used for a service centre & not user facing application.
Considering the API-1 is meant for one user account with multiple customers.
(i.e. single account with multiple customers - Family account, Friends group account etc,…)

API 1. Get all phone numbers for all customers in a account -- not advisable to retrieve all this will result in performance issues, 
but will use static data set in this case.
API 2. Get all phone numbers of a customer -- Pass a customer id to retrieve the phone numbers mobile, work, home.
API 3. Activate a phone number - activating a phone number for a customer
```


### API Design:


##### Get All Phone Numbers for an Account (GET) - /accounts/{accountId}/phones

##### Get All Phone Numbers of a Customer (GET) - /customers/{customerId}/phones

##### Activate a phone number (PUT) - /customers/{customerId}/phones/{phoneId}
```
Request Body: {
	"phoneId":  {
		"phoneType": "mobile/home/work",
		"phoneNumber": "000000000",
		"isActivated": false/true
	}
}
```

##### Phone Model:
```
phoneId - Object (key - phoneId) - level 1
phoneType - String - level 2
phoneNumber - String - level 2
isActivated: Boolean - level 2
```

##### Static Data:
* Use JSON to construct the customer/phone model to use as static data for this use case.
* File located in /phone-lambda/static-data.json
##### Data Assumption:
* The JSON data constructed will be a response of database query or any other service in real time.


# phone-service

This is a SAM template for phone-service:

```bash
.
├── README.MD                   <-- This instructions file
├── event.json                  <-- API Gateway Proxy Integration event payload
├── phone-lambda                <-- Source code for a lambda function
│   └── app.js                  <-- Lambda function code
│   └── package.json            <-- NodeJS dependencies and scripts
│   └── static-data.json        <-- Static data to support lambda response
│   └── __tests__               <-- Unit tests
│       └── unit
│           └── test-handler.js
├── template.yaml               <-- SAM template - pending
```

## Requirements

* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)

## Setup process

### Local development

Used `mocha` and `jest` for testing code and coverage, it is already added in `package.json` under `scripts`, so that we can simply run the following command to run our tests:

```bash
cd phone-lambda
yarn install
yarn test
yarn test-cov
```

```
yarn test-cov will return coverage details of code base.

SAM Template is not updated due to time constraints. 
Template can be used to create teh above API Design Implementation.
```

