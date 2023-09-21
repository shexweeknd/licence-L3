import './VideoContainer.css';
import { useTrail, animated } from 'react-spring';
import React from 'react';
import NotFound from './NotFound.js';


import { v4 as uuidv4 } from 'uuid';

function VideoContainer({currentSalle, containerIds}) {

    //animation
    const trail = useTrail(4, {
            from: {
                opacity:0,
                x: 20,
                y: 20
            },
            to: {
                opacity: 1,
                x: 0,
                y:0
            }
        })

    return (
        <div className="videos-container">
            {containerIds.length >> 0 ? 
                containerIds.map((socket, index) => (
                    <animated.div className="item" key={uuidv4()} style={trail[index]}>
                        <video id={socket}>
                        </video>
                    </animated.div>    
                )): <NotFound/>
            }
        </div>
    )
}

export default VideoContainer;