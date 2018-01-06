import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import {dependencies} from '../package.json';

const externals = Object.keys(dependencies);


export default [
    {
        input: 'src/index.js',
        external: externals.concat(['fs', 'path', 'console']),
        output: {
            banner: '#!/usr/bin/env node',
            file: 'bin/d3fluid',
            format: 'cjs',
            name: 'd3fluid'
        },
        plugins: [
            json(),
            babel({
                babelrc: false,
                runtimeHelpers: true,
                presets: ['es2015-rollup']
            })
        ]
    },
    {
        input: 'src/script/index.js',
        external: ['d3-let', 'd3-view', 'highlightjs', 'remarkable'],
        output: {
            format: 'umd',
            extend: true,
            file: 'build/d3-fluid.js',
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
            babel({
                babelrc: false,
                runtimeHelpers: true,
                presets: ['es2015-rollup']
            })
        ]
    }
];
