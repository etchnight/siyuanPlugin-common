export declare class Preview {
    element: HTMLElement;
    previewElement: HTMLElement;
    private mdTimeoutId;
    constructor(protyle: IProtyle);
    render(protyle: IProtyle, cb?: (outlineData: IBlockTree[]) => void): void;
    private link2online;
    private copyToX;
    private processZHBlockquote;
    private processZHTable;
}
