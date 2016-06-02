import * as f from 'bobflux';
import appCursor from '../state';

export const increment = f.createAction(appCursor, state => f.shallowCopy(state, copy => { copy.counter = state.counter + 1; }));

export default increment;
