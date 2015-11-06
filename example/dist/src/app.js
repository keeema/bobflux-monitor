define(["require", "exports", '../node_modules/bobril/index', '../node_modules/bobflux/dist/src/index', '../node_modules/bobflux-monitor/index', './page', './state'], function (require, exports, b, index_1, bobfluxMonitor, page_1, state_1) {
    index_1.bootstrap(state_1.createDefaultState(), bobfluxMonitor.init());
    b.routes(b.route({ handler: page_1.page }, [
        b.route({ handler: page_1.page })
    ]));
});
