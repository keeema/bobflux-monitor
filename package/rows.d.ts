import * as b from 'bobril';
import * as row from './row';
export interface IData {
    rows: row.IData[];
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
