import {viewSlugify} from 'd3-view';

import {icon} from '../icons/index';


export default {
    components: {icon},

    props: {
        source: null,
        anchorIcon: 'link'
    },

    render (props, attrs, el) {
        let marked, hl, markedOptions;

        const
            classes = attrs.class || 'markdown',
            compile = source => {
                source = source ? marked(source, markedOptions) : '';
                return this.createElement('div').attr('class', classes).html(source);
            };

        return Promise.all([this.require('marked'), this.require('highlightjs')]).then(libs => {
            [marked, hl] = libs;
            markedOptions = this.markedOptions(props, marked, hl);
            if (props.source)
                return this.fetchText(props.source).then(response => compile(response.data));
            else
                return compile(this.select(el).html());
        });
    },

    markedOptions (props, marked, hl) {
        var renderer = new marked.Renderer(),
            icon = props.anchorIcon;

        renderer.heading = heading;

        return {
            renderer,
            highlight,
            langPrefix: "hljs "
        };

        function heading (text, level) {
            var id = viewSlugify(text);
            return (`<h${level}>
                <a href="#${id}" aria-hidden="true" class="anchor" id="content-${id}">
                <icon name="${icon}"></icon>
                </a>
                ${text}
                </h${level}>
            `);
        }

        function highlight (code, lang) {
            lang = hl.getLanguage(lang) ? [lang] : undefined;
            return hl.highlightAuto(code, lang).value;
        }
    }

};
