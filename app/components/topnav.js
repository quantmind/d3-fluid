import {assign} from 'd3-let';


const template = ctx => {
    var nav =  ctx.navigationRight.map(item => {
        return (`
            <li class="nav-item">
                <a class="nav-link" href="${item.href}">${item.name}</a>
            </li>
        `);
    }).join('\n');

    return (`
        <div class="d3-fluid">
            <nav class="navbar navbar-expand-${ctx.collapse} ${ctx.theme}">
                <a class="navbar-brand" href="/" html="${ctx.brand}"></a>
                <ul class="navbar-nav ml-auto">${nav}</ul>
            </nav>
            <markdown>${ctx.content}</markdown>
            ${ctx.footer}
        </div>
    `);
};


export default {
    props: {
        theme: 'navbar-dark bg-dark',
        collapse: 'sm',
        brand: '',
        navigationRight: []
    },

    render (el) {
        const
            content = this.select(el).html(),
            footer = '',
            ctx = assign({content, footer}, this.props);
        return template(ctx);
    }
};
