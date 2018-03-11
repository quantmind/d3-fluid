import {viewEvents} from 'd3-view';


export default {

    //
    // Listen for changes to the currentUrl attribute
    mount (model) {
        var dir = this;
        model.$on(`currentUrl.${this.uid}`, () => dir.refresh(model));
        return model;
    },

    refresh (model) {
        const
            href = this.el.href,
            current = model.currentUrl,
            sel = this.sel;

        sel.classed('active', false);

        if (!href || !current || href !== current.substring(0, href.length)) return;
        if (sel.attr('data-active-strict') !== null && href !== current) return;

        var rel = current.substring(href.length),
            dvd = rel.substring(0, 1);

        if (!rel || dvd === '/' || dvd === '#')
            this.sel.classed('active', true);
    },

    //
    // Remove listener for changes to the currentUrl attribute
    destroy (model) {
        if (model)
            model.$off(`currentUrl.${this.uid}`);
    }
};

//
// Make sure the currentUrl attribute is a reactive attribute
viewEvents.on('component-mount.currentUrl', vm => {
    if (!vm.parent) vm.model.currentUrl = vm.ownerDocument.location.href;
});
