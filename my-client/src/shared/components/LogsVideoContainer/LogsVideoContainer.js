import './LogsVideoContainer.css';

import { useContext } from 'react';
import { LogsContext } from '../../../contexts/Context';

export default function LogsVideoContainer() {

    // const { name, date, hour, room, ip, size, shape, type } = useContext(LogsContext)
    const { name, date, hour, room, ip, size, shape, type } = {}

    return (
        <>
        <div className="logs-video-container">
            <video id="video-player" src={"empty"} controls />
            <div className='info'>
                <div>
                    <p id="metadata-name">Nom:</p>
                    <p id="metadata-creation">Création:</p>
                    <p id="metadata-modification">Modification:</p>
                    <p id="metadata-room">Salle:</p>
                </div>

                <div>
                    <p id="metadata-ip">IP:</p>
                    <p id="metadata-taille">Taille:</p>
                    <p id="metadata-resolution">Résolution:</p>
                </div>
            </div>
        </div>
        </>
    )
}