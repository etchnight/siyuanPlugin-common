import { Layout } from "./index";
import { Tab } from "./Tab";
import { App } from "../index";
export declare class Wnd {
    private app;
    id: string;
    parent?: Layout;
    element: HTMLElement;
    headersElement: HTMLElement;
    children: Tab[];
    resize?: TDirection;
    constructor(app: App, resize?: TDirection, parentType?: TLayout);
    showHeading(): void;
    switchTab(target: HTMLElement, pushBack?: boolean, update?: boolean, resize?: boolean, isSaveLayout?: boolean): void;
    addTab(tab: Tab, keepCursor?: boolean, isSaveLayout?: boolean): void;
    private renderTabList;
    private removeOverCounter;
    private destroyModel;
    private removeTabAction;
    removeTab(id: string, closeAll?: boolean, animate?: boolean, isSaveLayout?: boolean): void;
    moveTab(tab: Tab, nextId?: string): void;
    split(direction: TDirection): Wnd;
    private remove;
}
