export declare const fixTableRange: (range: Range) => void;
export declare const selectAll: (protyle: IProtyle, nodeElement: Element, range: Range) => boolean;
export declare const getRangeByPoint: (x: number, y: number) => Range;
export declare const getEditorRange: (element: Element) => Range;
export declare const getSelectionPosition: (nodeElement: Element, range?: Range) => {
    left: number;
    top: number;
};
export declare const getSelectionOffset: (selectElement: Node, editorElement?: Element, range?: Range) => {
    end: number;
    start: number;
};
export declare const setLastNodeRange: (editElement: Element, range: Range, setStart?: boolean) => Range;
export declare const setFirstNodeRange: (editElement: Element, range: Range) => Range;
export declare const focusByOffset: (container: Element, start: number, end: number) => false | Range;
export declare const focusByWbr: (element: Element, range: Range) => void;
export declare const focusByRange: (range: Range) => void;
export declare const focusBlock: (element: Element, parentElement?: HTMLElement, toStart?: boolean) => false | Range;
export declare const focusSideBlock: (updateElement: Element) => void;
