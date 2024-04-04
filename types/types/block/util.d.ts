export declare const cancelSB: (protyle: IProtyle, nodeElement: Element) => {
    doOperations: IOperation[];
    undoOperations: IOperation[];
    previousId: string;
};
export declare const genSBElement: (layout: string, id?: string, attrHTML?: string) => HTMLDivElement;
export declare const jumpToParentNext: (protyle: IProtyle, nodeElement: Element) => void;
export declare const insertEmptyBlock: (protyle: IProtyle, position: InsertPosition, id?: string) => void;
export declare const genEmptyBlock: (zwsp?: boolean, wbr?: boolean, string?: string) => string;
export declare const genEmptyElement: (zwsp?: boolean, wbr?: boolean, id?: string) => HTMLDivElement;
