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
    }
];
