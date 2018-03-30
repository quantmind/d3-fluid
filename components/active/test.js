import {view} from 'd3-view';
import {render, getWaiter} from 'd3-view-test';

import {viewActive} from '../../build/d3-view-components';


describe('viewActive', () => {

    let vm, waiter;

    beforeEach(() => {
        waiter = getWaiter();
        vm = view({
            model: {
                $destroyDirective (dir) {
                    waiter.resolve(dir);
                }
            },
            directives: {
                active: viewActive
            }
        });
    });

    test ('currentUrl', async () => {
        expect(vm).toBeTruthy();
        const d = await render('<div><a href="/foo" d3-active>foo link</a></div>', vm);
        expect(d.view).toBe(vm);
    });

});
