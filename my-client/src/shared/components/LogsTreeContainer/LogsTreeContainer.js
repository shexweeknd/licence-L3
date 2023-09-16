import "./LogsTreeContainer.css";

import TreeView from "../TreeView/TreeView";

import Delete from "../../assets/icons/delete.png";
import Download from "../../assets/icons/download.png";

const NODE_URL = "http://localhost:4000/"

export default function LogsVideoContainer() {
  const download = async (e) => {
    e.preventDefault();

    try {
        const url = document.getElementById("video-player").src

        const regex = /\?(.*)$/;
        const match = url.match(regex);

        const downurl = `${NODE_URL}api/journaux/download-file?${match[1]}`;
        window.open(downurl, "_blank")
    } catch (err) {
        console.error("error occured: ",err)
    }
  };

  return (
    <>
      <div className="container">
        <div className="tree">
          <TreeView />
        </div>
        <form className="button-container">
          <button id="delete">
            <img src={Delete} alt="delete" />
          </button>

          <button id="download" onClick={(e) => download(e)}>
            <img src={Download} alt="download" />
          </button>
        </form>
      </div>
    </>
  );
}
