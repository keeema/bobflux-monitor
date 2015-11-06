import * as b from 'node_modules/bobril/index';
export declare let style: {
    mainButtonOpen: string;
    mainButtonClose: string;
    actionButton: string;
};
export interface IData {
    title: string;
    style?: b.IBobrilStyle;
    onClick: () => void;
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
