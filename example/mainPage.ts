import * as b from 'bobril';
import * as f from 'fun-model';
import { appCursor } from './state';
import { increment } from './actions/increment';

export const mainPage = b.createComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        const state = f.getState(appCursor);
        me.children = <b.IBobrilChildren>[
            { tag: 'h1', children: 'Sample' },
            { tag: 'button', children: 'INCREMENT', component: { onClick: increment } },
            { tag: 'p', children: '--------------------------------------' },
            { tag: 'p', children: `Counter: ${state.counter.toString()}` },
            { tag: 'p', children: `Last incrementation: ${state.date.toTimeString()}` },
            { tag: 'p', children: `History: ${state.history.toString()}` },
            { tag: 'button', children: 'POPUP', component: { onClick: state.popup } }
        ];
    }
});
