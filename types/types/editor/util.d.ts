import { Tab } from "../layout/Tab";
import { resize } from "../protyle/util/resize";
import { App } from "../index";
export declare const openFileById: (options: {
    app: App;
    id: string;
    position?: string;
    mode?: TEditorMode;
    action?: string[];
    keepCursor?: boolean;
    zoomIn?: boolean;
    removeCurrentTab?: boolean;
    afterOpen?: () => void;
}) => Promise<Tab>;
export declare const openAsset: (app: App, assetPath: string, page: number | string, position?: string) => void;
export declare const openFile: (options: IOpenFileOptions) => Promise<Tab>;
export declare const updatePanelByEditor: (options: {
    protyle?: IProtyle;
    focus: boolean;
    pushBackStack: boolean;
    reload: boolean;
    resize: boolean;
}) => void;
export declare const isCurrentEditor: (blockId: string) => boolean;
export declare const updateOutline: (models: IModels, protyle: IProtyle, reload?: boolean) => void;
export declare const updateBacklinkGraph: (models: IModels, protyle: IProtyle) => void;
export declare const openBy: (url: string, type: "folder" | "app") => void;
