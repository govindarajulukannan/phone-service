const dataSet = require('../static-data.json');
/**
 *
 * Retrieve the static data with accounts, customers and phones
 *
 * @returns dataSet - JSON String with key value pair
 */

module.exports = () => {
    return dataSet;
};

