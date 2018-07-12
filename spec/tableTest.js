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

    function outY(x, y) {
        it('should be true if point y is out of table', function() {
            expect(tableTop.isFallen(x, y)).toBe(true);
        });
    }

    function inY(x, y) {
        it('should be false if point y is out of table', function() {
            expect(tableTop.isFallen(x, y)).toBe(false);
        });
    }

    var x;
    var i;
    var y;

    /**
     * X is out of the table
     */
    for ( x = config.get('tableTop.startX'); x < config.get('tableTop.lengthX'); ++x) {
        for ( i = 0; i < XOutOfTable.length; ++i) {
            outX(XOutOfTable[i], y);
            console.log('x is ', XOutOfTable[i]);
            //console.count('test number');
        }
    }

    /**
     * X is on the table
     */
    for ( x = config.get('tableTop.startX'); x < config.get('tableTop.lengthX'); ++x) {
        for ( i = 0; i < XInTable.length; ++i) {
            inX(XInTable[i], y);
            console.log('x is ', XInTable[i]);
            //console.count('test number');
        }
    }

    /**
     * Y is out of the table
     */
    for ( x = config.get('tableTop.startY'); x < config.get('tableTop.lengthY'); ++x) {
        for ( i = 0; i < YOutOfTable.length; ++i) {
            outY(YOutOfTable[i], y);
            console.log('y is ', YOutOfTable[i]);
            //console.count('test number');
        }
    }

    /**
     * Y is on the table
     */
    for ( x = config.get('tableTop.startY'); x < config.get('tableTop.lengthY'); ++x) {
        for ( i = 0; i < YInTable.length; ++i) {
            inY(YInTable[i], y);
            console.log('y is ', YInTable[i]);
            //console.count('test number');
        }
    }

});
