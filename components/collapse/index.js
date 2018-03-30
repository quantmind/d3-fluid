import {dispatch} from 'd3-dispatch';

const
    COLLAPSE = 'collapse',
    COLLAPSING = 'd3-collapsing',
    COLLAPSED = 'collapsed',
    WIDTH = 'width',
    SHOW = 'show';

export const events = dispatch(
    'show-start',
    'show-end',
    'hide-start',
    'hide-end'
);


export default {
    events,

    refresh () {
        if (this.target) return;

        var self = this,
            sel = this.sel,
            tid = sel.attr('aria-controls'),
            target = tid ? this.select(`#${tid}`) : null,
            node = target ? target.node() : null;

        if (node) {
            node.d3Collapse = this;
            this.target = target;
            this.smallScreen = sel.attr('data-small-screen') || 993;
            this.container = this.getContainer(target);
            const isOpen = target.classed(SHOW);
            this.duration = 400;
            this.transitioning = false;
            sel.classed(COLLAPSED, !isOpen);
            sel.attr('aria-expanded', isOpen);
            this.on(sel, `click.${this.uid}`, (event) => self.toggle(target, event));
        }
    },

    show (target, event) {
        if (this.transitioning || target.classed(SHOW)) return;
        if (event) event.preventDefault();
        var self = this,
            sel = this.sel,
            dimension = this.getDimension(target);
        target.classed(COLLAPSE, false).classed(COLLAPSING, true).style(dimension, 0);
        sel.classed(COLLAPSED, false).attr('aria-expanded', true);
        this.transitioning = true;
        const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1),
            scrollSize = `scroll${capitalizedDimension}`,
            node = target.node(),
            size = node[scrollSize],
            sizepx = `${size}px`;

        if (this.container) this.container.show(sizepx);
        events.call('show-start', undefined, target);

        target.transition()
            .duration(this.duration)
            .style(dimension, sizepx)
            .on("end", () => {
                self.transitioning = false;
                target.classed(COLLAPSING, false).classed(COLLAPSE, true).classed(SHOW, true);
                target.style(dimension, '');
                events.call('show-end', undefined, target);
            });
    },

    hide (target, event) {
        if (this.transitioning || !target.classed('show')) return;
        if (event) event.preventDefault();
        var self = this,
            sel = this.sel,
            dimension = this.getDimension(target);
        target.classed(COLLAPSING, true).classed(COLLAPSE, false).classed(SHOW, false);
        sel.classed(COLLAPSED, true).attr('aria-expanded', false);
        this.transitioning = true;
        target.style(dimension, '');
        if (this.container) this.container.hide();
        events.call('hide-start', undefined, target);
        target.transition()
            .duration(this.duration)
            .style(dimension, '0px')
            .on("end", () => {
                self.transitioning = false;
                target.classed(COLLAPSING, false).classed(COLLAPSE, true);
                events.call('hide-end', undefined, target);
            });
    },

    toggle (target, event) {
        var sel = this.sel,
            expanded = sel.attr('aria-expanded');
        if (expanded === 'false') this.show(target, event);
        else this.hide(target, event);
    },

    getDimension (target) {
        return target.classed(WIDTH) ? 'width' : 'height';
    },

    getContainer (target) {
        const self = this,
            style = target.attr('data-container'),
            element = style ? this.select(target.node().parentNode) : null;

        if (element) {
            let small = this.getSize(target);

            this.select(window)
                .on(`resize.${this.uid}`, () => {
                    small = self.getSize(target, small);
                });


            return {
                show (sizepx) {
                    element
                        .transition()
                        .duration(self.duration)
                        .style(style, sizepx)
                        .on("end", () => {
                            element.classed(SHOW, true).style(style, '');
                        });
                },
                hide () {
                    element
                        .transition()
                        .duration(self.duration)
                        .style(style, '0px')
                        .on("end", () => {
                            element.classed(SHOW, false);
                        });
                }
            };
        }
    },

    getSize (target, prev) {
        const sizepx = this.select('body').style('width'),
            size = +sizepx.substring(0, sizepx.length-2),
            small = +size < this.smallScreen;
        if (prev === undefined) {
            if (small) target.classed(SHOW, false);
        } else if (small !== prev) {
            if (small) this.hide(target);
            else this.show(target);
        }
        return small;
    },

    destroy () {
        if (this.target) this.target.on(`click.${this.uid}`, null);
    }

};
