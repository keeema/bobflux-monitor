import * as f from 'bobflux';

export interface IAppState {
    counter: number;
    date: Date;
    popup: () => void;
}
// TODO pridate jeste pole vsech inkrementaci pro otestovani pole
export const createDefaultState = (): IAppState => {
    return {
        counter: 0,
        date: new Date(Date.now()),
        popup: () => alert('Current value is 0.')
    };
};

export const appCursor: f.ICursor<IAppState> = {
    key: ''
};

export default appCursor;