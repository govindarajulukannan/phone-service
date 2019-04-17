const json = require('./retrieveData');
/**
 *
 * Retrieve all phones for one customer
 * 1. Accept customerId
 *
 * @param customerId
 * @returns customerPhones
 */


module.exports = (customerId) => {
    return json().customers[customerId].phones;
};


