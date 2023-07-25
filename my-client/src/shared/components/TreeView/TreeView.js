import './TreeView.css';

import Loading from '../Loading/Loading.js';

import ClosedFolder from '../../assets/icons/closed-folder.png';
import OpenedFolder from '../../assets/icons/opened-folder.png';
import Mp4File from '../../assets/icons/mp4-file.png';

import  { useState, useEffect } from "react";

import { fetchData } from "../../../services/api";

function Children({item, niveau}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <>
      <div onClick={handleToggle} style={isExpanded ? {background: "#70b9d6", opacity: 0.85, cursor: "pointer"}: {cursor: "pointer"}}>
        {isExpanded ? <img src={OpenedFolder}/> : <img src={ClosedFolder}/>}
        {item.name}
      </div>
      {isExpanded && <TreeNode data={item.children} niveau={niveau+1}/>}
    </>
  )
}

const TreeNode = ({ data, niveau }) => {

  return(
    <>
      {data.map((item) => (
        <div key={item.path} className={`niveau-${niveau}`}>
          {item.type === 'folder' ? (
            <Children item={item} niveau={niveau} />
          ) : (
            <>
              <img src={Mp4File}/>
              <a href={item.path}>{item.name}</a>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default function TreeView() {
  const [ treeData, setTreeData ] = useState([])

  const changeValue = (value) => {
    setTreeData(value)
  }

  useEffect(() => {
    async function fetchQuery() {
      try {
        const arrayTreeData = await fetchData('/api/logs/treedata');
        changeValue(arrayTreeData)

      } catch (error) {
        // Gérer l'erreur ici
      }
    }
    fetchQuery()
  },
  [])

  console.log(treeData)

  return <>
          {treeData[0] ? <TreeNode data={treeData[0].children} niveau={1}/> : <Loading />}
          </>
}