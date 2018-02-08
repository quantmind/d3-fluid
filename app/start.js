import {view} from 'd3-view';

import viewComponents from './components/view';
import sidenav from './components/sidenav';
import metadata from './components/metadata';
import card from './components/card';
import viewLive from './components/live';
import topnav from './components/topnav';


//  Create View
//
export default function (root) {
    if (!root) root = window;
    const model = root.config ? JSON.parse(root.config) : {};

    // Build the model-view pair
    var vm = view({
        model,
        components: {
            'view-live': viewLive,
            card,
            topnav
        }
    });
    vm.use(viewComponents)
        .use(metadata)
        .use(sidenav);

    root.fluid = vm;
    if (vm.model.env === 'dev') vm.use(dev);
    //
    var el = root.document.getElementById('root');
    vm.mount(el).then(() => {
        vm.sel.transition(150).style('opacity', 1);
    });
}
