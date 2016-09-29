import * as b from 'bobril';
import * as f from 'fun-model';
import monitorGenericFactory, { IMonitorPanelData } from './components/monitorPanel';

function createStateStamp<TState extends f.IState>(state: TState) {
    return {
        change: 'change',
        time: new Date(),
        state: state,
        frames: b.frame()
    };
}

// TODO: update fun-model to recognize the calling action from stack
export function init<TState extends f.IState>(cursor: f.ICursor<TState> = { key: '' }): (m, p) => void {
    const createMonitor = monitorGenericFactory(cursor);
    let routeUrl = '';
    let isPlaying = false;

    const data: IMonitorPanelData = {
        isOpen: false,
        stateStamps: [],
        playToggled: (newIsPlaying) => isPlaying = newIsPlaying
    };

    const callback = (m, p) => {
        if (isPlaying)
            return;
            
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

export const monitor = init;
export default init;