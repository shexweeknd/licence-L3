import './LogsVideoContainer.css';

import { useContext } from 'react';
import { LogsContext } from '../../contexts/Context'

export default function LogsVideoContainer() {

    const { name, date, hour, room, ip, size, shape, source, type} = useContext(LogsContext)

    return (
        <>
        <div className="logs-video-container">
            <video controls controlslist="nodownload">
                <source src={source} type={type}></source>
            </video>
            <div className='info'>
                <div>
                    <p>Nom: {name} </p>
                    <p>Date: {date} </p>
                    <p>Heure: {hour} </p>
                    <p>Salle: {room} </p>
                </div>

                <div>
                    <p>IP: {ip} </p>
                    <p>Taille: {size} </p>
                    <p>Résolution: {shape} </p>
                </div>
            </div>
        </div>
        </>
    )
}