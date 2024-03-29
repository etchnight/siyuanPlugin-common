export declare const onGet: (options: {
    data: IWebSocketData;
    protyle: IProtyle;
    action?: string[];
    scrollAttr?: IScrollAttr;
    updateReadonly?: boolean;
    afterCB?: () => void;
}) => void;
export declare const disabledForeverProtyle: (protyle: IProtyle) => void;
/** 禁用编辑器 */
export declare const disabledProtyle: (protyle: IProtyle) => void;
/** 解除编辑器禁用 */
export declare const enableProtyle: (protyle: IProtyle) => void;
export declare const setReadonlyByConfig: (protyle: IProtyle, updateReadonly: boolean) => void;
