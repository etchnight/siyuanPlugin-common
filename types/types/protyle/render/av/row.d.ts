export declare const selectRow: (checkElement: Element, type: "toggle" | "select" | "unselect" | "unselectAll") => void;
export declare const updateHeader: (rowElement: HTMLElement) => void;
/**
 * 前端插入一假行
 * @param protyle
 * @param blockElement
 * @param srcIDs
 * @param previousId
 * @param avId 还用于判断是否是插入的 block
 */
export declare const insertAttrViewBlockAnimation: (protyle: IProtyle, blockElement: Element, srcIDs: string[], previousId: string, avId?: string) => void;
export declare const stickyRow: (blockElement: HTMLElement, elementRect: DOMRect, status: "top" | "bottom" | "all") => void;
export declare const setPageSize: (options: {
    target: HTMLElement;
    protyle: IProtyle;
    avID: string;
    nodeElement: Element;
}) => void;
export declare const deleteRow: (blockElement: HTMLElement, protyle: IProtyle) => void;
