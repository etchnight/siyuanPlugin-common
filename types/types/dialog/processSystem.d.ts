import { App } from "../index";
import { Plugin } from "../plugin";
export declare const reloadSync: (app: App, data: {
    upsertRootIDs: string[];
    removeRootIDs: string[];
}) => void;
export declare const lockScreen: (app: App) => void;
export declare const kernelError: () => void;
export declare const exitSiYuan: () => void;
export declare const transactionError: () => void;
export declare const progressStatus: (data: IWebSocketData) => void;
export declare const progressLoading: (data: IWebSocketData) => void;
export declare const progressBackgroundTask: (tasks: {
    action: string;
}[]) => void;
export declare const bootSync: () => void;
export declare const setTitle: (title: string) => void;
export declare const downloadProgress: (data: {
    id: string;
    percent: number;
}) => void;
export declare const processSync: (data?: IWebSocketData, plugins?: Plugin[]) => void;
