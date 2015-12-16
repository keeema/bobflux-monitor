import * as b from 'bobril';
import * as row from './row';

let rowsStyle = b.styleDef({
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    listStyleType: 'none',
    padding: '0px',
    margin: '0px'
});

let rowsWrapperStyle = b.styleDef({
})

export interface IData {
    rows: row.IData[];
}

interface ICtx extends b.IBobrilCtx {
    data: IData
}

export let create = b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        b.style(me, rowsWrapperStyle);
        me.children = b.style({
            tag: 'ul',
            children: !!ctx.data.rows && ctx.data.rows.map(row.create)
        }, rowsStyle);
    },
})
