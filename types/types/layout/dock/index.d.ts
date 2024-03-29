import { Layout } from "../index";
import { Model } from "../Model";
import { App } from "../../index";
export declare class Dock {
    element: HTMLElement;
    layout: Layout;
    private position;
    private app;
    resizeElement: HTMLElement;
    pin: boolean;
    data: {
        [key: string]: Model | boolean;
    };
    constructor(options: {
        app: App;
        data: {
            pin: boolean;
            data: IDockTab[][];
        };
        position: TDockPosition;
    });
    togglePin(): void;
    resetDockPosition(show: boolean): void;
    showDock(reset?: boolean): void;
    hideDock(reset?: boolean): void;
    toggleModel(type: string, show?: boolean, close?: boolean, hide?: boolean, isSaveLayout?: boolean): void;
    add(index: number, sourceElement: Element): void;
    remove(key: string): void;
    private getClassDirect;
    setSize(): void;
    private getMaxSize;
    genButton(data: IDockTab[], index: number, tabIndex?: number): void;
}
