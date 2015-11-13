import { IState, ICursor } from '../node_modules/bobflux/dist/index';

export interface IAppState {
    counter: number;
}

export let createDefaultState = (): IAppState => {
    return { counter: 0 };
};

export let appCursor: ICursor<IAppState> = {
    key: ''
};
