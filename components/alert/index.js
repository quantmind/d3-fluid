import {isString} from 'd3-let';

import tpl from './template.html';


const levels = {
    error: 'danger',
    warn: 'warning'
};


const messageKey = msg => `${msg.level}::${msg.message}`;

const alertDirective = {

    mount (model) {
        // event handler for adding messages
        model.$alertMessageAdd = addMessage;
        model.$alertMessageClose = closeMessage;
        model.$$messageIds = new Map;
        // messages
        model.$set('alertMessages', []);
    }
};

// component
const alertMessages = {

    props: {
        transitionDuration: 0
    },

    model: {
        $messageClass (message) {
            return 'alert-' + (levels[message.level] || message.level);
        }
    },

    render () {
        this.model.$connect('alertMessages');
        return tpl;
    }
};


export default {

    install (vm) {
        vm.addComponent('alerts', alertMessages);
        vm.addDirective('alerts', alertDirective);
    }
};


function addMessage (data) {
    if (!data) return false;
    if (isString(data)) data = {message: data};
    if (data.message) {
        if (!data.level) data.level = 'info';
        var key = messageKey(data),
            msg = this.$$messageIds.get(key);
        if (msg) msg.count += 1;
        else {
            data.count = 1;
            msg = this.$new(data);
            this.$$messageIds.set(key, msg);
            this.$push('alertMessages', msg);
        }
    }
    return false;
}


function closeMessage (msg) {
    var messages = this.alertMessages;
    this.$$messageIds.delete(messageKey(msg));

    for (let i=0; i<messages.length; ++i) {
        if (msg === messages[i]) {
            this.alertMessages = messages.slice();
            this.alertMessages.splice(i, 1);
            break;
        }
    }
}
