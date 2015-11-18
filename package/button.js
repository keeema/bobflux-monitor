define(["require", "exports", 'node_modules/bobril/index'], function (require, exports, b) {
    exports.style = {
        mainButtonOpen: b.styleDef({
            textAlign: 'center',
            height: '20px',
            width: '200px',
            backgroundColor: '#ccc'
        }),
        mainButtonClose: b.styleDef({
            textAlign: 'center',
            height: '20px',
            width: '30px',
            backgroundColor: '#ccc'
        }),
        actionButton: b.styleDef({
            textAlign: 'center',
            backgroundColor: '#181818',
            color: '#fff',
            borderStyle: 'solid',
            borderWidth: '1px',
            cursor: 'pointer',
            padding: '5px',
            height: '16px',
        }, { hover: { backgroundColor: '#585858' } })
    };
    exports.create = b.createVirtualComponent({
        render: function (ctx, me) {
            me.children = b.styledDiv(ctx.data.title, ctx.data.style, { cssFloat: ctx.data.float, width: ctx.data.width });
        },
        onClick: function (ctx) {
            if (ctx.data.onClick)
                ctx.data.onClick();
            return true;
        }
    });
});
