import {view} from 'd3-view';
import {viewSidebar, viewActive, viewCollapse, viewMarked, viewRouter} from 'd3-view-components';
import metadata from './components/metadata';
import viewCard from './components/card';
import viewLive from './components/live';
import topnav from './components/topnav';


//  Create View
//
export default function () {

    // Build the model-view pair
    var vm = view({
        components: {
            markdown: viewMarked,
            card: viewCard,
            'view-live': viewLive,
            sidebar: viewSidebar,
            topnav
        },
        directives: {
            active: viewActive,
            collapse: viewCollapse
        }
    });
    vm.use(metadata).use(viewRouter);
    //
    var el = window.document.getElementById('root');
    vm.mount(el);
}
