import { IFolders } from "../interfaces/IFolders";

export const showFirstLevelFolders = (folders: IFolders[]): IFolders[] | [] => {
    return folders.filter(folder => folder.parent_id == 0)
};

export const showChildrenFolders = (id: number, folders: IFolders[]): IFolders[] | [] => {
    return folders.filter(folder => folder.parent_id === id)
}

export const findFolder = (id: number, folders: IFolders[]): IFolders | undefined => {
    return folders.find(folder => folder.id === id)
}

export const findParentFolder = (id: number, folders: IFolders[]): number | 0 => {
    const childFolder = findFolder(id, folders)
    const parentFolder = childFolder? folders.find(folder => folder.id === childFolder.parent_id) : undefined
    return parentFolder?.id || 0
}

export const renameFolderTemplate = (folder: IFolders, newName: string): IFolders => {
    return {...folder, name: newName}
}

export const createFolderTemplate = (parent_id: number = 0, folder_name: string): IFolders => {
    const newFolder: IFolders = {
        id: Date.now(),
        name: folder_name,
        parent_id
    }
    return newFolder
}

export const deleteFolder = (id: number, folders: IFolders[]): IFolders[] => {
    const deleteChildrens =  folders.filter(folder => folder.parent_id !== id)
    return deleteChildrens.filter(folder => folder.id !== id)
}