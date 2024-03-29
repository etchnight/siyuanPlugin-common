export declare class Setting {
    private items;
    private confirmCallback;
    private destroyCallback;
    private width;
    private height;
    constructor(options: {
        height?: string;
        width?: string;
        destroyCallback?: () => void;
        confirmCallback?: () => void;
    });
    addItem(options: IPluginSettingOption): void;
    open(name: string): void;
}
