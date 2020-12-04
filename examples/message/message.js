import Vue from 'vue';
import MessageItemComponent from './message.vue';

let message;
let messages = [];
let seed = 1;

const messageItemConstructor = Vue.extend(MessageItemComponent);

const MessageNow  = (option) => {
    const id = "__message__" + seed ++;

    let options = {...option};
    
    options.onClose = () => {
        MessageNow.close(id);
    }

    message = new messageItemConstructor({ data: options });

    message.id = id;

    message.$mount()

    document.body.appendChild(message.$el);

    // message.visible = true;

    let verticalOffset = 0;
    messages.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    verticalOffset += 16;

    message.dom = message.$el;
    message.verticalOffset = verticalOffset;
    messages.push(message);

    return message;
}
MessageNow.close = (id) => {
    let index = -1;
    const len = messages.length;
    const message = messages.filter((mes, i) => {
        if(mes.id === id) {
            index = i;
            return true;
        }
        return false;
    })[0];
    if(!message) return;
    messages.splice(index, 1);
    if(len <= 1) return;

    const removedHeight = message.dom.offsetHeight;

    for (let i = index; i < len - 1 ; i++) {
        messages[i].verticalOffset =
            messages[i].verticalOffset - removedHeight - 16;
    }
}

export default MessageNow;