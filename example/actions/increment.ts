import * as f from 'bobflux';
import appCursor from '../state';

export const increment = f.createAction(appCursor, state => f.shallowCopy(state, copy => {
    copy.counter++;
    copy.date = new Date(Date.now());
    copy.popup = () => alert(`Current value is ${copy.counter}.`);
    copy.history = [...state.history, copy.counter];
}));

export default increment;