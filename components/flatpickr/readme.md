## Flatpickr Directive

This directive integrates [flatpickr][] datetime picker with [d3-view][].
It only requires the ```viewFlatpickr``` directive to be set in your view.
```javascript
import {view} from 'd3-view';
import {viewFlatpickr} from 'd3-view-components';

vm = view({
    directives: {
        flatpickr: viewFlatpickr
    }
});
```

#### Simple Usage

```html
<input type="text" d3-flatpickr></input>
```
<input type="text" d3-flatpickr>
<br><br>

#### With time

```html
<input type="text" d3-flatpickr='{"enableTime": true}'>
```
<input type="text" d3-flatpickr='{"enableTime": true}'>
<br><br>

#### In a form

It is easy to include a date picker in a form. For example, using the
[json schema](/flatpickr/form-example.json):

```html
<d3form data-schema='/flatpickr/form-example.json'></d3form>
```
<div class="container-float">
    <form-data class="row">
        <div class="col-sm-6">
            <d3form data-schema='/flatpickr/form-example.json'></d3form>
        </div>
        <div class="col-sm-6">
            <div d3-marked="formData"></div>
        </div>
    </form-data>
</div>
<br><br>


[d3-view]: https://github.com/quantmind/d3-view
[flatpickr]: https://chmln.github.io/flatpickr/

