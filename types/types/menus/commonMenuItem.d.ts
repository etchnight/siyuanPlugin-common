import { App } from "../index";
export declare const openWechatNotify: (nodeElement: Element) => void;
export declare const openFileWechatNotify: (protyle: IProtyle) => void;
export declare const openFileAttr: (attrs: IObject, focusName?: string, protyle?: IProtyle) => void;
export declare const openAttr: (nodeElement: Element, focusName?: string, protyle?: IProtyle) => void;
export declare const copySubMenu: (id: string, accelerator?: boolean, focusElement?: Element) => ({
    icon: string;
    accelerator: string;
    label: any;
    click: () => void;
} | {
    label: any;
    accelerator: string;
    click: () => void;
    icon?: undefined;
})[];
export declare const exportMd: (id: string) => HTMLElement;
export declare const openMenu: (app: App, src: string, onlyMenu: boolean, showAccelerator: boolean) => ({
    icon: string;
    label: any;
    accelerator: string;
} | {
    label: any;
    accelerator: string;
    icon?: undefined;
})[];
export declare const renameMenu: (options: {
    path: string;
    notebookId: string;
    name: string;
    type: "notebook" | "file";
}) => HTMLElement;
export declare const movePathToMenu: (paths: string[]) => HTMLElement;
