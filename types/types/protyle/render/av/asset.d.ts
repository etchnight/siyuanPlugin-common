export declare const bindAssetEvent: (options: {
    protyle: IProtyle;
    data: IAV;
    menuElement: HTMLElement;
    cellElements: HTMLElement[];
    blockElement: Element;
}) => void;
export declare const getAssetHTML: (cellElements: HTMLElement[]) => string;
export declare const updateAssetCell: (options: {
    protyle: IProtyle;
    data: IAV;
    cellElements: HTMLElement[];
    type: "replace" | "addUpdate" | "remove";
    replaceValue?: IAVCellAssetValue[];
    addUpdateValue?: IAVCellAssetValue[];
    removeContent?: string;
    blockElement: Element;
}) => void;
export declare const editAssetItem: (protyle: IProtyle, data: IAV, cellElements: HTMLElement[], target: HTMLElement, blockElement: Element) => void;
export declare const addAssetLink: (protyle: IProtyle, data: IAV, cellElements: HTMLElement[], target: HTMLElement, blockElement: Element) => void;
export declare const dragUpload: (files: string[], protyle: IProtyle, cellElement: HTMLElement, avID: string) => void;
