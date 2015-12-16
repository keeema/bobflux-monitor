import * as b from 'bobril';
import { getState } from 'bobflux';
import { appCursor }  from './state';
import { increment }  from './actions/increment';

let createCounter = b.createComponent({
    render(ctx, me: b.IBobrilNode) {
        let state = getState(appCursor);
        me.tag = 'div';
        me.children = state.counter.toString();
    }
});

export let page = b.createComponent({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode): void {
        me.children = [
            { tag: 'div', children: 'Hello world' },
            createCounter({}),
            { tag: 'button', children: 'INCREMENT', component: { onClick: () => increment() } }
        ];
    }
});
