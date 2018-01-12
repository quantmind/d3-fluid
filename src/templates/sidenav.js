//
//  Sidebar template

export default (`
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
