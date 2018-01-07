import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';


export default {
    input: 'index.js',
    external: ['d3-let', 'd3-view', 'highlightjs', 'remarkable'],
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
    },
    plugins: [
        json(),
        resolve(),
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        })
    ]
};
