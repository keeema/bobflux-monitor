import { createAction, shallowCopy } from 'bobflux';
import { appCursor, IAppState } from '../state';


export let increment = createAction(appCursor, (state: IAppState) => {
    return shallowCopy(state, (copy: IAppState) => {
        copy.counter = state.counter + 1;
        return copy;
    })
});
