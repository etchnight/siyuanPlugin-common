export declare const saveScroll: (protyle: IProtyle, getObject?: boolean) => IScrollAttr;
export declare const getDocByScroll: (options: {
    protyle: IProtyle;
    scrollAttr: IScrollAttr;
    mergedOptions?: IOptions;
    cb?: () => void;
    focus?: boolean;
}) => void;
