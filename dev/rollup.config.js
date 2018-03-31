import json from 'rollup-plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';

import {dependencies} from '../package.json';

const externals = Object.keys(dependencies).concat(['fs', 'path', 'console', 'debug', 'd3-let']);
const externalsCli = ['d3-dispatch', 'd3-ease', 'd3-selection', 'd3-timer', 'd3-transition', 'handlebars'];
const externalsComponent = externalsCli.concat(['d3-let', 'd3-view']);
const externalsApp = externalsCli.concat(['d3-view']);


const bundle = (entry, file, externals, min) => {
    const globals = externals.reduce((g, name) => {g[name] = name.substring(0, 3) === 'd3-' ? 'd3' : name; return g;}, {});

    const b = {
        input: entry,
        external: externals,
        output: {
            format: 'umd',
            extend: true,
            sourcemap: true,
            file: `build/${file}`,
            name: 'd3',
            globals: globals
        },
        plugins: [
            json(),
            sourcemaps(),
            commonjs(),
            string({
                include: '**/*.html'
            }),
            resolve()
        ]
    };
    if (min) b.plugins.push(uglify());
    return b;
};


export default [
    {
        input: 'server/api.js',
        external: externals,
        output: {
            file: 'build/d3-fluid-server.js',
            sourcemap: true,
            format: 'cjs'
        },
        plugins: [
            json()
        ]
    },
    {
        input: 'server/index.js',
        external: externals,
        output: {
            banner: '#!/usr/bin/env node',
            file: 'bin/d3fluid',
            sourcemap: true,
            format: 'cjs',
            name: 'd3fluid'
        },
        plugins: [
            json()
        ]
    },
    bundle('components/index.js', 'd3-fluid.js', externalsComponent),
    bundle('components/index.js', 'd3-fluid.min.js', externalsComponent, true),
    bundle('app/index.js', 'd3-fluid-app.js', externalsApp),
    bundle('app/index.js', 'd3-fluid-app.min.js', externalsApp, true)
];
