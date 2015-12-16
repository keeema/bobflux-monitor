import * as b from 'bobril';
export declare let style: {
    mainButtonOpen: string;
    mainButtonClose: string;
    actionButton: string;
};
export interface IData {
    title: string;
    style?: b.IBobrilStyle;
    onClick: () => void;
    float?: string;
    width?: string;
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
