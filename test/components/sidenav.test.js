import {view} from 'd3-view';
import {render} from 'd3-view-test';

import '../utils';
import {sidenav} from '../../app/index';


describe('sidenav page', () => {

    test('component', async () => {

        var d = await render(`<sidenav />`, view({components: {sidenav}})),
            cm = d.component;

        expect(cm.name).toBe('sidebar');

    });

});
