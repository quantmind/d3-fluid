//
// Live code
// idea from https://github.com/FormidableLabs/react-live
export default {

    render (props, attrs, el) {
        this._code = this.select(el).text();
        this._mountPoint = `live-${this.uid}`;
        el = this.createElement('div').classed('row', true);

        el.append('div').classed('col-md-6', true);
        el.append('div').classed('col-md-6', true).attr('id', this._mountPoint);

        return el;
    },

    mounted () {
        const scope = {
            mountPoint: `#${this._mountPoint}`
        };
        evalCode(this._code, scope);
    }
};



function evalCode (code, scope) {
    const scopeKeys = Object.keys(scope);
    const scopeValues = scopeKeys.map(key => scope[key]);
    //const res = new Function('_poly', 'React', ...scopeKeys, code);
    //return res(_poly, React, ...scopeValues);
    return scopeValues;
}
