define(["require", "exports", '../../node_modules/bobflux/dist/index', '../state'], function (require, exports, index_1, state_1) {
    exports.increment = index_1.createAction(state_1.appCursor, function (state) {
        return index_1.shallowCopy(state, function (copy) {
            copy.counter = state.counter + 1;
            return copy;
        });
    });
});
