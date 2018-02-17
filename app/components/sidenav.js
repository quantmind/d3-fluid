import {viewSidebar, viewActive, viewCollapse} from 'd3-view-components';

function template (ctx) {
    return (`
        <sidebar id="main"
            data-brand="title"
            data-brand-url="/"
            data-sidebar-toggle='sidebarToggle'
            data-primary-items='primaryItems'
            data-navbar-items='[]'
            data-navbar-title="title"
            data-navbar-title-Url="currentUrl">
            <markdown>${ctx.content}</markdown>
            ${ctx.footer}
        </sidebar>
    `);
}


export default {
    components: {
        sidebar: viewSidebar
    },

    directives: {
        collapse: viewCollapse,
        active: viewActive
    },

    render (props, attrs, el) {
        const
            content = this.select(el).html(),
            sidenav = this.model[this.name] || this.model.$new(),
            footer = '';
        if (!sidenav.primaryItems)
            return this.json('nav.json').then(response => {
                sidenav.$set('primaryItems', response.data);
                return template({content, footer});
            });
        else
            return template({content, footer});
    }
};
