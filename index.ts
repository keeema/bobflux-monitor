import * as b from 'bobril';
import * as f from 'fun-model';
import monitorGenericFactory, { IMonitorPanelData } from './components/monitorPanel';

function createDefaultData(): IMonitorPanelData {
    return {
        isOpen: false,
        stateStamps: []
    };
}

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
                data.stateStamps = [p];
            }

            routeUrl = window.location.href;
        }
    };

    b.addRoot(() => createMonitor(data));
    return callback;
}

export default init;