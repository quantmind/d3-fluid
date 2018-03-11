import {view} from 'd3-view';
import {render, getWaiter} from 'd3-view-test';

import {viewFlatpickr} from '../../index';


describe('Flatpickr', () => {

    let vm, waiter;

    beforeEach(() => {
        waiter = getWaiter();
        vm = view({
            model: {
                $flatpickr (opts) {
                    waiter.resolve(opts);
                },
                $destroyDirective (dir) {
                    waiter.resolve(dir);
                }
            },
            directives: {
                flatpickr: viewFlatpickr
            }
        });
    });

    test ('simple', async () => {
        const d = await render('<input type="text" d3-flatpickr>', vm);
        var opts = await waiter.promise;
        expect(opts).toEqual({});
        var dir = d.select('input').directives().all[0];
        expect(dir.fp).toBeTruthy();
        //waiter = getWaiter();
        //vm.sel.remove();
        //var dir2 = await waiter.promise;
        //expect(dir2).toBe(dir);
        //expect(dir2.fp).toBe(null);
    });

});
