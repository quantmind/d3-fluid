# Autocomplete Directive

A directive for rendering a form field as an [awesomplete][] input.
It only requires the ```viewAutocomplete``` directive to be set in your view.
```javascript
import {view} from 'd3-view';
import {viewAutocomplete} from 'd3-view-components';

vm = view({
    directives: {
        autocomplete: viewAutocomplete
    }
});
```

### Simple Usage

```html
<input type="text" data-list="ada, java, JavaScript, python, node.js, lua, ruby" d3-autocomplete>
```
<input type="text" data-list="ada, java, JavaScript, python, node.js, lua, ruby" d3-autocomplete>
<br><br>
Note that by default you need to type at least 2 characters for the popup to show up, though that’s easy to customize
```html
<input type="text"
    data-list="ada, java, JavaScript, python, node.js, lua, ruby"
    data-minchars=1
    d3-autocomplete>
```
<input type="text" data-list="ada, java, JavaScript, python, node.js, lua, ruby" data-minchars=1 d3-autocomplete>
<br><br>

### Allow multiple values

Allow multiple values, comma separated
```html
<input type="text"
    data-list="ada, java, JavaScript, python, node.js, lua, ruby"
    data-minchars=1
    data-multiple
    d3-autocomplete>
```
<input type="text" data-list="ada, java, JavaScript, python, node.js, lua, ruby" data-minchars=1 data-multiple d3-autocomplete>
<br><br>

### Remote data

```html
<input type="text"
    d3-autocomplete='{"url": "https://unpkg.com/country-list/data.json", "label": "name", "value": "code"}'>
```
<input type="text" d3-autocomplete='{"url": "https://unpkg.com/country-list/data.json", "label": "name", "value": "code"}'>
<br><br>

#### In a form

It is easy to include a date picker in a form. For example, using the
[json schema](/flatpickr/form-example.json):

```html
<d3form data-schema='/autocomplete/form-example.json'></d3form>
```
<div class="container-float">
    <form-data class="row">
        <div class="col-sm-6">
            <d3form data-schema='/autocomplete/form-example.json'></d3form>
        </div>
        <div class="col-sm-6">
            <div d3-marked="formData"></div>
        </div>
    </form-data>
</div>
<br><br>


[awesomplete]: http://leaverou.github.io/awesomplete/

