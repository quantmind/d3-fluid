## Alert Component

The alert component displays alert elements when alert events are triggered.
Alerts are available for any length of text, as well as an optional dismiss button.
Type a message on the right and see the alert appearing on the left.
Same messages with same level are not repeated, instead a counter is added.

<div class="container-float">
    <div class="row" d3-alerts>
        <div class="col-sm-6">
            <alerts data-transition-duration=250></alerts>
        </div>
        <div class="col-sm-6">
            <d3form data-url='alert/form-example.json'></d3form>
        </div>
    </div>
</div>
<br><br>

This example is created with the below markup and the [form-example.json](alert/form-example.json) form schema.
```html
<div class="container-float">
    <div class="row">
        <div class="col-sm-6">
            <alerts data-transition-duration=250></alerts>
        </div>
        <div class="col-sm-6">
            <d3form data-url='alert/form-example.json'></d3form>
        </div>
    </div>
</div>
```

### Setup

To use the component simply include it in the components object of a view.
```javascript
import {view} from 'd3-view';
import {viewAlert} from 'd3-view-components';

var vm = view().use(viewAlert);
await vm.mount('body');
```
The ``d3-alerts`` directive should be placed in the outer HTML element for collecting messages.
From components which are descendant of this outer HTML element it is possible to ``$emit`` messages
```javascript
$emit('alertMessageAdd', {level: "success", message: "It worked!"});
```
Messages are then displayed by the ``alerts`` component (which must be a descendant of the outer HTML element hosting the ``d3-alert`` directive).

### Javascript Usage

To display a message, from a model in a component
```javascript
model.$emit('alertMessage', 'Hi!');
```
To display messages with different levels:
```javascript
model.$emit('alertMessage', {
    message: '<strong>Warning!</strong> This is a warning message'
    level: 'warning'
});
model.$emit('alertMessage', {
    message: '<strong>Danger!</strong> Something very wrong'
    level: 'danger'
});
```
