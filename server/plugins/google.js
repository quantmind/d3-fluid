function tpl(id) {
    return (`
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
        </script>
    `);
}


//
//  Add google analytics if required
export default function (app, config) {

    if (config.google && config.google.analyticsId) {
        config.bodyExtra.push(tpl(config.google.analyticsId));
    }
}
