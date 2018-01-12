import {compile} from 'handlebars';


const template = compile(`
    <div class="fl-outer topnav">
        <div class="fl-inner mx-auto">
            <topnav data-navbar-brand="{{ topnavBrand }}"></topnav>
        </div>
    </div>
    <div class="fl-outer content">
        <div class="fl-inner mx-auto">
            <markdown>{{ content }}</markdown>
        </div>
    </div>
`);


export default function (context) {
    return template(context);
}
