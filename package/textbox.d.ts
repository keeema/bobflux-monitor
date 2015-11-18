import * as b from 'node_modules/bobril/index';
export declare let style: {
    copyState: string;
};
export interface IData {
    value?: string;
    onKeyDown?: (event: b.IKeyDownUpEvent) => void;
    onChange?: (value: string) => void;
    style?: b.IBobrilStyle;
    setFocus?: boolean;
    float?: string;
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
