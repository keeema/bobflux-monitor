define(["require", "exports", 'bobril'], function (require, exports, b) {
    exports.style = {
        copyState: b.styleDef({
            width: '150px',
            height: '28px',
        })
    };
    let focus = (ctx, element) => {
        if (ctx.data.setFocus) {
            element.focus();
            element.select();
        }
    };
    exports.create = b.createComponent({
        render(ctx, me) {
            if (ctx.data.value !== undefined && ctx.data.value !== null)
                ctx.value = ctx.data.value;
            else
                ctx.value = '';
            me.tag = 'input';
            me.attrs = { type: 'text', value: ctx.value };
            b.style(me, ctx.data.style, { cssFloat: ctx.data.float });
        },
        postInitDom(ctx, me, element) {
            focus(ctx, element);
        },
        postUpdateDom(ctx, me, element) {
            focus(ctx, element);
        },
        onChange(ctx, value) {
            ctx.value = value;
            if (ctx.data.onChange)
                ctx.data.onChange(value);
        },
        onKeyDown(ctx, event) {
            if (ctx.data.onKeyDown)
                ctx.data.onKeyDown(event);
            return false;
        }
    });
});
