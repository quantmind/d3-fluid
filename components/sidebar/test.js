import {view} from 'd3-view';
// import {render} from 'd3-view-test';

import {viewSidebar} from '../../index';


describe('sidebar -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                sidebar: viewSidebar
            }
        });
    });

    test ('simple', async () => {
        expect(vm).toBeTruthy();
        //const d = await render('<sidebar/>', vm);
        ///expect(d.view).toBe(vm);
    });

});
