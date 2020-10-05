const LOAD_EVENT_NAME = 'load';
const ONLINE_EVENT_NAME = 'online';
const OFFLINE_EVENT_NAME = 'offline';
const INTERESTING_EVENTS_NAMES = [LOAD_EVENT_NAME, ONLINE_EVENT_NAME, OFFLINE_EVENT_NAME];
const CONNECTION_STATUS_EVENT_NAME = 'connection-status-changed';

function triggerEvent(status) {
    const event = new CustomEvent(CONNECTION_STATUS_EVENT_NAME, { detail: status });
    this.dispatchEvent(event);
}

function evalInterestingEvent(event) {
    status = false;
    if (event.type === LOAD_EVENT_NAME) {
        status = navigator.onLine;
    } else {
        status = event.type === ONLINE_EVENT_NAME;
    }
    triggerEvent(status);
}

class ConnectionStatus extends HTMLElement {
    connectedCallback() {
        INTERESTING_EVENTS_NAMES.forEach((eventName) => {
            window.addEventListener(eventName, evalInterestingEvent);
        });
        triggerEvent(navigator.onLine || false);
    }

    disconnectedCallback() {
        INTERESTING_EVENTS_NAMES.forEach((eventName) => {
            window.removeEventListener(eventName, evalInterestingEvent);
        });
    }
}

window.customElements.define('connection-status', ConnectionStatus);
