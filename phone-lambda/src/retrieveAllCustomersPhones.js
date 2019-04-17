const json = require('./retrieveData');
/**
 *
 * Retrieve phone numbers of all customers
 *
 * @returns customers object with phones
 */

module.exports = () => {
    return json().customers;
};

