import express from 'express';


export default app => {
    app.config.static.forEach(path  => {
        if (typeof path === 'string')
            app.use(express.static(path));
        else
            app.use(path[0], express.static(path[1]));
    });
};
