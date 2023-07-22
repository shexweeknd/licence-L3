import './TreeView.css';
import ClosedFolder from '../../assets/icons/closed-folder.png';
import OpenedFolder from '../../assets/icons/opened-folder.png';
import Mp4File from '../../assets/icons/mp4-file.png';

import { treeData } from "./data";
import  { useState } from "react";

function Children({item, niveau}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    console.log(niveau)
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

  console.log()
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
  return <TreeNode data={treeData.children} niveau={1}/>;
}
