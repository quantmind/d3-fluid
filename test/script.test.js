import {view} from 'd3-view';

import {fluidMetadata} from "../index";


describe('Test script', () => {

    test('meta plugin', () => {
        const vm = view();
        vm.use(fluidMetadata);
        expect(vm.model.metadata).toBeTruthy();
    });

});
