import { Manager, Socket } from 'socket.io-client';

export class SyncProvider extends Socket {
    #handlers = new Set();

    #handleMessages = (messages) => {
        this.#handlers.forEach((cb) => {
            cb(messages);
        });
    };

    constructor(url, nsp = '/ws') {
        const manager = new Manager(url, {
            transports: ['websocket'],
            autoConnect: false,
        });

        super(manager, nsp);
        this.on('message:list', this.#handleMessages);
    }

    subscribe(address, startId, callback) {
        this.#handlers.add(callback);
        this.emit('message:subscribe', {
            address,
            start_id: startId,
        });
    }
}