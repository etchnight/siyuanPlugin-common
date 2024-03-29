import { Tab } from "../Tab";
import { Model } from "../Model";
import { App } from "../../index";
export declare class Custom extends Model {
    element: Element;
    tab: Tab;
    data: any;
    type: string;
    init: (custom: Custom) => void;
    destroy: () => void;
    beforeDestroy: () => void;
    resize: () => void;
    update: () => void;
    constructor(options: {
        app: App;
        type: string;
        tab: Tab;
        data: any;
        destroy?: () => void;
        beforeDestroy?: () => void;
        resize?: () => void;
        update?: () => void;
        init: (custom: Custom) => void;
    });
}
