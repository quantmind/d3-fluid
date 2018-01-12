import {compile} from 'handlebars';
//
//  Sidebar template

const template = compile(`
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


export default function (context) {
    return template(context);
}
