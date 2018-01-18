function topnav (props) {
    return (`
        <nav class="navbar navbar-expand-${props.collapse}">
        <a class="navbar-brand" href="/" d3-html="navbarBrand"></a>
        <ul class="navbar-nav ml-auto">
            <li d3-for="item in navbarRightNav" class="nav-item">
                <a class="nav-link" d3-attr-href="item.href" d3-html="item.name"></a>
            </li>
        </nav>
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

    render (props) {
        return this.viewElement(topnav(props));
    }
};
