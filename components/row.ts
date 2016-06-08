import * as b from 'bobril';
import button from './button';

const rowStyle = b.styleDef({
    width: 194,
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: 2
});

const active = b.styleDef({
    backgroundColor: '#999',
    borderColor: '#6699FF',
    borderStyle: 'solid',
    borderWidth: 3
});

const inActive = b.styleDef({
    borderColor: '#ccc',
    borderWidth: 2,
    borderBottomColor: '#000',
    padding: 3
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
    id: 'bobflux-monitor-row',
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'li';

        me.children =
            b.styledDiv(
                b.styledDiv(
                    [
                        { tag: 'div', children: 'Order: ' + ctx.data.header },
                        { tag: 'div', children: 'Time: ' + ctx.data.info },
                        { tag: 'div', children: 'Frames: ' + ctx.data.frames },
                        b.styledDiv(
                            [
                                button({ title: 'GO', onClick: ctx.data.onGo, float: 'left', width: '50%' }),
                                button({ title: 'COPY', onClick: ctx.data.onCopy })
                            ],
                            actionButtonsContainer)
                    ],
                    ctx.data.isActive ? active : inActive),
                rowStyle);
    }
});

export default row;