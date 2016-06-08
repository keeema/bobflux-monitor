import * as b from 'bobril';
import row, { IRowData } from './row';

const rowsStyle = b.styleDef({
    backgroundColor: '#ccc',
    listStyleType: 'none',
    padding: 0,
    margin: 0
});

const rowsWrapperStyle = b.styleDef({});

export interface IRowsData {
    rows: IRowData[];
}

interface ICtx extends b.IBobrilCtx {
    data: IRowsData;
}

export const rows = b.createComponent<IRowsData>({
    id: 'bobflux-monitor-rows',
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        b.style(me, rowsWrapperStyle);
        me.children = b.style(
            {
                tag: 'ul',
                children: !!ctx.data.rows && ctx.data.rows.map((rd, idx) => b.withKey(row(rd), `state-${idx}`))
            },
            rowsStyle);
    }
});

export default rows;
