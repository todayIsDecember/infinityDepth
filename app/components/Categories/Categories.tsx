'use client'

import { CategoriesProps } from "./CategoriesProps";
import cn from 'classnames'
import styles from './Categories.module.css'
import { Category } from "../Category/Category";
import { showFirstLevelFolders } from "../../helpers/dataStructure";
import { IFolders } from "../../interfaces/IFolders";
export const Categories = ({categories, sendCategory, className, ...props}: CategoriesProps): JSX.Element => {
    const firstCategories = showFirstLevelFolders(categories)

    return (
        <div 
        className={cn(styles.categories, className)}
        {...props}>
            {firstCategories.map((folder: IFolders) => (
                    <Category key={folder.id} folder={folder} folders={categories} sendValue={(id) => sendCategory(id)} />
            ))}
        </div>
    )
}