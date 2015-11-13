import { createAction, shallowCopy } from '../../node_modules/bobflux/dist/index';
import { appCursor, IAppState } from '../state';


export let increment = createAction(appCursor, (state: IAppState) => {
    return shallowCopy(state, (copy: IAppState) => {
        copy.counter = state.counter + 1;
        return copy;
    })
});
