import { App } from "../index";
export declare const bazaar: {
    element: Element;
    genHTML(): string;
    _genCardHTML(item: IBazaarItem, bazaarType: TBazaarType): string;
    _genMyHTML(bazaarType: TBazaarType, app: App): void;
    _data: {
        themes: IBazaarItem[];
        templates: IBazaarItem[];
        icons: IBazaarItem[];
        widgets: IBazaarItem[];
        plugins: IBazaarItem[];
        downloaded: IBazaarItem[];
    };
    _renderReadme(cardElement: HTMLElement, bazaarType: TBazaarType): void;
    bindEvent(app: App): void;
    _onBazaar(response: IWebSocketData, bazaarType: TBazaarType, reload: boolean): void;
};
