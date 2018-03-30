## Active Directive

The active directive allows to set the ``active`` class in anchor elements.
The directive has no dependencies and can be installed simply by
```javascript
import {view} from 'd3-view';
import {viewActive} from 'd3-view-components';

var vm = view({
    directives: {
        active: viewActive
    }
});
```
Typical usage
```html
<a href="/some/local/path" d3-active>a link with active</a>
```
This directive should be used with anchor elements only.

To make sure only the exact ``href`` is marked as active set ``data-active-strict``
attribute in the element
```html
<a href="/some/local/path" d3-active data-active-strict>a link with active</a>
```
