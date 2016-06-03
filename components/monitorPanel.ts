import * as b from 'bobril';
import * as f from 'fun-model';
import * as stringHelpers from '../helpers/string';
import button, { ButtonType } from './button';
import textbox, { textboxStyles } from './textbox';
import rows from './rows';

const containerStyle = b.styleDef({
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: '#ddd',
    overflow: 'visible',
    fontFamily: 'Open sans, Sans-serif',
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

export interface IMonitorPanelData {
    isOpen: boolean;
    stateStamps: IStateStamp[];
}

interface ICtx extends b.IBobrilCtx {
    data: IMonitorPanelData;
    stateText?: string;
    setFocusForCopy: boolean;
}

const copyContainer = b.styleDef({
    padding: '3px'
});

export function monitorGenericFactory<TState extends f.IState>(cursor: f.ICursor<TState>) {
    return b.createComponent({
        render(ctx: ICtx, me: b.IBobrilNode) {
            me.tag = 'div';
            b.style(me, containerStyle);

            if (ctx.data.isOpen)
                b.style(me, openedStyle);

            const state = f.getState(cursor);

            me.children = [
                button({
                    title: ctx.data.isOpen ? 'HIDE >' : '<',
                    type: ctx.data.isOpen ? ButtonType.Open : ButtonType.Close,
                    onClick: () => {
                        ctx.data.isOpen = !ctx.data.isOpen;
                        b.invalidate(ctx);
                    }
                }),
                !!ctx.data.isOpen && [
                    b.styledDiv(
                        [
                            textbox({
                                value: ctx.stateText,
                                setFocus: ctx.setFocusForCopy,
                                style: textboxStyles.copyState,
                                float: 'left',
                                placeholder: 'Paste the state... [ctrl+v]',
                                onChange: (value: string) => {
                                    ctx.stateText = value;
                                    b.invalidate(ctx);
                                },
                                onKeyDown: (event: b.IKeyDownUpEvent) => {
                                    if (event.ctrl && event.which === 67) {
                                        ctx.stateText = '';
                                        b.invalidate();
                                    }
                                }
                            }),
                            b.withKey(

                                button({
                                    title: 'GO',
                                    isDisabled: !ctx.stateText,
                                    onClick: () => {
                                        if (!ctx.stateText)
                                            return;

                                        f.setState(cursor, new Function(`return ${ctx.stateText};`)());
                                        b.invalidate();
                                    }
                                }),
                                'go-copy')
                        ],
                        copyContainer),
                    b.styledDiv(rows({
                        rows: ctx.data.stateStamps.map((stateStamp, index) => {
                            return {
                                header: index.toString(),
                                info: stateStamp.time.toLocaleTimeString(),
                                frames: stateStamp.frames,
                                isActive: state === stateStamp.state,
                                onGo: () => {
                                    f.setState(cursor, stateStamp.state);
                                    b.invalidate();
                                },
                                onCopy: () => {
                                    ctx.stateText = stringHelpers.allToString(stateStamp.state);
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
};

export default monitorGenericFactory;