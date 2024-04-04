export declare const filterMenu: (config: ISearchOption, cb: () => void) => void;
export declare const replaceFilterMenu: (config: ISearchOption) => void;
export declare const queryMenu: (config: ISearchOption, cb: () => void) => void;
export declare const saveCriterion: (config: ISearchOption, criteriaData: ISearchOption[], element: Element) => void;
export declare const moreMenu: (config: ISearchOption, criteriaData: ISearchOption[], element: Element, cb: () => void, removeCriterion: () => void, layoutMenu?: () => void) => Promise<void>;
export declare const initCriteriaMenu: (element: HTMLElement, data: ISearchOption[], config: ISearchOption) => void;
export declare const getKeyByLiElement: (element: HTMLElement) => string;
