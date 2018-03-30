import {assign} from 'd3-let';


const
    sep = new RegExp('[^,]*$'),
    rep = new RegExp('^.+,*|');


const multiple = {
    filter (text, input) {
        return window.Awesomplete.FILTER_CONTAINS(text, input.match(sep)[0]);
    },

    item (text, input) {
        return window.Awesomplete.ITEM(text, input.match(sep)[0]);
    },

    replace (text) {
        var before = this.input.value.match(rep)[0];
        this.input.value = before + text + ", ";
    }
};


export default {

    refresh (model, awe) {
        if (!this.awe) {
            var self = this;
            this.awe = true;
            awe = awe || {};
            this.htmlAttribute(awe, 'multiple');

            this.providers.require('awesomplete').catch(() => {
                if (!window.Awesomplete)
                    return self.logError(`Could not load awesomplete`);
                self.build(model, awe);
            });
        }
    },

    build (model, awe) {
        var self = this,
            cfg = self.getConfig(awe);

        if (awe.url) {
            this.json(awe.url).then(response => {
                var data = response.data;
                model.$emit('autoCompleteData', data);
                cfg.list = data;
                self.awe = new window.Awesomplete(self.el, cfg);
            });
        } else {
            self.awe = new window.Awesomplete(self.el, cfg);
        }
    },

    getConfig (awe) {
        var cfg = {
            minChars: awe.minChars || 2,
        };
        if (awe.label || awe.value) {
            if (!awe.label) awe.label = 'label';
            if (!awe.value) awe.value = 'value';

            cfg.data = function (d) {
                return {
                    label: d[awe.label],
                    value: d[awe.value]
                };
            };
        }
        if (awe.multiple) assign(cfg, multiple);
        return cfg;
    },

    htmlAttribute (o, name) {
        if (o[name] === undefined) {
            var value = this.sel.attr(`data-${name}`);
            if (value !== undefined) o[name] = value === null ? false : value || true;
        }
    }
};
