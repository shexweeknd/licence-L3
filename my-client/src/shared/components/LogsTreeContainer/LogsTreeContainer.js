import "./LogsTreeContainer.css";

import TreeView from "../TreeView/TreeView";

import Delete from "../../assets/icons/delete.png";
import Download from "../../assets/icons/download.png";

import { fetchData } from '../../../services/api.js';

const NODE_URL = "http://localhost:4000/"

export default function LogsVideoContainer() {
  const down = async (e) => {
    e.preventDefault();

    try {
        const url = document.getElementById("video-player").src
        const token = JSON.parse(localStorage.getItem("userData")).token

        const regex = /\?(.*)$/;
        const match = url.match(regex);

        const downurl = `${NODE_URL}api/journaux/download-file?${match[1]}&token=${token}`;
        window.open(downurl, "_blank")
    } catch (err) {
        console.error("error occured: ",err)
    }
  };

  const del = async (e) => {

    try {
        const url = document.getElementById("video-player").src
        const token = JSON.parse(localStorage.getItem("userData")).token

        const regex = /\?(.*)$/;
        const match = url.match(regex);

        const delurl = `${NODE_URL}api/journaux/delete-file?${match[1]}&token=${token}`;

        await fetchData(delurl).then(response => {
            if (response.removed === "ok") {
                //refresh treeview
            }
        })

    } catch (err) {
        console.error("error occured: ", err)
    }
  }

  return (
    <>
      <div className="container">
        <div className="tree">
          <TreeView />
        </div>
        <form className="button-container">
          <button id="delete-button" onClick={(e) => del(e)}>
            <img src={Delete} alt="delete" />
          </button>

          <button id="download-button" onClick={(e) => down(e)}>
            <img src={Download} alt="download" />
          </button>
        </form>
      </div>
    </>
  );
}
