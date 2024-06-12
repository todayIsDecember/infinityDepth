import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IFolders } from "../../interfaces/IFolders";

export interface CategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    folder: IFolders;
    folders: IFolders[]
    sendValue: (id: number) => void
}