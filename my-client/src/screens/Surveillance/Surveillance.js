import './Surveillance.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getPeer } from '../../socketClient/webrtcPeersList';

import { store } from '../../store/store';
import { getStreamOfPeer } from '../../socketClient/webrtcPeersList';

import IpContainer from '../../shared/components/IpContainer/IpContainer.js'
import VideoContainer from '../../shared/components/VideoContainer/VideoContainer.js'
import { render } from 'react-dom';

export default function Surveillance() {
    
    const [currentSalle, setCurrentSalle] = useState("")
    let [containerIds, setContainerIds] = useState([])

    //récupérer le state du reducer
    const salles = useSelector(state => state.webrtcReducer.salles)

    // const renderContainer = async (socketIdsList) => {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             //assigner dynamiquement les socketId aux containers id
    //             setContainerIds([...socketIdsList])

    //             // attendre un peu pour que le rendu des containers soient effectués
    //             setTimeout(resolve("success"), 2000)

    //         } catch (e) {
    //             reject(e)
    //         }
    //     })
    // }

    const callBackOnClick = async (salle) => {

        // let socketIdList = []

        // salles.forEach(element => {
        //     if(element.salle === salle) {
        //         element.socketId.forEach(socket => {
        //             socketIdList.push(socket)
        //         })
        //     }
        // });

        // renderContainer(socketIdList)
        // .then(res => {
        //     //récupérer le stream puis afficher
        //     socketIdList.forEach(socket => {
        //        let stream = getStreamOfPeer(socket)
        //        const video = document.querySelector(`#${socket}`)
        //        video.srcObject = stream;
        //     })
    
            setCurrentSalle(salle);

            let peer = null;
            let video = null;

            salles.forEach(element => {
                if(element.salle === salle) {
                    element.socketId.forEach( id => {
                        video = document.getElementById(id)
                        video.play()
                    })
                }
            })
        // })
        // .catch( err => {
        //     console.log(err)
        // }

        // )
    }

    return (
        <>
        <section className="surveillance-section" style={{ display: 'flex', position: 'relative' }}>
            <IpContainer currentSalle={currentSalle} callBackOnClick={callBackOnClick}/>
            <VideoContainer currentSalle={currentSalle} containerIds={containerIds}/>
            {/* <video id="stream-container" className='cam-stream' autoPlay={true} muted="muted"></video> */}
        </section >
        </>
    )
}