import {view} from 'd3-view';
import {render} from 'd3-view-test';

import {viewTabs, viewActive} from '../../index';


describe('viewTabs -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                tabs: viewTabs
            },
            directives: {
                active: viewActive
            }
        });
    });

    test ('simple', async () => {
        const d = await render(`<tabs data-tab-items='["one", "two"]'></tabs>`, vm);
        expect(d.view).toBe(vm);
    });

});
