import { treeData } from "./data";
import  { useState } from "react";
import './TreeView.css'

function Children({item}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {isExpanded ? '▼ ' : '► '}
        {item.name}
      </div>
      {isExpanded && <TreeNode data={item.children} />}
    </>
  )
}

const TreeNode = ({ data }, { parent }) => {

  return(
    <>
      {data.map((item) => (
        <div key={item.path}>
          {item.type === 'folder' ? (
            <Children item={item}/>
          ) : (
            <a href={item.path}>{item.name}</a>
          )}
        </div>
      ))}
    </>
  )
}

export default function TreeView() {
  return <TreeNode data={treeData.children} parent={"start"} />;
}
