export default {

    context (app, ctx) {
        if (ctx.meta)
            ctx.meta.github = app.config.github;
    }
};
