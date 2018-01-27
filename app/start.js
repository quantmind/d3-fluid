import {view} from 'd3-view';
import {viewMarked, viewRouter} from 'd3-view-components';
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
            markdown: viewMarked,
            'view-live': viewLive,
            card,
            topnav
        }
    });
    vm.use(metadata).use(sidenav).use(viewRouter);
    //
    var el = root.document.getElementById('root');
    vm.mount(el);
}
