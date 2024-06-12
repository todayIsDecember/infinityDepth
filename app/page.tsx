'use client'

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Categories, EditForm } from "./components";
import { IFolders } from "./interfaces/IFolders";
import { deleteFolder, findFolder, findParentFolder } from "./helpers/dataStructure";
import { ActionsType } from "./components/EditForm/actions.type";

export default function Home() {
  const [foldersState, setFoldersState] = useState<IFolders[]>([])
  const [selectedFolder, setSelectedFolder] = useState<number>(0)

  const folder: IFolders | undefined = findFolder(selectedFolder, foldersState)

const updateFoldersHandler = (folder: IFolders, action: ActionsType) => {
  if(action === 'remove') 
    {
      const removeFolder = deleteFolder(folder.id, foldersState)
      setFoldersState(removeFolder)
      return
    }
  if(action === 'add')
    {
      setFoldersState(prev => [...prev, folder])
      return
    }
    if(action === 'rename')
      {
        setFoldersState(prev => prev.map(item => item.id === folder.id ? folder : item))
      }
}
  

  return (
    <main className={styles.main}>
      <div className={styles.categoriesSection}>
        <Categories categories={foldersState} sendCategory={(id) => setSelectedFolder(prev => prev === id ? findParentFolder(prev, foldersState) : id)}/>
      </div>
      <div className={styles.editSection}>
        <EditForm folder={folder} sendupdatedfolders={updateFoldersHandler}/>
      </div>
    </main>
  );
}
