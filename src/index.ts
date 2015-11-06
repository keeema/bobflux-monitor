import * as b from 'node_modules/bobril/index';
import { setState, IState, ICursor } from 'node_modules/fun-model/dist/src/index';
import * as button from './button';
import * as rows from './rows';
import * as textbox from './textbox';

let containerStyle = b.styleDef({
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#ddd',
    overflow: 'auto',
    overflowX: 'hidden'
})

let openedStyle = b.styleDef({
    bottom: '0px'
})

interface IStateStamp {
    change: string;
    state: IState;
    time: Date;
}

interface IData {
    isOpen: boolean;
    stateStamps: IStateStamp[];
    cursor: ICursor<any>
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
    stateJSON?: string;
}

let createDefaultData = (cursor: ICursor<any>): IData=> {
    return {
        isOpen: false,
        stateStamps: [],
        cursor
    }
};

let createMonitor = b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        b.style(me, containerStyle);

        if (ctx.data.isOpen)
            b.style(me, openedStyle);

        me.children = [
            button.create({
                title: ctx.data.isOpen ? 'HIDE >' : '<',
                style: ctx.data.isOpen ? button.style.mainButtonOpen : button.style.mainButtonClose,
                onClick: () => {
                    ctx.data.isOpen = !ctx.data.isOpen;
                    b.invalidate(ctx);
                }
            }),
            !!ctx.data.isOpen && [
                textbox.create({
                    value: ctx.stateJSON,
                    onChange: (value: string) => {
                        ctx.stateJSON = value;
                        b.invalidate(ctx);
                    }
                }),
                button.create({
                    title: 'GO',
                    style: button.style.actionButton,
                    onClick: () => {
                        if (!ctx.stateJSON)
                            return;
                        setState(ctx.data.cursor, JSON.parse(ctx.stateJSON));
                        b.invalidate();
                    },
                }),
                rows.create({
                    rows: ctx.data.stateStamps.map((stateStamp, index) => {
                        return {
                            header: index.toString(),
                            info: stateStamp.time.toLocaleTimeString(),
                            onGo: () => {
                                setState(ctx.data.cursor, stateStamp.state);
                                b.invalidate();
                            },
                            onCopy: () => {
                                ctx.stateJSON = JSON.stringify(stateStamp.state);
                                b.invalidate(ctx);
                            }
                        };
                    }).reverse()
                })
            ]
        ];
    }
});

export let init = (cursor: ICursor<any> = { key: '' }): (m, p) => void => {
    let data = createDefaultData(cursor);
    let callback = (m, p) => {
        if (p && typeof p === 'object') {
            data.stateStamps.push({ change: 'change', time: new Date(), state: p });
        }
    };

    b.addRoot(() => createMonitor(data));
    return callback;
}
