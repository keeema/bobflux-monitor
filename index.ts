import * as b from 'bobril';
import * as f from 'fun-model';
import monitorGenericFactory, { IMonitorPanelData } from './components/monitorPanel';

function createDefaultData(): IMonitorPanelData {
    return {
        isOpen: false,
        stateStamps: []
    };
}

function createStateStamp<TState extends f.IState>(state: TState) {
    return {
        change: 'change',
        time: new Date(),
        state: state,
        frames: b.frame()
    };
}

// TODO: update fun-model to recognize calling action from stack

export function init<TState extends f.IState>(cursor: f.ICursor<TState> = { key: '' }): (m, p) => void {
    const createMonitor = monitorGenericFactory(cursor);
    const data = createDefaultData();
    let routeUrl = '';
    const callback = (m, p) => {
        if (m && m.indexOf('has been initialized') >= 0) {
            data.stateStamps = [createStateStamp(f.getState(cursor))];
        } else if (m && p && m.indexOf('Current state') >= 0) {
            if (!routeUrl || routeUrl === window.location.href) {
                if (!data.stateStamps.some(stateStamp => stateStamp.state === p))
                    data.stateStamps.push(createStateStamp(p));
            } else {
                data.stateStamps = [createStateStamp(p)];
            }

            routeUrl = window.location.href;
        }
    };

    b.addRoot(() => createMonitor(data));
    return callback;
}

export default init;