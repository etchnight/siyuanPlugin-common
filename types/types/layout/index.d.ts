import { Wnd } from "./Wnd";
export declare class Layout {
    element: HTMLElement;
    children?: Array<Layout | Wnd>;
    parent?: Layout;
    direction: TDirection;
    type?: TLayout;
    id?: string;
    resize?: TDirection;
    size?: string;
    constructor(options?: ILayoutOptions);
    addLayout(child: Layout, id?: string): void;
    addWnd(child: Wnd, id?: string): void;
}
