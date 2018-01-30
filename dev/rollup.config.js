import json from 'rollup-plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import {dependencies} from '../package.json';

const externals = Object.keys(dependencies);


export default [
    {
        input: 'server/index.js',
        external: externals.concat(['fs', 'path', 'console']),
        output: {
            banner: '#!/usr/bin/env node',
            file: 'bin/d3fluid',
            format: 'cjs',
            name: 'd3fluid'
        },
        plugins: [
            json()
        ]
    },
    {
        input: 'app/index.js',
        external: ['d3-let', 'd3-view', 'd3-view-components', 'handlebars'],
        output: {
            format: 'umd',
            extend: true,
            sourcemap: true,
            file: 'build/d3-fluid.js',
            name: 'd3',
            globals: {
                'd3-let': 'd3',
                'd3-view': 'd3',
                'd3-view-components': 'd3',
                'handlebars': 'handlebars',
                'highlightjs': 'highlightjs',
                'remarkable': 'remarkable'
            }
        },
        plugins: [
            json(),
            sourcemaps()
        ]
    }
];
