export declare const openViewMenu: (options: {
    protyle: IProtyle;
    blockElement: HTMLElement;
    element: HTMLElement;
}) => void;
export declare const bindViewEvent: (options: {
    protyle: IProtyle;
    data: IAV;
    menuElement: HTMLElement;
}) => void;
export declare const getViewHTML: (data: IAVTable) => string;
export declare const getSwitcherHTML: (views: IAVView[], viewId: string) => string;
export declare const addView: (protyle: IProtyle, blockElement: Element) => void;
