export declare class Menu {
    private menu;
    isOpen: boolean;
    element: HTMLElement;
    constructor(id?: string, closeCB?: () => void);
    showSubMenu(subMenuElement: HTMLElement): void;
    addItem(option: IMenu): HTMLElement;
    addSeparator(index?: number): HTMLElement;
    open(options: IPosition): void;
    fullscreen(position?: "bottom" | "all"): void;
    close(): void;
}
