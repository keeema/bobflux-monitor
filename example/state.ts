import * as f from 'bobflux';

export interface IAppState {
    counter: number;
}

export const createDefaultState = (): IAppState => {
    return { counter: 0 };
};

export const appCursor: f.ICursor<IAppState> = {
    key: ''
};

export default appCursor;