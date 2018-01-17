import {view} from 'd3-view';
import {viewSidebar, viewActive, viewCollapse, viewMarked, viewRouter} from 'd3-view-components';
import metadata from './metadata';
import viewCard from './card';
import viewLive from './live';
import topnav from './topnav';


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
    var el = document.getElementById('root');
    vm.mount(el);
}
