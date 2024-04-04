export declare class Menu {
    element: HTMLElement;
    removeCB: () => void;
    private wheelEvent;
    constructor();
    showSubMenu(subMenuElement: HTMLElement): void;
    private preventDefault;
    addSeparator(index?: number): HTMLElement;
    addItem(option: IMenu): HTMLElement;
    removeScrollEvent(): void;
    remove(): void;
    append(element?: HTMLElement, index?: number): void;
    popup(options: IPosition): void;
    fullscreen(position?: "bottom" | "all"): void;
}
export declare class MenuItem {
    element: HTMLElement;
    constructor(options: IMenu);
}
export declare const bindMenuKeydown: (event: KeyboardEvent) => boolean;
export declare class subMenu {
    menus: IMenu[];
    constructor();
    addSeparator(index?: number): void;
    addItem(menu: IMenu): void;
}
