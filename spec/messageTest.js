'use strict';

/**
 * This file will describe the test for message keys
 * The goal of this file is to make sure all messages are present
 */

var config = require('config');
var Messenger = require('./../app/messenger');

describe('The Messenger', function() {
    var messenger;

    beforeAll(function() {
        messenger = new Messenger(config.messages);
    });

    // loop through the messages to check if they are defined

    function isInMessages(key) {
        it(['should output correct', key, 'message'],
            function() {
                expect(messenger.getMessage({
                    msg: key
                }));
            });
    }

    for (var key in config.messages) {
        isInMessages(key);
        console.log(key);
    }

});
