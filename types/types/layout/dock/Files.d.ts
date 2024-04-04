import { Tab } from "../Tab";
import { Model } from "../Model";
import { App } from "../../index";
export declare class Files extends Model {
    element: HTMLElement;
    parent: Tab;
    private actionsElement;
    closeElement: HTMLElement;
    constructor(options: {
        tab: Tab;
        app: App;
    });
    private genNotebook;
    init(init?: boolean): void;
    private onMkdir;
    private onRemove;
    private onMount;
    onRename(data: {
        path: string;
        title: string;
        box: string;
    }): void;
    private onMove;
    private onLsHTML;
    private onLsSelect;
    private setCurrent;
    getLeaf(liElement: Element, notebookId: string): void;
    selectItem(notebookId: string, filePath: string, data?: {
        files: IFile[];
        box: string;
        path: string;
    }): void;
    private genFileHTML;
    private initMoreMenu;
}
