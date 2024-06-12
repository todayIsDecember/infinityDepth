import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IFolders } from "../../interfaces/IFolders";

export interface CategoriesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    categories: IFolders[]
    sendCategory: (id: number) => void
}