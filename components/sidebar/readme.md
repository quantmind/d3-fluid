# Sidebar

Usage:
```javascript
import {viewSidebar} from 'd3-view-component';

vm = view({
    components: {
        sidebar: viewSidebar
    }
});
```

## Customization

The sidebar can be customized via several reactive properties.

* ``primaryItems``: list of [navigation items][] located in the sidebar
* ``secondaryItems``: list of [navigation items][] located in the sidebar, below the ``primaryItems``
* ``sidebarToggle``: the sidebar toggle element which by default is ```<i class="ion-android-menu"></i>```
* ``navbarItems``: list of [navigation items][] located in the top navbar
* ``navbarTitle``: Title to display in the top navbar
* ``navbarTitleUrl``: url for the navbar title

## Navigation item

A navigation item can be a string or an object.
If a string it is converted into an object with name property.
The object has the following properties:
```json
{
    "name": "Required - the item name",
    "label": "optional label to display, use name if not provided"
    "href": "optional href for the anchor, use name if not available"
}
```


[navigation items]: #navigation-items
