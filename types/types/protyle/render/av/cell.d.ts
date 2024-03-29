export declare const getCellText: (cellElement: HTMLElement | false) => string;
export declare const genCellValueByElement: (colType: TAVCol, cellElement: HTMLElement) => IAVCellValue;
export declare const genCellValue: (colType: TAVCol, value: string | any) => IAVCellValue;
export declare const cellScrollIntoView: (blockElement: HTMLElement, cellElement: Element, onlyHeight?: boolean) => void;
export declare const getTypeByCellElement: (cellElement: Element) => TAVCol;
export declare const popTextCell: (protyle: IProtyle, cellElements: HTMLElement[], type?: TAVCol) => void;
export declare const updateCellsValue: (protyle: IProtyle, nodeElement: HTMLElement, value?: any, cElements?: HTMLElement[]) => {
    text: string;
    json: IAVCellValue[];
};
export declare const renderCellAttr: (cellElement: Element, value: IAVCellValue) => void;
export declare const renderCell: (cellValue: IAVCellValue) => string;
export declare const updateHeaderCell: (cellElement: HTMLElement, headerValue: {
    icon?: string;
    name?: string;
    pin?: boolean;
}) => void;
export declare const getPositionByCellElement: (cellElement: HTMLElement) => {
    rowIndex: number;
    celIndex: number;
};
export declare const dragFillCellsValue: (protyle: IProtyle, nodeElement: HTMLElement, originData: {
    [key: string]: IAVCellValue[];
}, originCellIds: string[]) => void;
