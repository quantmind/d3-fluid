import {viewSidebar, viewActive, viewCollapse} from 'd3-view-components';

function template (ctx) {
    return (`
        <sidebar id="main"
            data-brand="title"
            data-brand-url="/"
            data-primary-items='navigation'
            data-navbar-items='[]'
            data-navbar-title="title"
            data-navbar-title-Url="currentUrl">
            <markdown>${ctx.content}</markdown>
            ${ctx.footer}
        </sidebar>
    `);
}


const sidenav = {
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
            footer = '';
        if (!this.model.navigation)
            return this.json('nav.json').then(response => {
                this.model.$set('navigation', response.data);
                return template({content, footer});
            });
        else
            return template({content, footer});
    }
};


export default function (vm) {
    vm.addComponent('sidenav', sidenav);
}
