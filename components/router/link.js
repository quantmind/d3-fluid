import {isAbsoluteUrl} from 'd3-view';

//
//  Directive for navigating
export default {

    mount (model) {
        var self = this;
        let href;
        this.on(this.sel, `click.${this.uid}`, (event) => {
            href = self.sel.attr('href') || '';
            if (isAbsoluteUrl(href)) return;
            self.navigate(model, href, event);
        });
        return model;
    },

    navigate (model, href, event) {
        var router = model.$$view.router;
        if (router._usePushState) {
            let to = router._getRoot() + '/' + href.replace(/^\/+/, '/');
            to = to.replace(/([^:])(\/{2,})/g, '$1/');
            window.history[router._historyAPIUpdateMethod]({}, '', to);
            if (router.resolve(to))
                event.preventDefault();
        } else router.navigate(href);
    },

    destroy () {
        this.on(this.sel, `click.${this.uid}`, null);
    }
};
