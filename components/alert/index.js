import {isString} from 'd3-let';

import tpl from './template.html';


const levels = {
    error: 'danger',
    warn: 'warning'
};


const messageKey = msg => `${msg.level}::${msg.message}`;


// component render function
export default {

    props: {
        transitionDuration: 0
    },

    model () {
        return {
            messages: [],

            $messageClass (message) {
                return 'alert-' + (levels[message.level] || message.level);
            },

            $close (msg) {
                var messages = this.messages;

                delete this.$$messageIds[messageKey(msg)];

                for (let i=0; i<messages.length; ++i) {
                    if (msg === messages[i]) {
                        this.messages = messages.slice();
                        this.messages.splice(i, 1);
                        break;
                    }
                }
            }
        };
    },

    render () {

        var model = this.model,
            messages = model.messages.splice(0),
            messageIds = {},
            root = model.isolatedRoot;

        model.$$messageIds = messageIds;

        root.$alertMessage = onMessage;

        messages.forEach(onMessage);

        function onMessage (data) {
            if (!data) return;
            if (isString(data)) data = {message: data};
            if (data.message) {
                if (!data.level) data.level = 'info';
                var key = messageKey(data),
                    msg = messageIds[key];
                if (msg) msg.count += 1;
                else {
                    data.count = 1;
                    msg = model.$new(data);
                    messageIds[key] = msg;
                    model.$push('messages', msg);
                }
            }
        }

        return tpl;
    }
};
