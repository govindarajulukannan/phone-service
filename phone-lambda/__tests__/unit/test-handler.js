'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
const staticJson = require('../../static-data.json');
const eventTest = require('../../../event.json');

describe('Phone Service Tests', function () {
    it('verifies successful response for all customers and phones', async () => {
        const result = await app.lambdaHandler(eventTest);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        expect(response).to.be.an('object');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(staticJson.customers));
    });

    it('verifies successful response for phone activation', async () => {
        eventTest.pathParameters.accountId = undefined;
        eventTest.pathParameters.customerId = "customerId_2";
        eventTest.pathParameters.phoneId = "phId_2";
        let activatedPhone =  {
            "phoneId": "phId_2",
            "phoneType": "work",
            "phoneNumber": "0301231213",
            "isActivated": true
        };
        const result = await app.lambdaHandler(eventTest);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        expect(response).to.be.an('object');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(activatedPhone));
    });

    it('verifies successful response for phones of a customer', async () => {
        eventTest.pathParameters.accountId = undefined;
        eventTest.pathParameters.phoneId = undefined;
        eventTest.pathParameters.customerId = "customerId_3";

        const result = await app.lambdaHandler(eventTest);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        expect(response).to.be.an('object');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(staticJson.customers[eventTest.pathParameters.customerId].phones));
    });

    it('verifies forbidden request for phones service', async () => {
        eventTest.pathParameters.accountId = undefined;
        eventTest.pathParameters.phoneId = undefined;
        eventTest.pathParameters.customerId = undefined;

        let forbiddenResponse = {
            "error": {
                "statusCode": "403",
                "message": "Forbidden request"
            }
        };
        const result = await app.lambdaHandler(eventTest);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(403);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        expect(response).to.be.an('object');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(forbiddenResponse));
    });

});
