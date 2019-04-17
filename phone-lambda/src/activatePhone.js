const json = require('./retrieveData');
/**
 *
 * Activate phone for a customer
 * 1. Accept customerId and phoneId
 *
 * @param customerId & phoneId
 * @returns phoneModel
 */


module.exports = (customerId, phoneId) => {
    let phoneModel = json().customers[customerId].phones[phoneId];
    phoneModel.isActivated = true;
    return phoneModel;
};

