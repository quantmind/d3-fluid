import {viewForms, viewBootstrapForms} from 'd3-view';
import {viewMarked, viewRouter, viewAlert, viewModal, viewIcons} from 'd3-view-components';


export default function (vm) {
    vm.use(viewForms)
        .use(viewBootstrapForms)
        .use(viewModal)
        .use(viewRouter)
        .use(viewIcons);

    vm.addComponent('markdown', viewMarked);
    vm.addComponent('alerts', viewAlert);
}
