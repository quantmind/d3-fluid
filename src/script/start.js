import {view} from 'd3-view';
import markdown from './markdown';
import metadata from './metadata';

//  Create View
//
export default function () {

    // Build the model-view pair
    var vm = view({
        components: {
            markdown
        }
    });
    vm.use(metadata);
    //
    var el = document.getElementById('root');
    vm.mount(el);
}
