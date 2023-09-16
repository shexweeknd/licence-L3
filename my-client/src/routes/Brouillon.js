import React, { useEffect, useState } from 'react';
import { getSavingFolder } from '../services/api.js';

const TreeItem = ({ label, children }) => (
    <li>
      {label}
      {typeof children === 'object' && Object.keys(children).length > 0 && (
        <ul>
          {Object.entries(children).map(([childLabel, childData], index) => (
            <TreeItem key={index} label={childLabel} children={childData} />
          ))}
        </ul>
      )}
    </li>
  );  

function TreeView ({ data }) {
  return (
    <div>
      {
        Object.entries(data).map(([key, value]) => (
          value ? 
          <ul>
              <li key={key}>
                  {key}
              </li>
              <TreeView data={value}/>
          </ul> :
          <ul>
              <li key={key}>
                  {key}
              </li>
          </ul>

        ))
      }
    </div>
  )
}


export default function Brouillon() {

    const [treeData, setTreeData] = useState({})

    useEffect(()=> {
        const fetchData = async () => {
            return await getSavingFolder()
        }

        fetchData().then(response => {
            setTreeData(response.data)
        })

    }, [])

  return (
    <div>
      <h1>Arborescence</h1>
      {Object.entries(treeData).length > 0 ? 
       <TreeView data={treeData}/>
       : <p>loading</p>}
    </div>
  );
}
