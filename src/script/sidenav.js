function sidenav () {
    return (`
        <sidebar id="main"
        data-brand="{{ sidebarTitle }}"
        data-brand-url="/"
        data-primary-items='{{ components }}'
        data-navbar-items="navbarItems"
        data-navbar-title="navbarTitle"
        data-navbar-title-Url="currentUrl">
        <markdown>{{ content }}</markdown>
        {{ footer }}
        </sidebar>
    `);
}


export default {
    props: {
        nav: '/nav.json'
    },

    render (props) {
        this.json(props.nav).then(nav => {
            return sidenav(nav);
        });
    }
};
