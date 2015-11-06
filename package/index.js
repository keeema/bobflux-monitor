define(["require", "exports", 'node_modules/bobril/index', 'node_modules/fun-model/dist/src/index', './button', './rows', './textbox'], function (require, exports, b, index_1, button, rows, textbox) {
    var containerStyle = b.styleDef({
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: '#ddd',
        overflow: 'auto',
        overflowX: 'hidden'
    });
    var openedStyle = b.styleDef({
        bottom: '0px'
    });
    var createDefaultData = function (cursor) {
        return {
            isOpen: false,
            stateStamps: [],
            cursor: cursor
        };
    };
    var createMonitor = b.createComponent({
        render: function (ctx, me) {
            me.tag = 'div';
            b.style(me, containerStyle);
            if (ctx.data.isOpen)
                b.style(me, openedStyle);
            me.children = [
                button.create({
                    title: ctx.data.isOpen ? 'HIDE >' : '<',
                    style: ctx.data.isOpen ? button.style.mainButtonOpen : button.style.mainButtonClose,
                    onClick: function () {
                        ctx.data.isOpen = !ctx.data.isOpen;
                        b.invalidate(ctx);
                    }
                }),
                !!ctx.data.isOpen && [
                    textbox.create({
                        value: ctx.stateJSON,
                        onChange: function (value) {
                            ctx.stateJSON = value;
                            b.invalidate(ctx);
                        }
                    }),
                    button.create({
                        title: 'GO',
                        style: button.style.actionButton,
                        onClick: function () {
                            if (!ctx.stateJSON)
                                return;
                            index_1.setState(ctx.data.cursor, JSON.parse(ctx.stateJSON));
                            b.invalidate();
                        },
                    }),
                    rows.create({
                        rows: ctx.data.stateStamps.map(function (stateStamp, index) {
                            return {
                                header: index.toString() + ' - ' + stateStamp.change,
                                info: stateStamp.time.toLocaleTimeString(),
                                onGo: function () {
                                    index_1.setState(ctx.data.cursor, stateStamp.state);
                                    b.invalidate();
                                },
                                onCopy: function () {
                                    ctx.stateJSON = JSON.stringify(stateStamp.state);
                                    b.invalidate(ctx);
                                }
                            };
                        }).reverse()
                    })
                ]
            ];
        }
    });
    exports.init = function (cursor) {
        if (cursor === void 0) { cursor = { key: '' }; }
        var data = createDefaultData(cursor);
        var callback = function (m, p) {
            if (p && typeof p === 'object') {
                data.stateStamps.push({ change: 'application', time: new Date(), state: p });
            }
        };
        b.addRoot(function () { return createMonitor(data); });
        return callback;
    };
});