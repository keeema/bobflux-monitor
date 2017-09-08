import * as f from 'fun-model';
import { appCursor } from '../state';

export const increment: f.IParamLessAction = f.createParamLessAction(appCursor, state => f.shallowCopy(state, copy => {
    copy.counter++;
    copy.date = new Date(Date.now());
    copy.popup = () => alert('Popup opened by some data-closed function.');
    copy.history = [...state.history, copy.counter];
}));