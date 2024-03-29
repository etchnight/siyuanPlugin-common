import { Tab } from "../Tab";
import { Model } from "../Model";
import { Tree } from "../../util/Tree";
import { App } from "../../index";
export declare class Outline extends Model {
    tree: Tree;
    element: HTMLElement;
    headerElement: HTMLElement;
    type: "pin" | "local";
    blockId: string;
    isPreview: boolean;
    private openNodes;
    constructor(options: {
        app: App;
        tab: Tab;
        blockId: string;
        type: "pin" | "local";
        isPreview: boolean;
    });
    updateDocTitle(ial?: IObject): void;
    private onTransaction;
    setCurrent(nodeElement: HTMLElement): void;
    private setCurrentById;
    update(data: IWebSocketData, callbackId?: string): void;
}
