# Connection Status Web Component

## Description

Web component wich helps to detect if the browser has connectivity or not

## HOWTO use

### Example with plain HTML

See 'demo.html'.

### Example with Vue 2

On `main.js`:

```javascript
...
import { ConnectionStatus } from 'connectionstatus-webcomponent';
...
Vue.component('connection-status', ConnectionStatus);
...
new Vue({
  render: h => h(App),
}).$mount('#app');
```

On `somecomponent.vue`:

Inside `<template>` section:

```html
...
<connection-status @connection-status-changed="connectionStatusHandler">
</connection-status>
...
<h2>Connection status : {{ onlineStatus }}</h2>
...
```

Inside `<script>` section:

```javascript
...
data() {
  return {
    ...
    onlineStatus: false,
    ...
  };
},
...
methods: {
  ...
  connectionStatusHandler(event) {
    this.onlineStatus = event.detail;
  },
  ...
}
...
```

### Example with Vue 3

On `main.js`:

```javascript
...
import { ConnectionStatus } from 'connectionstatus-webcomponent';
...
const app = createApp(App);
...
app.component('connection-status', ConnectionStatus);
...
app.use(...).use(...).mount('#app');
```

On `somecomponent.vue`:

Inside `<template>` section:

```html
...
<connection-status @connection-status-changed="connectionStatusHandler">
</connection-status>
...
<h2>Connection status : {{ onlineStatus }}</h2>
...
```

Inside `<script>` section:

```javascript
...
data() {
  return {
    ...
    onlineStatus: false,
    ...
  };
},
...
methods: {
  ...
  connectionStatusHandler(event) {
    this.onlineStatus = event.detail;
  },
  ...
}
...
```
