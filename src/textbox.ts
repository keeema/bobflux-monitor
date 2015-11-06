import * as b from 'node_modules/bobril/index';

export interface IData {
	value?: string;
	onChange: (value: string) => void;
	style?: b.IBobrilStyle
}

interface ICtx extends b.IBobrilCtx {
	data: IData;
	value: string;
}

export let create = b.createComponent<IData>({
	render(ctx: ICtx, me: b.IBobrilNode) {
		if (ctx.data.value !== undefined && ctx.data.value !== null)
			ctx.value = ctx.data.value;
		else
			ctx.value = '';

		me.tag = 'input';
		me.attrs = { type: 'text', value: ctx.value };

		if (ctx.data.style)
			b.style(me, ctx.data.style);
	},
	onChange(ctx: ICtx, value: string) {
		ctx.value = value;
		if (ctx.data.onChange)
			ctx.data.onChange(value);
	}
});