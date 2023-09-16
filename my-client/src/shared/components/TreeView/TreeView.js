import "./TreeView.css";

import Loading from "../Loading/Loading.js";

import ClosedFolder from "../../assets/icons/closed-folder.png";
import OpenedFolder from "../../assets/icons/opened-folder.png";
import Mp4File from "../../assets/icons/mp4-file.png";

import { useState, useEffect } from "react";

import { getSavingFolder, streamFile, fetchData } from "../../../services/api";

// const NODE_ADDR = process.env.NODE_ADDR;
// console.log(NODE_ADDR)

const NODE_ADDR = "http://localhost:4000";

function Children({ item, niveau }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        style={
          isExpanded
            ? { background: "#70b9d6", opacity: 0.85, cursor: "pointer" }
            : { cursor: "pointer" }
        }
      >
        {isExpanded ? <img src={OpenedFolder} /> : <img src={ClosedFolder} />}
        {item.name}
      </div>
      {isExpanded && <TreeNode data={item.children} niveau={niveau + 1} />}
    </>
  );
}

const TreeNode = ({ data, niveau }) => {

  const [metadata, setMetaData] = useState({});

  const playVideo = (path) => {
      const videoPlayer = document.getElementById("video-player");

      videoPlayer.src = `${NODE_ADDR}/api/journaux/stream-file?filePath=${path}`;

      displayMetaData(videoPlayer.src)
    };

  const displayMetaData = async (url) => {

    try {

      const regex = /=([^&]+)$/;
      const match = url.match(regex);

      await fetchData('/api/journaux/metadata', {file: match ? match[1] : ""}).then(response => {
        console.log("metaData reçu: ", response)
        document.getElementById("metadata-name").textContent = `Nom: ${response.name}`;
        document.getElementById("metadata-date").textContent = `Date: ${response.date}`;
        document.getElementById("metadata-hour").textContent = `Heure: ${response.hour}`;
        document.getElementById("metadata-room").textContent = `Room: ${response.room}`;


        document.getElementById("metadata-ip").textContent = `IP: ${response.ip}`;
        document.getElementById("metadata-taille").textContent = `Taille: ${response.taille}`;
        document.getElementById("metadata-resolution").textContent = `Résolution: ${response.resolution}`;
      })

    } catch (error) {
      // Gérer l'erreur ici
    }
  }


  return (
    <>
      {data.map((item) => (
        <div key={item.path} className={`niveau-${niveau}`}>
          {item.type === "folder" ? (
            <Children item={item} niveau={niveau} />
          ) : (
            <>
              <img src={Mp4File} />
              <a onClick={() => playVideo(item.path)}>{item.name}</a>
            </>
          )}
        </div>
      ))}
    </>
  );

}

export default function TreeView() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    async function fetchQuery() {
      return await getSavingFolder();
    }
    fetchQuery().then((response) => {
      setTreeData(response.data);
    });
  }, []);

  console.log(treeData);

  return (
    <>
      {treeData.length > 0 ? (
        <TreeNode data={treeData} niveau={1} />
      ) : (
        <Loading />
      )}
    </>
  );
}
