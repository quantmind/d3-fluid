export default vm => {
    // Enable LiveReload
    vm.select('head')
        .append('script')
        .attr('src', `http://${(location.host || 'localhost').split(':')[0]}:35729/livereload.js?snipver=1`);
};
