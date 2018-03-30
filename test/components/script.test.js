import {view} from 'd3-view';

import {metadata} from "../../app/index";

import '../utils';


describe('Test script', () => {

    test('meta plugin', () => {
        const vm = view();
        vm.use(metadata);
        expect(vm.model.metadata).toBeTruthy();
    });

});
