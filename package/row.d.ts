import * as b from 'node_modules/bobril/index';
export interface IData {
    header: string;
    info: string;
    onGo: () => void;
    onCopy: () => void;
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
