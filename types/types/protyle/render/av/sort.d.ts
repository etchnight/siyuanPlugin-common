export declare const addSort: (options: {
    data: IAV;
    rect: DOMRect;
    menuElement: HTMLElement;
    tabRect: DOMRect;
    avId: string;
    protyle: IProtyle;
}) => void;
export declare const bindSortsEvent: (protyle: IProtyle, menuElement: HTMLElement, data: IAV) => void;
export declare const getSortsHTML: (columns: IAVColumn[], sorts: IAVSort[]) => string;
