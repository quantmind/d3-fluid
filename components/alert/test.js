import {view} from 'd3-view';
import {isFunction} from 'd3-let';
import {render, validateHTML} from 'd3-view-test';

import {viewAlert} from '../../index';

import tpl from './template.html';


describe('Alert -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                alerts: viewAlert
            }
        });
    });

    test('template', () => {
        expect(validateHTML(tpl)).toBe(true);
    });

    test ('simple', async () => {
        const d = await render('<alerts/>', vm);
        expect(isFunction(d.view.model.$alertMessage)).toBe(true);
        var alerts = vm.sel.select('.alert-messages').model();
        expect(alerts.messages.length).toBe(0);
        vm.model.$alertMessage('Hi!');
        //
        expect(alerts.messages.length).toBe(1);
        await d.nextTick();
        //
        var elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(1);
        vm.model.$alertMessage({message: 'warning message', level: 'warn'});
        //
        elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(1);
        expect(elements.directives()).toBeTruthy();
        await d.nextTick();
        elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(2);
    });

    test ('close', async () => {
        const d = await render('<alerts/>', vm);
        d.view.model.$alertMessage('Hi!');
        var alerts = vm.sel.select('.alert-messages').model();
        expect(alerts.messages.length).toBe(1);
        let elements = d.selectAll('.alert');
        expect(elements.size()).toBe(0);
        await d.nextTick();
        elements = d.selectAll('.alert');
        expect(elements.size()).toBe(1);
        //
        // close it
        const btn = d.select('button.close');
        expect(btn.size()).toBe(1);
        // const uid = btn.directives().all[0].uid;
        // const events = btn.on(`click.${uid}`);
        // d.click('button.close');
        // elements = d.selectAll('.alert');
        // expect(elements.size()).toBe(0);
    });
});
