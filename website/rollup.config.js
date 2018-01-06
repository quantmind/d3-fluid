import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

const externals = Object.keys(dependencies);


export default {
    input: 'index.js',
    output: {
        format: 'umd',
        extend: true,
        file: 'static/site.js',
        name: 'd3',
        globals: {
            'd3-let': 'd3',
            'd3-view': 'd3',
            'highlightjs': 'highlightjs',
            'remarkable': 'remarkable'
        }
    }
};
