import {view} from 'd3-view';
import {pop} from 'd3-let';

import viewComponents from './components/view';
import sidenav from './components/sidenav';
import metadata from './components/metadata';
import card from './components/card';
import viewLive from './components/live';
import topnav from './components/topnav';
import dev from './components/dev';

const components = {
    'view-live': viewLive,
    card,
    sidenav,
    topnav
};

//  Create View
//
export default function (root) {
    if (!root) root = window;
    const model = root.config || {},
        props = pop(model, 'meta') || {};

    // Build the model-view pair
    var vm = view({props, model, components}).use(viewComponents).use(metadata);

    root.fluid = vm;
    //
    var el = root.document.getElementById('root');
    vm.mount(el).then(() => {
        if (vm.props.env === 'dev') dev(vm);
        vm.sel.transition(150).style('opacity', 1);
    });
}
