define(["require", "exports", 'node_modules/bobril/index', './row'], function (require, exports, b, row) {
    var rowsStyle = b.styleDef({
        backgroundColor: '#ccc',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        listStyleType: 'none',
        padding: '0px',
        margin: '0px'
    });
    var rowsWrapperStyle = b.styleDef({});
    exports.create = b.createComponent({
        render: function (ctx, me) {
            me.tag = 'div';
            b.style(me, rowsWrapperStyle);
            me.children = b.style({
                tag: 'ul',
                children: !!ctx.data.rows && ctx.data.rows.map(row.create)
            }, rowsStyle);
        },
    });
});
