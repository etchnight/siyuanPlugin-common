export declare const getPreviousBlock: (element: Element) => false | Element;
export declare const getLastBlock: (element: Element) => Element;
export declare const getFirstBlock: (element: Element) => Element;
export declare const getNextBlock: (element: Element) => false | HTMLElement;
export declare const getNoContainerElement: (element: Element) => false | Element;
export declare const getContenteditableElement: (element: Element) => Element;
export declare const isNotEditBlock: (element: Element) => boolean;
export declare const getTopEmptyElement: (element: Element) => Element;
export declare const getTopAloneElement: (topSourceElement: Element) => Element;
export declare const hasNextSibling: (element: Node) => false | ChildNode;
export declare const hasPreviousSibling: (element: Node) => false | ChildNode;
export declare const getNextFileLi: (current: Element) => false | Element;
export declare const getPreviousFileLi: (current: Element) => false | Element;