import {render} from 'd3-view-test';
import {view} from 'd3-view';

import {viewIcons} from '../../index';


describe('viewMarked -', () => {

    test ('simple', async () => {
        const vm = view().use(viewIcons);
        const d = await render('<icon/>', vm);
        expect(d.view).toBe(vm);
    });

    test ('empty', async () => {
        const vm = view().use(viewIcons);
        const d = await render('<icon name=""/>', vm);
        expect(d.view).toBe(vm);
    });

});
