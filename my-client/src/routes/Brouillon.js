import React from 'react';
import "./Brouillon.css"
import IpContainer from '../shared/components/brouillon/IpContainer';
import VideoContainer from '../shared/components/brouillon/VideoContainer';

export default function Brouillon() {
  return (
    <>
    <section className="surveillance-section" style={{ display: 'flex', position: 'relative' }}>
      <IpContainer/>
      <VideoContainer/>
    </section>
    </>
  )
}
