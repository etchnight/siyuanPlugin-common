export declare class Tree {
    element: HTMLElement;
    private data;
    private blockExtHTML;
    private topExtHTML;
    click: (element: Element, event?: MouseEvent) => void;
    private ctrlClick;
    private toggleClick;
    private shiftClick;
    private altClick;
    private rightClick;
    constructor(options: {
        element: HTMLElement;
        data: IBlockTree[];
        blockExtHTML?: string;
        topExtHTML?: string;
        click?(element: HTMLElement, event: MouseEvent): void;
        ctrlClick?(element: HTMLElement): void;
        altClick?(element: HTMLElement): void;
        shiftClick?(element: HTMLElement): void;
        toggleClick?(element: HTMLElement): void;
        rightClick?(element: HTMLElement, event: MouseEvent): void;
    });
    updateData(data: IBlockTree[]): void;
    private genHTML;
    private genBlockHTML;
    toggleBlocks(liElement: Element): void;
    private setCurrent;
    private bindEvent;
    expandAll(): void;
    collapseAll(): void;
    getExpandIds(): string[];
    setExpandIds(ids: string[]): void;
}
