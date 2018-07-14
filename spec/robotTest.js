'use strict';

/**
 * This file will describe the test for all of the robots movements
 * The goal of this file is to validate app/theRobot.js
 */

var config = require('config');
var TheTable = require('./../app/tableTop');
var Messenger = require('./../app/messenger');
var TheRobot = require('./../app/theRobot');

describe('The Toy Robot', function() {
    var theRobot;
    var messenger;
    var x, y, f;

    beforeAll(function() {
        messenger = new Messenger(config.messenger);
    });

    beforeEach(function() {
        theRobot = new TheRobot(config.robot,
            new TheTable(config.table),
            messenger);
    });

    it('should be undefined before PLACE command', function() {
        var rPosition = theRobot._getRobotPosition();
        expect(rPosition.x === undefined &&
            rPosition.y === undefined &&
            rPosition.f === undefined).toBe(true);
        console.log('condition robot is undefined: pass');
    });

    it('should not accept MOVE command before initial PLACE command',
        function() {
            expect(theRobot.move()).toEqual(new Error(
                messenger.getMessage({
                    msg: 'noInitCommand'
                })));
            console.log('noInitCommand before move: pass');
        });

    it('should report its position upon valid place command', function() {
        var x = 2,
            y = 3,
            f = 'south';

        theRobot.place(x, y, f);

        expect(theRobot.report()).toEqual(messenger.getMessage({
            x: x,
            y: y,
            f: f.toUpperCase()
        }));
    });

});

