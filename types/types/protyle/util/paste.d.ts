export declare const pasteEscaped: (protyle: IProtyle, nodeElement: Element) => Promise<void>;
export declare const pasteAsPlainText: (protyle: IProtyle) => Promise<void>;
export declare const pasteText: (protyle: IProtyle, textPlain: string, nodeElement: Element) => void;
export declare const paste: (protyle: IProtyle, event: (ClipboardEvent | DragEvent) & {
    target: HTMLElement;
}) => Promise<void>;
