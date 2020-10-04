const LOAD_EVENT = 'load';
const ONLINE_EVENT = 'online';
const OFFLINE_EVENT = 'offline';
const INTERESTING_EVENTS = [LOAD_EVENT, ONLINE_EVENT, OFFLINE_EVENT];

function triggerEvent(status) {
    const event = new CustomEvent('connection-status-changed', { detail: status });
    this.dispatchEvent(event);
}

function evalInterestingEvent(event) {
    status = false;
    if (event.type === LOAD_EVENT) {
        status = navigator.onLine;
    } else {
        status = event.type === ONLINE_EVENT;
    }
    triggerEvent(status);
}

class ConnectionStatus extends HTMLElement {
    constructor() {
        super();
        this.onLine = navigator.onLine || false;
    }

    connectedCallback() {
        INTERESTING_EVENTS.forEach((eventName) => {
            window.addEventListener(eventName, evalInterestingEvent);
        });
        triggerEvent(this.onLine);
    }

    disconnectedCallback() {
        INTERESTING_EVENTS.forEach((eventName) => {
            window.removeEventListener(eventName, evalInterestingEvent);
        });
    }
}

window.customElements.define('connection-status', ConnectionStatus);
