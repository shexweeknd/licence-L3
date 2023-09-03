import React, { useState, useRef } from 'react';
import "./CamsApp.css";

export default function CamsApp() {
    const [starting, setStarting] = useState(false);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const handleClick = () => {
        const p = document.getElementById("text-container");
        const button = document.getElementById("start");

        if (starting) {
            // Arrêt de la surveillance
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                setStream(null);
                videoRef.current.srcObject = null;
            }
            p.textContent = "surveillance stoppée";
            button.textContent = "commencer";
        } else {
            // Démarrage de la surveillance
            p.textContent = "en cours de surveillance...";
            button.textContent = "arrêter";
            
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function (newStream) {
                setStream(newStream);
                videoRef.current.srcObject = newStream;
                videoRef.current.play();
            })
            .catch(function (error) {
                console.error('Erreur lors de l\'accès à la caméra :', error);
            });
        }

        setStarting(!starting);
    }

    return (
        <div className='camsapp-container'>
            <p id='text-container'>surveillance stoppée</p>
            <video ref={videoRef} controls id='video' className='localstream-container'></video>
            <div className="start-button" id='start' onClick={handleClick}>
                {starting ? "arrêter" : "commencer"}
            </div>
        </div>
    )
}
