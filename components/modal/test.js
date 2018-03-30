import {view} from 'd3-view';
import {isFunction} from 'd3-let';
import {render, nextTick} from 'd3-view-test';

import {viewModal} from '../../index';


describe('viewModal', () => {

    let vm;

    beforeEach(() => {
        vm = view().use(viewModal);
    });

    test ('simple', async () => {
        expect(isFunction(vm.model.$openModal)).toBe(true);
        expect(vm.model.$openModal).toBe(viewModal.modalOpen);
        const d = await render('<div/>', vm);
        expect(d.view.model.$openModal).toBe(viewModal.modalOpen);
        vm.model.$openModal({
            title: "test",
            body: "this is a test for the modal"
        });
        await nextTick();
        //var model = vm.select('#d3-view-modal').model();
        //expect(model.showModal).toBe(true);
    });

});
