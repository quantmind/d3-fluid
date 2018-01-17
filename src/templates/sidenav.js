import {compile} from 'handlebars';

//
//  Sidebar template
const template = compile(`
<sidebar id="main"
    data-brand="{{ sidebarTitle }}"
    data-brand-url="/"
    data-primary-items='{{ primaryItems }}'
    data-navbar-items='{{ navbarItems }}'
    data-navbar-title='{{ navbarTitle }}'
    data-navbar-title-Url="currentUrl">
    <markdown>{{ content }}</markdown>
    {{ footer }}
</sidebar>
`);


const defaults = {
    navbarItems: [],
    primaryItems: [],
    secondaryItems: []
};


export default function (context) {
    context = {...defaults, ...context};
    context.navbarItems = JSON.stringify(context.navbarItems);
    context.primaryItems = JSON.stringify(context.primaryItems);
    context.secondaryItems = JSON.stringify(context.secondaryItems);
    return template(context);
}
