define(["require", "exports", 'bobril', './row'], function (require, exports, b, row) {
    let rowsStyle = b.styleDef({
        backgroundColor: '#ccc',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        listStyleType: 'none',
        padding: '0px',
        margin: '0px'
    });
    let rowsWrapperStyle = b.styleDef({});
    exports.create = b.createComponent({
        render(ctx, me) {
            me.tag = 'div';
            b.style(me, rowsWrapperStyle);
            me.children = b.style({
                tag: 'ul',
                children: !!ctx.data.rows && ctx.data.rows.map(rd => row.create(rd))
            }, rowsStyle);
        }
    });
});
