const topnav = (`
    <nav class="navbar navbar-expand-md">
    <a class="navbar-brand" href="/" d3-html="navbarBrand"></a>
    </nav>
`);


export default {
    model: {
        navbarBrand: "Brand"
    },

    render () {
        return this.viewElement(topnav);
    }
};
