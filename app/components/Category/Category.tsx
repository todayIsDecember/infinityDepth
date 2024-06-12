'use client'

import { CategoryProps } from "./CategoryProps";
import cn from 'classnames';
import styles from './Category.module.css'
import ArrowIcon from '../../../public/icons/arrow.svg'
import FolderIcon from '../../../public/icons/folder.svg'
import { showChildrenFolders } from "../../helpers/dataStructure";
import { useEffect, useState } from "react";
import { IFolders } from "../../interfaces/IFolders";
import {motion} from 'framer-motion'

// eslint-disable-next-line react/display-name
export const Category = ({ folder, sendValue, folders, className, ...props }: CategoryProps): JSX.Element => {
    const [isActive, setIsActive] = useState(false)
    const [id, setId] = useState(0)
    const [children, setChildren] = useState<IFolders[]>([])

    const variants = {
        open: {
            height: 'auto',
            opacity: 1
        },
        hidden: {
            height: 0,
            opacity: 0
        }
    }

    const onClickHandler = (id: number) => {
        setIsActive(!isActive)
        setId(id)
        sendValue(id)
    }

    useEffect(() => {
        if(id === 0) 
            {
                return
            }
        const children = showChildrenFolders(id, folders)
        setChildren(children)
    }, [folders, id])

    return (
            <div className={styles.folderContainer} {...props}>
                <button 
                    className={cn(styles.folder, {[styles.active]: isActive})} 
                    onClick={()=> onClickHandler(folder.id)}
                    >
                        <ArrowIcon className={styles.icon}/>
                        <FolderIcon className={styles.folderIcon}/>
                        {folder.name}
                </button>
                {children && isActive && children.map((folder) => (
                    <motion.div variants={variants} initial="hidden" animate={isActive ? "open" : "hidden"} className={styles.children} key={folder.id}>
                        <Category folder={folder} folders={folders} sendValue={(id) => sendValue(id)} />
                    </motion.div>
                ))}
            </div>
    )
}