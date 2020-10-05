const LOAD_EVENT_NAME = 'load';
const ONLINE_EVENT_NAME = 'online';
const OFFLINE_EVENT_NAME = 'offline';
const INTERESTING_EVENTS_NAMES = [LOAD_EVENT_NAME, ONLINE_EVENT_NAME, OFFLINE_EVENT_NAME];
const CONNECTION_STATUS_EVENT_NAME = 'connection-status-changed';

function triggerEvent(element, status) {
    const event2launch = new CustomEvent(CONNECTION_STATUS_EVENT_NAME, { detail: status });
    element.dispatchEvent(event2launch);
    console.info(status);
}

function generateHandler(element) {
    return function evalInterestingEvent(anEvent) {
        status = anEvent.type === LOAD_EVENT_NAME ? navigator.onLine : anEvent.type === ONLINE_EVENT_NAME;
        triggerEvent(element, status);
    };
}

class ConnectionStatus extends HTMLElement {
    constructor() {
        super();
        this.handler = generateHandler(this);
        // window.customElements.define('connection-status', ConnectionStatus);
    }
    connectedCallback() {
        INTERESTING_EVENTS_NAMES.forEach((eventName) => {
            window.addEventListener(eventName, this.handler);
        });
        triggerEvent(this, navigator.onLine || false);
    }

    disconnectedCallback() {
        INTERESTING_EVENTS_NAMES.forEach((eventName) => {
            window.removeEventListener(eventName, this.handler);
        });
    }
}

window.customElements.define('connection-status', ConnectionStatus);
