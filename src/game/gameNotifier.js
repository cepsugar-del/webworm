const event = {
    sys: 'system',
    end: 'game:end',
    start: 'gameStart',
};

class Msg {
    constructor(f,t,v){
        this.from = f;
        this.type = t;
        this.value = v;
    }
}

class Notifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws':'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) =>{
            this.receiveEvent(new Msg('Startup',Event.sys, {msg: 'connected'}));
        };
        this.socket.onclose = (event) =>{
            this.receiveEvent(new Msg('Simon', Event.sys, {msg: 'disconnected'}));
        };
        this.socket.onmessage = async(msg)=>{
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            }catch{}
        };
    }

    addHandler(handler){
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h!==handler);

    }

    receiveEvent(event){
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

const GameNotifier = new Notifier();
export {Event, Notifier}