define(["require", "exports", 'node_modules/bobril/index'], function (require, exports, b) {
    exports.create = b.createComponent({
        render: function (ctx, me) {
            if (ctx.data.value !== undefined && ctx.data.value !== null)
                ctx.value = ctx.data.value;
            else
                ctx.value = '';
            me.tag = 'input';
            me.attrs = { type: 'text', value: ctx.value };
            if (ctx.data.style)
                b.style(me, ctx.data.style);
        },
        onChange: function (ctx, value) {
            ctx.value = value;
            if (ctx.data.onChange)
                ctx.data.onChange(value);
        }
    });
});
