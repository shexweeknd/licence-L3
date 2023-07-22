import './LogsTreeContainer.css';

import TreeView from '../TreeView/TreeView'

import Delete from '../../assets/icons/delete.png';
import Download from '../../assets/icons/download.png'

export default function LogsVideoContainer() {
    return (
        <>
        <div className="container">
            <div className="tree">
                <TreeView />
            </div>
            <form className="button-container">
                <button id="delete">
                    <img src={Delete} alt='delete'/>
                </button>

                <button id="download">
                    <img src={Download} alt="download"/>
                </button>
            </form>
        </div>
        </>
    )
}