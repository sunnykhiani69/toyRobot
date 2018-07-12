'use strict';

/**
 * This file will describt the test for the 5x5 table
 * The goal of this file is to validate app/tableTop.js
 */

var config = require('config');
var TableTop = require('./../app/tableTop');

describe('TableTop', function() {
    var tableTop,
        XOutOfTable = [config.get('tableTop.startX') - 1, config.get('tableTop.lengthX')], // point x is out of table if -1 or > 5
        YOutOfTable = [config.get('tableTop.startY') - 1, config.get('tableTop.lengthY')],
        XInTable = [config.get('tableTop.startX'), config.get('tableTop.lengthX') - 1], // point x is in on the table if 1 or 4
        YInTable = [config.get('tableTop.startY'), config.get('tableTop.lengthY') -1];

    beforeAll(function() {
        tableTop = new TableTop(config.get('tableTop'));
    });

    function outX(x, y) {
        it('should be true if point x is out of table', function() {
            expect(tableTop.isFallen(x, y)).toBe(true);
        });
    }

    function inX(x, y) {
        it('should be false if point x is out of table', function() {
            expect(tableTop.isFallen(x, y)).toBe(false);
        });
    }

    /**
     * X is out of the table
     */
    for (var x = config.get('tableTop.startX'); x < config.get('tableTop.lengthX'); ++x) {
        for (var i = 0; i < XOutOfTable.length; ++i) {
            outX(x, XOutOfTable[i]);
            console.log('x is ', XOutOfTable[i]);
            //console.count('test number');
        }
    }

    /**
     * X is on the table
     */
    for (var x = config.get('tableTop.startX'); x < config.get('tableTop.lengthX'); ++x) {
        for (var i = 0; i < XInTable.length; ++i) {
            inX(x, XInTable[i]);
            console.log('x is ', XInTable[i]);
            //console.count('test number');
        }
    }

});
