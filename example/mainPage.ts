import * as b from 'bobril';
import * as f from 'bobflux';
import appCursor  from './state';
import increment  from './actions/increment';

const createCounter = f.createDataComponent({
    render(ctx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = ctx.state.counter.toString();
    }
})(appCursor);

export const mainPage = b.createComponent({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = [
            { tag: 'div', children: 'Hello world' },
            createCounter({}),
            { tag: 'button', children: 'INCREMENT', component: { onClick: () => increment() } }
        ];
    }
});

export default mainPage;
