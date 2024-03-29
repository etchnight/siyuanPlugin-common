import { App } from "../index";
export declare const exportAsset: (src: string) => {
    label: any;
    icon: string;
    click(): Promise<void>;
};
export declare const openEditorTab: (app: App, id: string, notebookId?: string, pathString?: string) => void;
export declare const copyPNG: (imgElement: HTMLImageElement) => void;
