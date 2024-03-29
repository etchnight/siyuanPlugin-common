export declare const getRandomEmoji: () => string;
export declare const unicode2Emoji: (unicode: string, className?: string, needSpan?: boolean, lazy?: boolean) => string;
export declare const lazyLoadEmoji: (element: HTMLElement) => void;
export declare const lazyLoadEmojiImg: (element: Element) => void;
export declare const filterEmoji: (key?: string, max?: number) => string;
export declare const addEmoji: (unicode: string) => void;
export declare const openEmojiPanel: (id: string, type: "doc" | "notebook" | "av", position: IPosition, avCB?: (emoji: string) => void) => void;
export declare const updateOutlineEmoji: (unicode: string, id: string) => void;
export declare const updateFileTreeEmoji: (unicode: string, id: string, icon?: string) => void;
