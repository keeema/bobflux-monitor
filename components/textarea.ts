import * as b from 'bobril';

export const textareaStyles = {
    copyState: b.styleDef({
        width: 150,
        height: 72
    }),
    intervalStyle: b.styleDef({
        width: 150,
        height: 24
    })
};

export interface ITextareaData {
    value?: string;
    onKeyDown?: (event: b.IKeyDownUpEvent) => void;
    onChange?: (value: string) => void;
    style?: b.IBobrilStyle;
    setFocus?: boolean;
    float?: string;
    placeholder?: string;
}

interface ICtx extends b.IBobrilCtx {
    data: ITextareaData;
    value: string;
}

function focus(ctx: ICtx, element: HTMLInputElement) {
    if (ctx.data.setFocus) {
        element.focus();
        (<HTMLInputElement>element).select();
    }
};

export const textarea = b.createComponent<ITextareaData>({
    id: 'bobflux-monitor-textarea',
    render(ctx: ICtx, me: b.IBobrilNode) {
        if (ctx.data.value !== undefined && ctx.data.value !== null) {
            ctx.value = ctx.data.value;
        } else {
            ctx.value = '';
        }

        me.tag = 'textarea';
        me.attrs = { 
            rows: 1, 
            value: ctx.value, 
            placeholder: ctx.data.placeholder, 
            wrap: 'soft', 
            resize: 'none',
            spellcheck: false 
        };

        b.style(me, !!ctx.data.style, { cssFloat: ctx.data.float });
    },
    postInitDom(ctx: ICtx, _me: b.IBobrilCacheNode, element: HTMLElement) {
        focus(ctx, <HTMLInputElement>element);
    },
    postUpdateDom(ctx: ICtx, _me: b.IBobrilCacheNode, element: HTMLElement) {
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

export default textarea;