import {assign} from 'd3-let';


export default {

    install (vm, metadata) {
        var head = vm.select('head');
        metadata = assign(metadata || {}, head.attr('data-meta'));
        if (!metadata.title) {
            var t = head.select('title');
            metadata.title = t.size() === 1 ? t.text() : '';
        }
        vm.model.metadata = metadata;
        vm.events.on('mounted.metadata', bindMeta);
    }
};


function bindMeta (vm) {
    var head = vm.select('head');

    vm.model.metadata.$on(() => {
        let meta;
        var data = vm.model.metadata.$data();
        Object.keys(data).forEach(key => {
            meta = metaHandlers[key] || metaHandlers.content;
            meta(head, key, data[key]);
        });
    });
}


const metaHandlers = {
    title (head, key, value) {

        var el = head.select(key);
        if (!el.node) el = head.insert(key, ":first-child");
        el.text(value);
    },

    content (head, key, value) {
        var el = head.select(`meta name="${key}"`);
        if (!el.node()) el.head.append('meta').attr('name', key);
        el.attr('content', value);
    }
};
