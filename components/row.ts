import * as b from 'bobril';
import button, { buttonStyles } from './button';

const rowStyle = b.styleDef({
    width: '200px',
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    padding: '0px',
    margin: '0px'

});

const active = b.styleDef({
    backgroundColor: '#999',
    borderColor: '#6699FF',
    borderStyle: 'solid',
    borderWidth: '3px'
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
        if (ctx.data.isActive) {
            b.style(me, active);
        }

        me.children = [
            { tag: 'div', children: 'Order: ' + ctx.data.header },
            { tag: 'div', children: 'Time: ' + ctx.data.info },
            { tag: 'div', children: 'Frames: ' + ctx.data.frames },
            b.styledDiv(
                [
                    button({ title: 'GO', style: buttonStyles.actionButton, onClick: ctx.data.onGo, float: 'left', width: '50%' }),
                    button({ title: 'COPY', style: buttonStyles.actionButton, onClick: ctx.data.onCopy })
                ],
                actionButtonsContainer)
        ];
    }
});

export default row;