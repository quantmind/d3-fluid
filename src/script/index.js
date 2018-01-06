import {view} from 'd3-view';
import markdown from './markdown';
import metadata from './metadata';

//  Create View
//
export default function () {
    //
    var model = getAppModel();

    // Build the model-view pair
    var vm = view({
        directives: {
            metadata
        },
        components: {
            markdown
        }
    });
    vm.use()

    // Set debug logging if needed
    vm.providers.setDebug(model.$context.debug);
    vm.logDebug('Start fluidily app');

    // wrap fetch with csrf
    //
    // Mount the UI
    return vm
        .use(viewForms)
        .use(viewBootstrapForms)
        .use(visualComponents)
        .use(components)
        .use(directives);
}
