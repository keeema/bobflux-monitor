import { IState, ICursor } from 'bobflux';

export interface IAppState {
    counter: number;
}

export let createDefaultState = (): IAppState => {
    return { counter: 0 };
};

export let appCursor: ICursor<IAppState> = {
    key: ''
};
