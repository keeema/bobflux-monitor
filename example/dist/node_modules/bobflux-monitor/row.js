define(["require", "exports", 'node_modules/bobril/index', './button'], function (require, exports, b, button) {
    var rowStyle = b.styleDef({
        width: '200px',
        backgroundColor: '#ccc',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        padding: '0px',
        margin: '0px'
    });
    exports.create = b.createVirtualComponent({
        render: function (ctx, me) {
            me.tag = 'li';
            b.style(me, rowStyle);
            me.children = [
                { tag: 'div', children: ctx.data.header },
                { tag: 'div', children: ctx.data.info },
                { tag: 'div', children: 'Frames: ' + ctx.data.frames },
                button.create({ title: 'GO', style: button.style.actionButton, onClick: ctx.data.onGo }),
                button.create({ title: 'COPY', style: button.style.actionButton, onClick: ctx.data.onCopy })
            ];
        }
    });
});
