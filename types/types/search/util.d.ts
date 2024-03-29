import { Protyle } from "../protyle";
import { App } from "../index";
export declare const toggleReplaceHistory: (searchElement: Element) => void;
export declare const toggleSearchHistory: (searchElement: Element, config: ISearchOption, edit: Protyle) => void;
export declare const openGlobalSearch: (app: App, text: string, replace: boolean) => void;
export declare const genSearch: (app: App, config: ISearchOption, element: Element, closeCB?: () => void) => Protyle;
export declare const getQueryTip: (method: number) => string;
export declare const getArticle: (options: {
    id: string;
    config: ISearchOption;
    edit: Protyle;
    value: string;
}) => void;
export declare const replace: (element: Element, config: ISearchOption, edit: Protyle, isAll: boolean) => void;
export declare const inputEvent: (element: Element, config: ISearchOption, edit: Protyle, rmCurrentCriteria?: boolean) => void;
