import { App } from "../../index";
export declare const openBacklink: (options: {
    app: App;
    blockId: string;
    rootId?: string;
    title?: string;
    useBlockId?: boolean;
}) => Promise<void>;
export declare const openGraph: (options: {
    app: App;
    blockId: string;
    rootId?: string;
    title?: string;
    useBlockId?: boolean;
}) => Promise<void>;
export declare const openOutline: (protyle: IProtyle) => Promise<void>;
export declare const resetFloatDockSize: () => void;
export declare const toggleDockBar: (useElement: Element) => void;
