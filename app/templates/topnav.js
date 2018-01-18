import {compile} from 'handlebars';
import {List} from 'immutable';

import github from '../utils/github';


const template = compile(`
    <div class="fl-outer topnav">
        <div class="fl-inner mx-auto">
            <topnav data-navbar-brand="{{ topnavBrand }}"
                data-navbar-right-nav="{{ rightNav }}"></topnav>
        </div>
    </div>
    <div class="fl-outer content">
        <div class="fl-inner mx-auto">
            <markdown>{{ content }}</markdown>
        </div>
    </div>
`);


export default function (context) {
    if (context.rightNav) {
        var nav = context.rightNav;
        if (context.github)
            nav = List(nav).push({
                icon: 'github',
                name: 'github',
                href: github.url(context)
            });
        context.rightNav = JSON.stringify(nav);
    }
    return template(context);
}
