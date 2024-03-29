export declare class Gutter {
    element: HTMLElement;
    private gutterTip;
    constructor(protyle: IProtyle);
    private isMatchNode;
    private turnsOneInto;
    private turnsIntoOne;
    private turnsInto;
    private showMobileAppearance;
    renderMultipleMenu(protyle: IProtyle, selectsElement: Element[]): import("../../menus/Menu").Menu;
    renderMenu(protyle: IProtyle, buttonElement: Element): import("../../menus/Menu").Menu;
    private genHeadingTransform;
    private genClick;
    private genAlign;
    private genWidths;
    private genCopyTextRef;
    render(protyle: IProtyle, element: Element, wysiwyg: HTMLElement, target?: Element): void;
}
