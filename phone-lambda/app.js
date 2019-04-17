const json = require('./src/retrieveData');
const retrieveAllCustomersPhones = require('./src/retrieveAllCustomersPhones');
const retrieveAllPhonesOfCustomer = require('./src/retrieveAllPhonesOfCustomer');
const activatePhone =  require('./src/activatePhone');

let response;

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
        if (event.pathParameters.accountId) {
            let allCustomersAndPhones = retrieveAllCustomersPhones();
            response = {
                'statusCode': 200,
                'body': JSON.stringify(allCustomersAndPhones)
            }
        } else if(event.pathParameters.customerId && event.pathParameters.phoneId) {
            let phone = activatePhone(event.pathParameters.customerId, event.pathParameters.phoneId);
            response = {
                'statusCode': 200,
                'body': JSON.stringify(phone)
            }
        } else if (event.pathParameters.customerId && !event.pathParameters.phoneId) {
            let customerPhones = retrieveAllPhonesOfCustomer(event.pathParameters.customerId);
            response = {
                'statusCode': 200,
                'body': JSON.stringify(customerPhones)
            }
        } else {
            response = {
                'statusCode': 403,
                'body': JSON.stringify({ "error": {
                        "statusCode": "403",
                        "message": "Forbidden request"
                    }
                })
            }
        }
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
