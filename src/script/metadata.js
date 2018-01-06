

export default {

    refresh (model, meta) {
        var head = this.select('head');
        Object.keys(meta).forEach(key => {
            meta = metaHandlers[key] || metaHandlers.content;
            meta(head, key, meta[key]);
        });
    }
};



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
