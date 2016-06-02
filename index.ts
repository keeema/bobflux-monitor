import * as b from 'bobril';
import * as f from 'bobflux';
import button, { buttonStyles } from './components/button';
import textbox, { textboxStyles } from './components/textbox';
import rows from './components/rows';

const containerStyle = b.styleDef({
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#ddd',
    overflow: 'auto',
    overflowX: 'hidden',
    fontFamily: 'Lucida Console',
    zIndex: 1000
});

const openedStyle = b.styleDef({
    bottom: '0px'
});

interface IStateStamp {
    change: string;
    state: f.IState;
    time: Date;
    frames: number;
}

interface IData {
    isOpen: boolean;
    stateStamps: IStateStamp[];
}

interface ICtx extends f.IDataComponentContext<f.IState, IData> {
    stateJSON?: string;
    setFocusForCopy: boolean;
}

function createDefaultData(): IData {
    return {
        isOpen: false,
        stateStamps: []
    };
}

const monitorGenericFactory = f.createDataComponent<f.IState, IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        b.style(me, containerStyle);

        if (ctx.data.isOpen)
            b.style(me, openedStyle);

        me.children = [
            button({
                title: ctx.data.isOpen ? 'HIDE >' : '<',
                style: ctx.data.isOpen ? buttonStyles.mainButtonOpen : buttonStyles.mainButtonClose,
                onClick: () => {
                    ctx.data.isOpen = !ctx.data.isOpen;
                    b.invalidate(ctx);
                }
            }),
            !!ctx.data.isOpen && [
                b.styledDiv([
                    textbox({
                        value: ctx.stateJSON,
                        setFocus: ctx.setFocusForCopy,
                        style: textboxStyles.copyState,
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
                    !!ctx.stateJSON && button({
                        title: 'GO',
                        style: buttonStyles.actionButton,
                        onClick: () => {
                            if (!ctx.stateJSON)
                                return;
                            f.setState(ctx.cursor, JSON.parse(ctx.stateJSON));
                            b.invalidate();
                        }
                    })
                ]),
                b.styledDiv(rows({
                    rows: ctx.data.stateStamps.map((stateStamp, index) => {
                        return {
                            header: index.toString(),
                            info: stateStamp.time.toLocaleTimeString(),
                            frames: stateStamp.frames,
                            isActive: ctx.state === stateStamp.state,
                            onGo: () => {
                                f.setState(ctx.cursor, stateStamp.state);
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

export function init<TState extends f.IState>(cursor: f.ICursor<TState> = { key: '' }): (m, p) => void {
    const createMonitor = monitorGenericFactory(cursor);
    const data = createDefaultData();
    let routeUrl = '';
    const callback = (m, p) => {
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
