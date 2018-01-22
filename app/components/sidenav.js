import {viewSidebar, viewMarked} from 'd3-view-components';

function sidenav (ctx) {
    return (`
        <sidebar id="main"
            data-brand="{{ sidebarTitle }}"
            data-brand-url="/"
            data-primary-items='[]'
            data-navbar-items='[]'
            data-navbar-title="navbarTitle"
            data-navbar-title-Url="currentUrl">
            <markdown>${ctx.content}</markdown>
            ${ctx.footer}
        </sidebar>
    `);
}


export default {
    components: {
        markdown: viewMarked,
        sidebar: viewSidebar
    },

    render (props, attrs, el) {
        const
            content = this.select(el).html(),
            footer = '';
        return sidenav({content, footer});
    }
};
