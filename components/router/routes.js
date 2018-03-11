const route = {

    props: {
        path: '/',
        component: null
    },

    render () {
        var router = this.router,
            path = this.props.path,
            component = this.props.component;

        if (!component) {
            this.logWarn('route component requires a component attribute to be specified');
            component = 'div';
        }
        if (!path)  // default route
            router.on();
        else
            router.on(path, {

            });
        const el = this.createElement(component);
        return el;
    }
};

export default {

    components: {
        route: route
    },

    render (props, attrs, el) {
        let r, path;
        const
            router = this.router,
            self = this,
            container = this.createElement('div').attr('class', attrs.class || 'routes');

        this.selectChildren(el).each(function () {
            r = self.select(this);
            path = r.attr('path') || r.attr('data-path');
            if (path)
                router.on(path, component(this.tagName, container));
            else
                router.on(component(this.tagName, container));
        });

        return container;
    }
};


function component (tag, container) {

    return render;

    function render (params, query) {
        container.html(`<${tag} />`).mount({params, query});
    }
}
