export default {

    context (ctx, cfg, siteConfig) {
        if (ctx.meta)
            ctx.meta.github = siteConfig.github;
    }
};
