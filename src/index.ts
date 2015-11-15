import * as b from 'node_modules/bobril/index';
import { getState, setState, IState, ICursor } from 'node_modules/fun-model/dist/index';
import * as button from './button';
import * as rows from './rows';
import * as textbox from './textbox';

let containerStyle = b.styleDef({
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#ddd',
    overflow: 'auto',
    overflowX: 'hidden',
    fontFamily: 'Lucida Console',
    zIndex: 1000
})

let openedStyle = b.styleDef({
    bottom: '0px'
})

interface IStateStamp {
    change: string;
    state: IState;
    time: Date;
    frames: number;
}

interface IData {
    isOpen: boolean;
    stateStamps: IStateStamp[];
    cursor: ICursor<any>
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
    stateJSON?: string;
    setFocusForCopy: boolean;
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

        let state = getState(ctx.data.cursor);

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
                b.styledDiv([
                    textbox.create({
                        value: ctx.stateJSON,
                        setFocus: ctx.setFocusForCopy,
                        style: textbox.style.copyState,
                        float: !!ctx.stateJSON ? 'left' : undefined,
                        onChange: (value: string) => {
                            ctx.stateJSON = value;
                            b.invalidate(ctx);
                        },
                        onKeyDown: (event: b.IKeyDownUpEvent) => {
                            if (event.ctrl && event.which === 67) {
                                ctx.stateJSON = '';
                                b.invalidate();
                            }
                        }
                    }),
                    !!ctx.stateJSON && button.create({
                        title: 'GO',
                        style: button.style.actionButton,
                        onClick: () => {
                            if (!ctx.stateJSON)
                                return;
                            setState(ctx.data.cursor, JSON.parse(ctx.stateJSON));
                            b.invalidate();
                        },
                    })
                ]),
                b.styledDiv(rows.create({
                    rows: ctx.data.stateStamps.map((stateStamp, index) => {
                        return {
                            header: index.toString(),
                            info: stateStamp.time.toLocaleTimeString(),
                            frames: stateStamp.frames,
                            isActive: state === stateStamp.state,
                            onGo: () => {
                                setState(ctx.data.cursor, stateStamp.state);
                                b.invalidate();
                            },
                            onCopy: () => {
                                ctx.stateJSON = JSON.stringify(stateStamp.state);
                                ctx.setFocusForCopy = true;

                                b.invalidate(ctx);
                            }
                        };
                    }).reverse()
                }))
            ]
        ];
        ctx.setFocusForCopy = false;

    }
});

export let init = (cursor: ICursor<any> = { key: '' }): (m, p) => void => {
    let data = createDefaultData(cursor);
    let routeUrl = '';
    let callback = (m, p) => {
        if (m && p && m.indexOf('Current state') >= 0) {
            if (!routeUrl || routeUrl === window.location.href) {
                if (!data.stateStamps.some(stateStamp => stateStamp.state === p))
                    data.stateStamps.push({
                        change: 'change',
                        time: new Date(),
                        state: p,
                        frames: b.frame()
                    });
            } else {
                data.stateStamps = [];
            }

            routeUrl = window.location.href;
        }
    };

    b.addRoot(() => createMonitor(data));
    return callback;
}
