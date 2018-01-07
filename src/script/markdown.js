import Markdown from 'remarkable';
import {highlight, highlightAuto, getLanguage} from 'highlightjs';

export default {

    props: {
        lang: null,
        source: null
    },

    render (props, attrs, el) {
        const
            self = this,
            md = new Markdown({
                html: true,
                linkify: true,
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
                }
            });

        if (props.source)
            return this.fetchText(props.source).then(response => build(response.data));
        else
            return build(this.select(el).text());

        function build (source) {
            source = md.render(source);
            return self.createElement('div').classed('content', true).html(source);
        }
    }

};
