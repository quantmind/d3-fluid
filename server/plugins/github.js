export default {

    context (app, ctx) {
        ctx.meta.github = app.config.github;
    }
};
