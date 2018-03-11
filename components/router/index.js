import {assign} from 'd3-let';
import {viewEvents} from 'd3-view';

import {dispatch} from 'd3-dispatch';

import link from './link';
import routes from './routes';
import Navigo from './navigo';


export default {

    install (vm, config) {
        config = config || {};
        var events = dispatch('before', 'after', 'leave'),
            baseUrl = vm.providers.resolve(config.basePath || '/'),
            router = new Navigo(baseUrl);

        // d3 link directive
        vm.addDirective('link', link);
        // routes component
        vm.addComponent('routes', routes);
        //
        vm.router = router;
        vm.routerEvents = events;
        if (config.routes) config.routes(vm);

        router.hooks({
            before (done, params) {
                events.call('before', undefined, vm, params);
                done();
            },
            after (params) {
                // var url = router.lastRouteResolved().url;
                var url = vm.providers.location.href;
                vm.model.$set('currentUrl', url);
                events.call('after', undefined, vm, params);
            },
            leave (params) {
                events.call('leave', undefined, vm, params);
            }
        });

        // Add router to all components which are part of the vm view
        viewEvents.on('component-mount.router', cm => {
            if (cm.root === vm) cm.router = router;
        });

        // auto resolve
        if (config.autoResolve !== false)
            vm.events.on('mounted.router', () => {
                vm.logDebug('Resolve route with router');
                vm.router.resolve();
            });
    },

    with (obj) {
        obj = assign({}, obj);
        if (!obj.props) obj.props = {};
        obj.props.routeParams = {};
        obj.props.routeQuery = '';
        return obj;
    }
};
