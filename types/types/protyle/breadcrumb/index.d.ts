export declare class Breadcrumb {
    element: HTMLElement;
    private mediaRecorder;
    private id;
    private messageId;
    constructor(protyle: IProtyle);
    private startRecord;
    private genMobileMenu;
    toggleExit(hide: boolean): void;
    showMenu(protyle: IProtyle, position: IPosition): void;
    render(protyle: IProtyle, update?: boolean): void;
    hide(): void;
}
