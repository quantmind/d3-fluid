export default {

    render (el) {
        let r, path;
        const
            router = this.router,
            self = this,
            container = this.createElement('div', true);

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
