'use strict';

module.exports = Messenger;

/**
 * The messenger class constructor
 * @constructor
 */

function Messenger() {
}

var config = require('config');

var prototype = {

    /**
     * Instructions for messages
     * @return {String}
     */

    getMessage: function(mData) {

        if (!mData) {
            return config.get('messages.default');
        }

        return mData;
    }
};

Messenger.prototype = Object.create(prototype);
Messenger.prototype.constructor = Messenger;



