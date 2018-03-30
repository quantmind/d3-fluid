import {viewSidebar, viewActive, viewCollapse} from '../../components/index';

function template (ctx) {
    return (`
        <sidebar id="main"
            data-model="sidenav"
            data-brand="title"
            data-brand-url="/"
            data-navbar-title="title"
            data-navbar-title-Url="currentUrl">
            <routes>
                <markdown-route path="/components/:name">
                    <markdown>${ctx.content}</markdown>
                </markdown-route>
            </routes>
            ${ctx.footer}
        </sidebar>
    `);
}


const markdownRoute = {
    render () {
        const url = this.router.lastRouteResolved().url;
        return this.json(`${url}.json`).then(response => {
            const data = response.data;
            return `<markdown>${data.content}</markdown>`;
        });
    }
};


export default {
    components: {
        markdownRoute,
        sidebar: viewSidebar
    },

    directives: {
        collapse: viewCollapse,
        active: viewActive
    },

    render (el) {
        let
            content = this.select(el).html(),
            sidenav = this.model[this.name],
            footer = '';
        if (!sidenav) {
            sidenav =  this.model.$new();
            this.model[this.name] = sidenav;
        }
        if (!sidenav.primaryItems)
            return this.json('nav.json').then(response => {
                sidenav.$set('primaryItems', response.data);
                return template({content, footer, path: this.props.path});
            });
        else
            return template({content, footer});
    }
};
