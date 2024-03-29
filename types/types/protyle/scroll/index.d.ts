export declare class Scroll {
    element: HTMLElement;
    private parentElement;
    private inputElement;
    lastScrollTop: number;
    keepLazyLoad: boolean;
    constructor(protyle: IProtyle);
    private setIndex;
    updateIndex(protyle: IProtyle, id: string): void;
    update(protyle: IProtyle): void;
}
