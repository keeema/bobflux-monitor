define(["require", "exports", '../node_modules/bobril/index', '../node_modules/bobflux/dist/src/index', './state', './actions/increment'], function (require, exports, b, index_1, state_1, increment_1) {
    var createCounter = b.createComponent({
        render: function (ctx, me) {
            var state = index_1.getState(state_1.appCursor);
            me.tag = 'div';
            me.children = state.counter.toString();
        }
    });
    exports.page = b.createComponent({
        render: function (ctx, me, oldMe) {
            me.children = [
                { tag: 'div', children: 'Hello world' },
                createCounter({}),
                { tag: 'button', children: 'INCREMENT', component: { onClick: function () { return increment_1.increment(); } } }
            ];
        }
    });
});
