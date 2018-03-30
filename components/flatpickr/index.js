export default {

    refresh (model, options) {
        var self = this,
            opts = options && options.$data ? options.$data() : {};

        this.require('flatpickr').then(flatpickr => {
            if (self.fp) self.fp.destroy();
            self.sel.on('input', null);
            self.sel.on('change', null);
            model.$emit('flatpickr', opts);
            self.fp = flatpickr.default(self.el, opts);
        });
    },

    destroy () {
        if (this.fp) {
            this.fp.destroy();
            this.fp = null;
        }
    }
};
