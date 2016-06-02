import * as b from 'bobril';
import row, { IRowData } from './row';

const rowsStyle = b.styleDef({
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    listStyleType: 'none',
    padding: '0px',
    margin: '0px'
});

const rowsWrapperStyle = b.styleDef({});

export interface IRowsData {
    rows: IRowData[];
}

interface ICtx extends b.IBobrilCtx {
    data: IRowsData;
}

export const rows = b.createComponent<IRowsData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        b.style(me, rowsWrapperStyle);
        me.children = b.style(
            {
                tag: 'ul',
                children: !!ctx.data.rows && ctx.data.rows.map(rd => row(rd))
            },
            rowsStyle);
    }
});

export default rows;
