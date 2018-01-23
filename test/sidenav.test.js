import {render} from 'd3-view-test';

import {sidenav} from '../app/index';


describe('sidenav page', () => {

    test('component', async () => {

        var d = await render(`<sidenav />`, {sidenav}),
            cm = d.component;

        expect(cm.name).toBe('sidebar');

    });

});
