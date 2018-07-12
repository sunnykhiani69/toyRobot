'use strict';

module.exports = TableTop;

/**
 * The TableTop class, constructor
 * @constructor
 */
function TableTop() {
}

var config = require('config');

var prototype = {
    /**
     * Check if robot has fallen off the table
     * @return {Boolean}
     */
    isFallen: function(x, y) {
        if (
            (x > (config.get('tableTop.startX') + (config.get('tableTop.lengthX') - 1))) || // greater then 4 & lesser then 0
            (x < config.get('tableTop.startX')) ||
            (y > (config.get('tableTop.startY') + (config.get('tableTop.lengthY') - 1))) ||
            (y < config.get('tableTop.startY'))
        ) {
            return true;
        } else
            return false;
    },
};

TableTop.prototype = Object.create(prototype);
TableTop.prototype.constructor = TableTop;
