import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IFolders } from "../../interfaces/IFolders";
import { ActionsType } from "./actions.type";

export interface EditFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    folder: IFolders | undefined;
    sendupdatedfolders:  (folder: IFolders, type: ActionsType) => void,
}