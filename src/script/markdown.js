import Markdown from 'remarkable';
import {highlight, highlightAuto, getLanguage} from 'highlightjs';

export default {

    props: {
        lang: null
    },

    render (props, attrs, el) {
        let source = this.select(el).text();

        const md = new Markdown({
            langPrefix: 'hljs css ',
            highlight: function(str, lang) {
                lang = lang || props.lang;
                if (lang && getLanguage(lang)) {
                    try {
                        return highlight(lang, str).value;
                    } catch (err) {
                        // do nothing
                    }
                }
                try {
                    return highlightAuto(str).value;
                } catch (err) {
                    // do nothing
                }
                return '';
            },
            html: true,
            linkify: true,
        });

        source = md.render(source);
        return this.createElement('div').classed('content', true).html(source);
    }

};
