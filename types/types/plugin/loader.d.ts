import { App } from "../index";
import { Plugin } from "./index";
export declare const loadPlugins: (app: App) => Promise<void>;
export declare const loadPlugin: (app: App, item: IPluginData) => Promise<any>;
export declare const afterLoadPlugin: (plugin: Plugin) => IMenu[];
export declare const reloadPlugin: (app: App) => void;
