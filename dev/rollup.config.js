import json from 'rollup-plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';
const string = require('rollup-plugin-string');
import uglify from 'rollup-plugin-uglify';

import {dependencies} from '../package.json';

const externals = Object.keys(dependencies).concat(['fs', 'path', 'console']);
const externalsApp = ['d3-dispatch', 'd3-ease', 'd3-let', 'd3-transition', 'd3-view', 'handlebars'];
const globalsApp = externalsApp.reduce((g, name) => {g[name] = name.substring(0, 3) === 'd3-' ? 'd3' : name; return g;}, {});


const bundle = (entry, file, min) => {
    const b = {
        input: entry,
        external: externalsApp,
        output: {
            format: 'umd',
            extend: true,
            sourcemap: true,
            file: `build/${file}`,
            name: 'd3',
            globals: globalsApp
        },
        plugins: [
            json(),
            sourcemaps(),
            commonjs(),
            string({
                include: '**/*.html'
            }),
        ]
    };
    if (min) b.plugins.push(uglify());
    return b;
};


export default [
    {
        input: 'server/index.js',
        external: externals,
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
    bundle('components/index.js', 'd3-fluid.js'),
    bundle('components/index.js', 'd3-fluid.min.js', true),
    bundle('app/index.js', 'd3-fluid-app.js'),
    bundle('app/index.js', 'd3-fluid-app.min.js', true)
];
