export declare const isMobile: () => boolean;
export declare const getBackend: () => "std" | "android" | "docker" | "ios" | "windows" | "linux" | "darwin";
export declare const getFrontend: () => "mobile" | "browser-mobile" | "desktop-window" | "desktop" | "browser-desktop";
export declare const isWindow: () => boolean;
export declare const isTouchDevice: () => boolean;
export declare const isArrayEqual: (arr1: string[], arr2: string[]) => boolean;
export declare const getRandom: (min: number, max: number) => number;
export declare const getSearch: (key: string, link?: string) => string;
export declare const isBrowser: () => boolean;
export declare const isDynamicRef: (text: string) => boolean;
export declare const isFileAnnotation: (text: string) => boolean;
export declare const isValidAttrName: (name: string) => boolean;
export declare const looseJsonParse: (text: string) => any;
export declare const objEquals: (a: any, b: any) => boolean;