## Alert Component

The alert component displays alert elements when alert messages are triggered.

Type a message on the right and see the alert appearing on the left.
Same messages with same level are not repeated, instead a counter is added.

<div class="container-float">
    <div class="row">
        <div class="col-sm-6">
            <alerts data-transition-duration=250></alerts>
        </div>
        <div class="col-sm-6">
            <d3form data-schema='alert/form-example.json'></d3form>
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
            <d3form data-schema='alert/form-example.json'></d3form>
        </div>
    </div>
</div>
```

### Setup

To use the component simply include it in the components object of a view.
```javascript
import {view} from 'd3-view';
import {viewAlert} from 'd3-view-components';

var vm = view({
    components: {
        alerts: viewAlert,
        ...
    }
});
await vm.mount('body');
```

```html
<isolated><alerts data-messages='["simple message"]'></alerts></isolated>
```
<isolated><alerts data-messages='["simple message"]'></alerts></isolated>

The ``alerts`` component finds the first ``isolatedRoot`` of the model and
add the ``$alertMessage`` hook which listen for ``alertMessage`` custom events
form all its children models.

In the above example, the ``isolated`` component make sure the view model
is isolated to that example so no other messages triggered anywhere
else in the application are displayed in the child ``alerts`` component.

### Javascript Usage

To display a message, from a model in a component
```javascript
model.$emit('alertMessage', 'Hi!');
```
To display messages with different levels:
```javascript
model.$emit('alertMessage', {
    message: '<strong>Warning!</strong> This is a wrning message'
    level: 'warning'
});
model.$emit('alertMessage', {
    message: '<strong>Danger!</strong> Something very wrong'
    level: 'danger'
});

```

