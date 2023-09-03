import './VideoContainer.css';
import { useTrail, animated } from 'react-spring'
import { SurveillanceContext } from '../../../contexts/Context.js';
import React, { useContext } from 'react';
import NotFound from './NotFound.js';

function VideoContainer() {
    const { data, currentSalle, setCurrentSalle } = useContext(SurveillanceContext)

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
            {data.length >> 0 ? data.map((raspberry) => {
                if(raspberry.salle === currentSalle) {
                    return (
                        raspberry.src.map((source, index) => (
                            <animated.div className="item" key={source} style={trail[index]}>
                                <video controls>
                                    <source src={source} type={raspberry.type}></source>
                                </video>
                            </animated.div>
                        ))
                    )
                }
            }
        ) : <NotFound />}
        </div>
    )
}

export default VideoContainer;