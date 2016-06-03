import * as b from 'bobril';
import button from './button';

const rowStyle = b.styleDef({
    width: '194px',
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
});

const active = b.styleDef({
    backgroundColor: '#999',
    borderColor: '#6699FF',
    borderStyle: 'solid',
    borderWidth: '3px'
});

const inActive = b.styleDef({
    borderColor: '#ccc',
    borderWidth: '2px',
    borderBottomColor: '#000',
    padding: '3px 3px 3px 3px'
});

const actionButtonsContainer = b.styleDef({});

export interface IRowData {
    header: string;
    info: string;
    frames: number;
    isActive: boolean;
    onGo: () => void;
    onCopy: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IRowData;
}

export const row = b.createVirtualComponent<IRowData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'li';

        b.style(me, rowStyle);
        b.style(me, ctx.data.isActive ? active : inActive);

        me.children = [
            { tag: 'div', children: 'Order: ' + ctx.data.header },
            { tag: 'div', children: 'Time: ' + ctx.data.info },
            { tag: 'div', children: 'Frames: ' + ctx.data.frames },
            b.styledDiv(
                [
                    button({ title: 'GO', onClick: ctx.data.onGo, float: 'left', width: '50%' }),
                    button({ title: 'COPY', onClick: ctx.data.onCopy })
                ],
                actionButtonsContainer)
        ];
    }
});

export default row;