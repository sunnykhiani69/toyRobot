'use strict';

module.exports = TableTop;

/**
 * The Table class, constructor
 * @constructor
 */
function TableTop() {
}

var config = require('config');

var prototype = {
    /**
     * Check is point robot has fallen off the table
     * @return {Boolean}
     */
    isFallen: function(x, y) {
        if (
            (x > (config.get('table.startX') + (config.get('table.lengthX') - 1))) ||
            (x < config.get('table.startX')) ||
            (y > (config.get('table.startY') + (config.get('table.lengthY') - 1))) ||
            (y < config.get('table.startY'))
        ) {
            return true;
        } else
            return false;
    },
};

TableTop.prototype = Object.create(prototype);
TableTop.prototype.constructor = TableTop;
