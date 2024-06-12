'use client'

import { EditFormProps } from "./EditFormProps";
import cn from 'classnames'
import styles from './EditForm.module.css'
import { Button } from "../Button/Button";
import AddIcon from '../../../public/icons/add.svg'
import RemoveIcon from '../../../public/icons/delete.svg'
import RenameIcon from '../../../public/icons/rename.svg'
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { ActionsType } from "./actions.type";
import { Alert } from "../Alert/Alert";
import { createPortal } from "react-dom";
import { createFolderTemplate, renameFolderTemplate } from "../../helpers/dataStructure";

export const EditForm = ({folder, sendupdatedfolders, className, ...props}:EditFormProps): JSX.Element => {
    const [actions, setActions] = useState<ActionsType>()
    const [showError, setShowError] = useState('')
    const [value , setValue] = useState<string>('')
    const [isClient, setIsClient] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState('')

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if(!folder) setActions(undefined)
    }, [folder])

    const variants = {
        open: {
            overflow: 'visible',
            opacity: 1
        },
        hidden: {
            overflow: 'hidden',
            opacity: 0
        }
    }

    const onAddActions = (id: ActionsType) => {
        if(!folder && id === 'remove' || !folder && id === 'rename') 
            {
                setShowError('action is not available in this folder')
                setTimeout(() => setShowError(''), 2000)
                return
            }
            setValue('')
        setActions(prev => prev === id ? undefined : id)
    }

    const onAddFolder = () => {
        if(!value) 
            {
                setShowError('Folder name is empty')
                setTimeout(() => setShowError(''), 2000)
                return
            }
        if(actions)
            {
                const add = createFolderTemplate(folder?.id || 0, value)
                sendupdatedfolders(add, actions)
                setActions(undefined)
                setShowSuccess('Folder created successfully')
                setTimeout(() => setShowSuccess(''), 2000)
            }
    }

    const onRename = () => {
        if(!value) 
            {
                setShowError('Folder name is empty')
                setTimeout(() => setShowError(''), 2000)
                return
            }
            if(actions && folder)
                {
                    const rename = renameFolderTemplate(folder, value)
                    sendupdatedfolders(rename, actions)
                    setActions(undefined)
                    setShowSuccess('Folder renamed successfully')
                    setTimeout(() => setShowSuccess(''), 2000)
                }
    }

    const onDelete = () => {
        if(actions && folder)
            {
                sendupdatedfolders(folder, actions)
                setActions(undefined)
                setShowSuccess('Folder deleted successfully')
                setTimeout(() => setShowSuccess(''), 2000)
            }
    }

    const AlertRoot = isClient ? document.getElementById('alert-root') : null
    return (
        <div className={cn(className, styles.form)} {...props}>
            <h1 className={styles.title}>{folder ? `${folder.name} directory`: 'Root directory'}</h1>
            <div className={styles.actions}>
                <Button className={styles.button} onClick={(e) => onAddActions('add')}><AddIcon/></Button>
                <Button className={styles.button} isValid={folder ? true : false}  onClick={(e) => onAddActions('rename')}><RenameIcon/></Button>
                <Button className={styles.button} isValid={folder ? true : false}  onClick={(e) => onAddActions('remove')}><RemoveIcon/></Button>
            </div>
            {
                <motion.div className={styles.actions} initial="hidden" variants={variants} animate={actions? 'open' : 'hidden'}>
                    {actions === 'add' &&  <>
                                                <input 
                                                    type="text" 
                                                    className={styles.input} 
                                                    placeholder="Folder Name"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                />
                                                <Button onClick={onAddFolder}>Add</Button>
                                            </>
                    }
                    {actions === 'rename' &&  <>
                                                <input 
                                                    type="text" 
                                                    className={styles.input} 
                                                    placeholder="New Folder Name"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                />
                                                <Button onClick={onRename}>Change name</Button>
                                            </>
                    }
                    {
                        actions === 'remove' && <>
                                                    <p className={styles.text}>Are you sure you want to delete this folder?</p>
                                                    <Button onClick={onDelete}>Delete</Button>
                                                </>
                    }
                </motion.div>
            }
            {AlertRoot && showError && createPortal(<Alert appierence="error" className={styles.alert}>{showError}</Alert>, AlertRoot)}
            {AlertRoot && showSuccess && createPortal(<Alert appierence="success" className={styles.alert}>{showSuccess}</Alert>, AlertRoot)}
        </div>
    )
}