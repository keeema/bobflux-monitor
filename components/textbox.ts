import * as b from 'bobril';

export const textboxStyles = {
    copyState: b.styleDef({
        width: '150px',
        height: '28px'
    })
};

export interface ITextboxData {
    value?: string;
    onKeyDown?: (event: b.IKeyDownUpEvent) => void;
    onChange?: (value: string) => void;
    style?: b.IBobrilStyle;
    setFocus?: boolean;
    float?: string;
}

interface ICtx extends b.IBobrilCtx {
    data: ITextboxData;
    value: string;
}

function focus(ctx: ICtx, element: HTMLInputElement) {
    if (ctx.data.setFocus) {
        element.focus();
        (<HTMLInputElement>element).select();
    }
};

export const textbox = b.createComponent<ITextboxData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        if (ctx.data.value !== undefined && ctx.data.value !== null) {
            ctx.value = ctx.data.value;
        } else {
            ctx.value = '';
        }

        me.tag = 'input';
        me.attrs = { type: 'text', value: ctx.value };

        b.style(me, ctx.data.style, { cssFloat: ctx.data.float });
    },
    postInitDom(ctx: ICtx, me: b.IBobrilCacheNode, element: HTMLElement) {
        focus(ctx, <HTMLInputElement>element);
    },
    postUpdateDom(ctx: ICtx, me: b.IBobrilCacheNode, element: HTMLElement) {
        focus(ctx, <HTMLInputElement>element);
    },
    onChange(ctx: ICtx, value: string) {
        ctx.value = value;
        if (ctx.data.onChange)
            ctx.data.onChange(value);
    },
    onKeyDown(ctx: ICtx, event: b.IKeyDownUpEvent): boolean {
        if (ctx.data.onKeyDown)
            ctx.data.onKeyDown(event);
        return false;
    }
});

export default textbox;