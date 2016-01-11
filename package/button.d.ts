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
export declare let create: (data?: IData, children?: boolean | string | b.IBobrilNodeWithTag | b.IBobrilNodeWithComponent | b.IBobrilNodeWithChildren | b.IBobrilChildArray) => b.IBobrilNodeWithTag | b.IBobrilNodeWithComponent | b.IBobrilNodeWithChildren;
