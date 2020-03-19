interface ISaveListContext {
    saveList: Array<string>;
    addSaveList: (save: string) => void;
    removeSaveList: (index: number) => void;
}