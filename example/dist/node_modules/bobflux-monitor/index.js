define(["require", "exports", 'node_modules/bobril/index', 'node_modules/fun-model/dist/index', './button', './rows', './textbox'], function (require, exports, b, index_1, button, rows, textbox) {
    var containerStyle = b.styleDef({
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: '#ddd',
        overflow: 'auto',
        overflowX: 'hidden',
        fontFamily: 'Lucida Console',
        zIndex: 1000
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
            var state = index_1.getState(ctx.data.cursor);
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
                    b.styledDiv([
                        textbox.create({
                            value: ctx.stateJSON,
                            setFocus: ctx.setFocusForCopy,
                            style: textbox.style.copyState,
                            float: !!ctx.stateJSON ? 'left' : undefined,
                            onChange: function (value) {
                                ctx.stateJSON = value;
                                b.invalidate(ctx);
                            },
                            onKeyDown: function (event) {
                                if (event.ctrl && event.which === 67) {
                                    ctx.stateJSON = '';
                                    b.invalidate();
                                }
                            }
                        }),
                        !!ctx.stateJSON && button.create({
                            title: 'GO',
                            style: button.style.actionButton,
                            onClick: function () {
                                if (!ctx.stateJSON)
                                    return;
                                index_1.setState(ctx.data.cursor, JSON.parse(ctx.stateJSON));
                                b.invalidate();
                            },
                        })
                    ]),
                    b.styledDiv(rows.create({
                        rows: ctx.data.stateStamps.map(function (stateStamp, index) {
                            return {
                                header: index.toString(),
                                info: stateStamp.time.toLocaleTimeString(),
                                frames: stateStamp.frames,
                                isActive: state === stateStamp.state,
                                onGo: function () {
                                    index_1.setState(ctx.data.cursor, stateStamp.state);
                                    b.invalidate();
                                },
                                onCopy: function () {
                                    ctx.stateJSON = JSON.stringify(stateStamp.state);
                                    ctx.setFocusForCopy = true;
                                    b.invalidate(ctx);
                                }
                            };
                        }).reverse()
                    }))
                ]
            ];
            ctx.setFocusForCopy = false;
        }
    });
    exports.init = function (cursor) {
        if (cursor === void 0) { cursor = { key: '' }; }
        var data = createDefaultData(cursor);
        var routeUrl = '';
        var callback = function (m, p) {
            if (m && p && m.indexOf('Current state') >= 0) {
                if (!routeUrl || routeUrl === window.location.href) {
                    if (!data.stateStamps.some(function (stateStamp) { return stateStamp.state === p; }))
                        data.stateStamps.push({
                            change: 'change',
                            time: new Date(),
                            state: p,
                            frames: b.frame()
                        });
                }
                else {
                    data.stateStamps = [];
                }
                routeUrl = window.location.href;
            }
        };
        b.addRoot(function () { return createMonitor(data); });
        return callback;
    };
});
