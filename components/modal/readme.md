## Modal Plugin

Use the modal plugin to add dialogs to your site for lightboxes, user notifications, or custom content.

### Setup

To use the modal you need to **use** the modal plugin.
```javascript
import {view} from 'd3-view';
import {viewModal} from 'd3-view-components';

view().use(viewModal).mount('body');
```

The plugins add the ``$openModal`` utility function for opening the modal with
custom options.

### Simple Example

A simple dialog
```html
<button class="btn btn-primary" d3-on="$emit('openModal', '#simple-modal')">Open modal</button>
<div id="simple-modal" class="d-none">
    <modal-header>Simple modal</modal-header>
    <modal-body>Demonstrate a simple modal component using d3-view</modal-body>
    <modal-footer>
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" d3-on="$emit('hideModal')">Close</button>
    </modal-footer>
</div>
```
<button class="btn btn-primary" d3-on="$emit('openModal', '#simple-modal')">Open modal</button>
<div id="simple-modal" class="d-none">
    <modal-header>Simple modal</modal-header>
    <modal-body>Demonstrate a simple modal component using d3-view</modal-body>
    <modal-footer>
        <button type="button" class="btn btn-primary" d3-on="$emit('hideModal')">Save changes</button>
        <button type="button" class="btn btn-secondary"  d3-on="$emit('hideModal')">Close</button>
    </modal-footer>
</div>
