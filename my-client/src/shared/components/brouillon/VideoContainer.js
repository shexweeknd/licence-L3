import './VideoContainer.css';
import { useTrail, animated } from 'react-spring'
import { SurveillanceContext } from '../../../contexts/Context.js';
import React, { useContext } from 'react';
import Cam1 from './videos/cam1.webm';
import Cam2 from './videos/cam2.webm';
import Cam3 from './videos/cam3.webm';
import Cam4 from './videos/cam4.webm';

function VideoContainer() {

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
            <animated.div className="item" style={trail[0]}>
                <video controls autoPlay>
                    <source src={Cam1} type="video/webm"/>
                </video>
            </animated.div>

            <animated.div className="item" style={trail[1]}>
                <video controls autoPlay>
                    <source src={Cam2} type="video/webm"/>
                </video>
            </animated.div>

            <animated.div className="item" style={trail[2]}>
                <video controls autoPlay>
                    <source src={Cam3} type="video/webm"/>
                </video>
            </animated.div>

            <animated.div className="item" style={trail[3]}>
                <video controls autoPlay>
                    <source src={Cam4} type="video/webm"/>
                </video>
            </animated.div>

        </div>
    )
}

export default VideoContainer;