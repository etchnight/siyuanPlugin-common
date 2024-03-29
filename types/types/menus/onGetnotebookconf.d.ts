declare interface INotebookConf {
    name: string;
    box: string;
    conf: {
        refCreateSavePath: string;
        docCreateSavePath: string;
        dailyNoteSavePath: string;
        dailyNoteTemplatePath: string;
    };
}
export declare const onGetnotebookconf: (data: INotebookConf) => void;
export {};
