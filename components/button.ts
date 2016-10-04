import * as b from 'bobril';

export const enum ButtonType {
    Open,
    Close,
    Action,
    Go
}

const buttonStyles = {
    [ButtonType.Open]: b.styleDef({
        textAlign: 'center',
        height: 24,
        width: 214,
        backgroundColor: '#ccc'
    }),
    [ButtonType.Close]: b.styleDef({
        textAlign: 'center',
        height: 24,
        width: 30,
        backgroundColor: '#ccc'
    }),
    [ButtonType.Action]: b.styleDef({
        textAlign: 'center',
        backgroundColor: '#181818',
        color: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        cursor: 'pointer',
        padding: 2,
        height: 24
    }),
    [ButtonType.Go]: b.styleDef({
        textAlign: 'center',
        backgroundColor: '#181818',
        color: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        cursor: 'pointer',
        padding: 2,
        height: 72
    })
};

const hoverActionStyle = b.styleDef({ hover: { backgroundColor: '#585858' } });

const disabledStyle = b.styleDef({
    color: '#ddd',
    backgroundColor: '#999',
    cursor: 'not-allowed'
});

export interface IData {
    title: string;
    type?: ButtonType;
    onClick: () => void;
    float?: string;
    width?: string;
    isDisabled?: boolean;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export const button = b.createComponent<IData>({
    id: 'bobflux-monitor-button',
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.style = { cssFloat: ctx.data.float, width: ctx.data.width };
        const type = ctx.data.type === undefined ? ButtonType.Action : ctx.data.type;

        b.style(me, buttonStyles[type]);
        me.children = ctx.data.title;
        me.attrs = {};
        if (ctx.data.isDisabled) {
            b.style(me, disabledStyle);
        } else if (type === ButtonType.Action) {
            b.style(me, hoverActionStyle);
        }
    },
    onClick(ctx: ICtx) {
        if (ctx.data.onClick && !ctx.data.isDisabled)
            ctx.data.onClick();
            
        return true;
    }
});

export default button;
