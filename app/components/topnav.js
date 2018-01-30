import {assign} from 'd3-let';


function template (ctx) {
    return (`
        <div class="d3-fluid">
            <nav class="navbar navbar-expand-${ctx.collapse}">
                <a class="navbar-brand" href="/" d3-html="navbarBrand"></a>
                <ul class="navbar-nav ml-auto">
                    <li d3-for="item in navbarRightNav" class="nav-item">
                        <a class="nav-link" d3-attr-href="item.href" d3-html="item.name"></a>
                    </li>
                </ul>
            </nav>
            <markdown>${ctx.content}</markdown>
            ${ctx.footer}
        </div>
    `);
}


export default {
    props: {
        collapse: 'sm'
    },

    model: {
        navbarBrand: "Brand",   // brand
        navbarRightNav: []       // right navigation
    },

    render (props, attrs, el) {
        const
            content = this.select(el).html(),
            footer = '',
            ctx = assign({content, footer}, props);
        return template(ctx);
    }
};
