import * as b from 'bobril';
import * as f from 'bobflux';
import appCursor, { IAppState }  from './state';
import increment  from './actions/increment';

export const mainPage = f.createDataComponent({
    render(ctx: f.IContext<IAppState>, me: b.IBobrilNode): void {
        me.children = [
            { tag: 'p', children: 'Hello world' },
            { tag: 'p', children: `Counter: ${ctx.state.counter.toString()}` },
            { tag: 'button', children: 'INCREMENT', component: { onClick: increment } },
            { tag: 'p', children: `Last incrementation: ${ctx.state.date.toTimeString()}` },
            { tag: 'button', children: 'POPUP', component: { onClick: ctx.state.popup } },
        ];
    }
})(appCursor);

export default mainPage;
