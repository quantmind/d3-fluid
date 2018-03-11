## View Router

A plugin which integrate [Navigo][] with d3-view.
Navigo is a simple minimalistic JavaScript router with a fallback for older browsers.
Simply ``use`` the plugin and configure it for you needs
```javascript
import {view} from 'd3-view';
import {viewRouter} from {d3-view-components}

const config = {
    routes (vm) {
        ...
    }
};

var vm = view().use(viewRouter, config);
await vm.mount('body');
```

The router instance can be accessed as a property of the root view:
```javascript
vm.router   //  Navigo router
```

## Config

The optional configuration object can contain the following keys

* ``routes``: array of routes to configure the router with.

## Routes component

An alternative way to configure the router and bind it to changes in the DOM is to use the
``routes`` component.


[Navigo]: https://github.com/krasimir/navigo
