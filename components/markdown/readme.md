## Markdown Component

The ``viewMarked`` component can be used to render markdown into the hosting element.
The component asynchrnously requires two libraries:

* [marked][] for rendering markdown
* [highlightjs][] for syntax highlighting

To use the component, make sure it is included in the view constructor:
```javascript
import {view} from 'd3-view';
import {viewMarked} from 'd3-view-components';

var vm = view({
    components: {
        markdown: viewMarked
    }
});
```

The directive is used throughout this site to render markdown form the [d3-view-component repo](https://github.com/quantmind/d3-view-components).

Simple usage:
```html
<markdown>
## Markdown component

This is the markdown component!
</markdown>
```


[marked]: https://github.com/chjj/marked
[highlightjs]: https://highlightjs.org/
