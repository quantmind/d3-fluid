import {viewSidebar, viewActive} from 'd3-view-components';

function template (ctx) {
    return (`
        <sidebar id="main"
            data-brand="title"
            data-brand-url="/"
            data-primary-items='[]'
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

    render (props, attrs, el) {
        const
            content = this.select(el).html(),
            footer = '';
        return template({content, footer});
    }
};


export default function (vm) {
    vm.addComponent('sidenav', sidenav);
    vm.addDirective('active', viewActive);
}
