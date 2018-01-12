import {compile} from 'handlebars';

import footer from './footer';
import sidenav from './sidenav';
import topnav from './topnav';


export const templates = {
    footer: compile(footer),
    sidenav,
    topnav
};


export default function (app, siteConfig) {
    const tmpl = siteConfig.templates;
    if (!tmpl) return;
    Object.keys(tmpl).forEach(name => {
        templates[name] = compile(tmpl[name]);
    });
}
