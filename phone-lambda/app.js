const json = require('./src/retrieveData');
const retrieveAllCustomersPhones = require('./src/retrieveAllCustomersPhones');
const retrieveAllPhonesOfCustomer = require('./src/retrieveAllPhonesOfCustomer');
const activatePhone =  require('./src/activatePhone');

let response;
let body;
let statusCode = 200;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event) => {
    try {
        let invokeFunction = event.pathParameters.accountId ? 'allCustomersPhones' :
            event.pathParameters.customerId && event.pathParameters.phoneId ? 'activatePhone' :
                event.pathParameters.customerId && !event.pathParameters.phoneId ? 'allPhonesOfCustomer': '';

        switch (invokeFunction) {
            case "allCustomersPhones":
                body = retrieveAllCustomersPhones();
                break;
            case "allPhonesOfCustomer":
                body = retrieveAllPhonesOfCustomer(event.pathParameters.customerId);
                break;
            case "activatePhone":
                body = activatePhone(event.pathParameters.customerId, event.pathParameters.phoneId);
                break;
            default:
                statusCode = 403;
                body = {
                    "error": {
                        "statusCode": "403",
                        "message": "Forbidden request"
                    }
                };
        }
        response = {
            'statusCode': statusCode,
            'body': JSON.stringify(body)
        };
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 400,
            'body': JSON.stringify({ "error": {
                    "statusCode": "400",
                    "message": "Request not valid"
                }
            })
        };
        return response;
    }
    console.log('Response :'+JSON.stringify(response));
    return response
};
