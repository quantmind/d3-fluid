import {isObject, isString} from 'd3-let';
import {viewSlugify} from 'd3-view';

import tpl from './template.html';


const tabClasses = {
    none: null,
    tabs: 'nav-tabs',
    pills: 'nav-pills'
};


//  Reusable Tabs component with Navigo
//
//  Requires:
//
//  * d3-active directive
//
export default {
    props: {
        tabTransitionDuration: 250
    },

    model () {
        return {
            tabItems: [],
            tabType: 'tabs',
            tabTarget: "",
            tabClass: {
                reactOn: ['tabType'],
                get () {
                    return tabClasses[this.tabType];
                }
            },
            // select a tab
            $selectTab (tab) {
                if (isObject(tab)) tab = tab.href;

                var target = this.targets.get(tab),
                    event = this.$event;

                if (target) {
                    // when local targets are available rather than remote ones
                    this.tabTarget = target;
                    if (event && event.currentTarget) this.currentUrl = event.currentTarget.href;
                } else {
                    // use router if available
                    var router = this.$$view.root.router;
                    if (router && event && event.currentTarget) {
                        event.preventDefault();
                        router.navigate(event.currentTarget.href, true);
                    }
                }
                this.tabItems.forEach(item => {
                    item.active = (item.href === tab);
                });
            }
        };
    },

    render (props, attrs, el) {
        var self = this,
            model = this.model,
            items = model.tabItems;

        model.targets = new Map;

        items.forEach((item, idx) => {
            if (isString(item)) {
                item = model.$new({label: item});
                items[idx] = item;
            }
            if (!item.label) item.label = `item ${idx+1}`;
            if (!item.id) item.id = viewSlugify(item.label);
            if (!item.href) item.href = `#${item.id}`;
            //
            return item;
        });

        //
        //  cache existing targets if avalable
        this.selectChildren(el).each(function (idx) {
            var sel = self.select(this),
                id = sel.attr('id') || (items[idx] ? items[idx].id : null);
            if (id) model.targets.set(`#${id}`, sel.html());
        });

        // model.type = data.type;
        return this.viewElement(tpl, props);
    },

    mounted () {

    }
};
