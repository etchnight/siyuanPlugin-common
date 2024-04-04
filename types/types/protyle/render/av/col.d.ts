import { Menu } from "../../../plugin/Menu";
export declare const duplicateCol: (options: {
    protyle: IProtyle;
    type: TAVCol;
    avID: string;
    colId: string;
    newValue: string;
    icon: string;
}) => void;
export declare const getEditHTML: (options: {
    protyle: IProtyle;
    colId: string;
    data: IAV;
    isCustomAttr: boolean;
}) => string;
export declare const bindEditEvent: (options: {
    protyle: IProtyle;
    data: IAV;
    menuElement: HTMLElement;
    isCustomAttr: boolean;
}) => void;
export declare const getColNameByType: (type: TAVCol) => any;
export declare const getColIconByType: (type: TAVCol) => "iconLink" | "iconCheck" | "iconList" | "iconListItem" | "iconMath" | "iconOpen" | "iconAlignLeft" | "iconKey" | "iconNumber" | "iconSearch" | "iconCalendar" | "iconClock" | "iconImage" | "iconEmail" | "iconPhone";
export declare const showColMenu: (protyle: IProtyle, blockElement: Element, cellElement: HTMLElement) => void;
export declare const addCol: (protyle: IProtyle, blockElement: Element, previousID?: string) => Menu;
