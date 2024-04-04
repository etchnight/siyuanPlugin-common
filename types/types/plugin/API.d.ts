import { Plugin } from "./index";
import { Dialog } from "../dialog";
import { Tab } from "../layout/Tab";
import { App } from "../index";
import { Constants } from "../constants";
import { Setting } from "./Setting";
import { Menu } from "./Menu";
import { Protyle } from "../protyle";
export declare const API: {
    confirm: (title: string, text: string, confirm?: (dialog: Dialog) => void, cancel?: (dialog: Dialog) => void) => void;
    showMessage: (message: string, timeout?: number, type?: string, messageId?: string) => string;
    adaptHotkey: (hotkey: string) => string;
    fetchPost: (url: string, data?: any, cb?: (response: IWebSocketData) => void, headers?: IObject) => void;
    fetchSyncPost: (url: string, data?: any) => Promise<IWebSocketData>;
    fetchGet: (url: string, cb: (response: string | IObject | IWebSocketData) => void) => void;
    getFrontend: () => "mobile" | "browser-mobile" | "desktop-window" | "desktop" | "browser-desktop";
    getBackend: () => "std" | "android" | "docker" | "ios" | "windows" | "linux" | "darwin";
    lockScreen: (app: App) => void;
    openMobileFileById: (app: App, id: string, action?: string[]) => void;
    openTab: (options: {
        app: App;
        doc?: {
            id: string;
            action?: string[];
            zoomIn?: boolean;
        };
        pdf?: {
            path: string;
            page?: number;
            id?: string;
        };
        asset?: {
            path: string;
        };
        search?: ISearchOption;
        card?: {
            type: TCardType;
            id?: string;
            title?: string;
        };
        custom?: {
            title: string;
            icon: string;
            data?: any;
            id: string;
        };
        position?: "right" | "bottom";
        keepCursor?: boolean;
        removeCurrentTab?: boolean;
        afterOpen?: () => void;
    }) => Promise<Tab>;
    openWindow: (options: {
        position?: IPosition;
        height?: number;
        width?: number;
        tab?: Tab;
        doc?: {
            id: string;
        };
    }) => void;
    Protyle: typeof Protyle;
    Plugin: typeof Plugin;
    Dialog: typeof Dialog;
    Menu: typeof Menu;
    Setting: typeof Setting;
    Constants: typeof Constants;
};
