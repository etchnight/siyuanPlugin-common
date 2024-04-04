import { Model } from "../layout/Model";
import { Tab } from "../layout/Tab";
import { Protyle } from "../protyle";
import { App } from "../index";
export declare class Search extends Model {
    element: HTMLElement;
    config: ISearchOption;
    edit: Protyle;
    constructor(options: {
        tab: Tab;
        config: ISearchOption;
        app: App;
    });
    updateSearch(text: string, replace: boolean): void;
}
