import * as b from 'node_modules/bobril/index';
import * as button from './button';

let rowStyle = b.styleDef({
    width: '200px',
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    padding: '0px',
    margin: '0px'

});

export interface IData {
    header: string;
    info: string;
    onGo: () => void;
    onCopy: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData
}

export let create = b.createVirtualComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'li'
        b.style(me, rowStyle);
        me.children = [
            { tag: 'div', children: ctx.data.header },
            { tag: 'div', children: ctx.data.info },
            button.create({ title: 'GO', style: button.style.actionButton, onClick: ctx.data.onGo }),
            button.create({ title: 'COPY', style: button.style.actionButton, onClick: ctx.data.onCopy })
        ];
    }
})
