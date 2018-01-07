import {view} from 'd3-view';
import {viewSidebar, viewActive, viewCollapse} from 'd3-view-components';
import markdown from './markdown';
import metadata from './metadata';
import viewCard from './card';
import viewLive from './live';


//  Create View
//
export default function () {

    // Build the model-view pair
    var vm = view({
        components: {
            markdown,
            card: viewCard,
            'view-live': viewLive,
            sidebar: viewSidebar
        },
        directives: {
            active: viewActive,
            collapse: viewCollapse
        }
    });
    vm.use(metadata);
    //
    var el = document.getElementById('root');
    vm.mount(el);
}
