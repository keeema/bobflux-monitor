import * as b from 'node_modules/bobril/index';
export interface IData {
    value?: string;
    onChange: (value: string) => void;
    style?: b.IBobrilStyle;
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
