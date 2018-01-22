import {resolve as resolvePath} from 'path';


export function resolve (base, path) {
    path = resolvePath(base, path);
    return clean(`${path}/`);
}


export function clean (path) {
    return path.replace(/^\/+/, '/');
}
