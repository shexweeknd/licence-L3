import './LogsTreeContainer.css';

export default function LogsVideoContainer() {
    return (
        <>
        <div className="container">
            <div className="tree">
                <p>contenu</p>
            </div>
            <div className="button-container">
                <button>
                    <i className="material-icons">delete</i>
                </button>
                <button>
                    <i className="material-icons">download</i>
                </button>
            </div>
        </div>
        </>
    )
}