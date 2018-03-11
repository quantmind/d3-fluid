import {render} from 'd3-view-test';
import {view} from 'd3-view';

import {viewMarked} from '../../index';


describe('viewMarked -', () => {

    test ('simple', async () => {
        const vm = view({
            components: {
                markdown: viewMarked
            }
        });
        expect(vm).toBeTruthy();
        const d = await render('<markdown/>', vm);
        expect(d.view).toBe(vm);
        //await vm.mount(vm.viewElement('<div><markdown># A Test</markdown></div>'));
        //var sel = vm.sel.select('.markdown');
        //expect(sel.size()).toBe(1);
        //expect(sel.node().tagName).toBe('DIV');
    });

});
