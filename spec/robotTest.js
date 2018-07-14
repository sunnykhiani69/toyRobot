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
            f = 'west';

        theRobot.place(x, y, f);

        expect(theRobot.report()).toEqual(messenger.getMessage({
            x: x,
            y: y,
            f: f.toUpperCase()
        }));
    });

    // problem test case 1

    it('should report its position', function() {

    //vars

        var x = 0,
            y = 0,
            f = 'north';

        //actions

        theRobot.place(x, y, f);
        theRobot.move();

        expect(theRobot.report()).toEqual(messenger.getMessage({
            x: 0,
            y: 1,
            f: f.toUpperCase()
        }));
        console.log('TEST CASE A PASSES');
    });

    // problem test case 2

    it('should report its position', function() {

    //vars

        var x = 0,
            y = 0,
            f = 'north';

        //actions

        theRobot.place(x, y, f);
        theRobot.left();

        expect(theRobot.report()).toEqual(messenger.getMessage({
            x: 0,
            y: 0,
            f: 'WEST'
        }));
        console.log('TEST CASE B PASSES');
    });

    // problem test case 3

    it('should report its position', function() {

        //vars

        var x = 1,
            y = 2,
            f = 'east';

        //actions

        theRobot.place(x, y, f);
        theRobot.move();
        theRobot.move();
        theRobot.left();
        theRobot.move();

        expect(theRobot.report()).toEqual(messenger.getMessage({
            x: 3,
            y: 3,
            f: 'NORTH'
        }));
        console.log('TEST CASE C PASSES');
    });

    // problem test case 3

    it('should report its position', function() {

        //vars

        var x = 1,
            y = 2,
            f = 'east';

        //actions

        theRobot.place(x, y, f);
        theRobot.move();
        theRobot.move();
        theRobot.left();
        theRobot.move();
        theRobot.right();

        expect(theRobot.report()).toEqual(messenger.getMessage({
            x: 3,
            y: 3,
            f: 'EAST'
        }));
        console.log('TEST CASE RIGHT PASSES');
    });

});

