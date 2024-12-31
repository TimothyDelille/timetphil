import Head from 'next/head';

import React, { useState, useEffect } from 'react';

import { birthstoneBounce, meddon, bodoniModa, parisienne, dancingScript } from '../pages/_app';
import Rsvp from '../components/rsvp.js';

import StrikeThroughDrawing from '../components/strikeThroughDrawing.js';

function Home() {

  const titleFont = parisienne.className;
  // const titleFont = bodoniModa.className;

  return (
    <div className="min-h-screen mx-auto flex flex-col gap-3 font-light">
      <Head>
        <title>Tim et Phil</title>
        <link rel="icon" href="/engagement_pic_sm.png" />
      </Head>

    {/* hide overflow because picture is full height otherwise */}
    {/* <div className="relative w-full flex overflow-y-hidden min-h-[40vh] md:min-h-[70vh]">
      <img className="absolute inset-x-0 top-0 object-cover" src="/engagement_pic.JPG" alt="engagement" />
      <div className="relative text-white w-10/12 mx-auto my-auto flex flex-col gap-y-5">
        <p className={`text-4xl md:text-6xl ${birthstoneBounce.className}`}>Philippine</p>
        <p className={`text-3xl md:text-4xl ${birthstoneBounce.className}`}>et</p>
        <p className={`text-4xl md:text-6xl ${birthstoneBounce.className}`}>Timothy</p>
      </div>
    </div> */}
    {/* not enabling parallax for small screens (`bg-fixed`) because it renders poorly on mobile... */}
    <div className="relative w-full flex overflow-y-hidden py-5 sm:min-h-[70vh] bg-no-repeat bg-top bg-cover bg-center bg-local md:bg-fixed" style={{ backgroundImage: 'url(/engagement_pic.JPG)', backgroundSize: '100%' }}>
      <div className="relative text-white w-10/12 mx-auto my-auto flex flex-col gap-y-1 md:gap-y-5 text-[#F7F2F0]">
        {/* <p className={`text-4xl md:text-6xl font-thin ${bodoniModa.className}`}>Whereas recognition</p> */}
        <p className={`text-3xl md:text-7xl ${titleFont}`}>Philippine</p>
        <p className={`text-2xl md:text-6xl ${titleFont}`}>&</p>
        <p className={`text-3xl md:text-7xl ${titleFont}`}>Timothy</p>
      </div>
    </div>
    
    <div className="w-full md:w-1/3 mx-auto">
      <div className="flex flex-col gap-y-3 w-10/12 mx-auto">
      <p className={`text-gray-700 text-md text-left mr-3`}>Le samedi 14 juin 2025</p>
      <Rsvp/>
      <Program />
      </div>
    </div>
    <Footer />
    </div>
  )
}

const Program = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className={`text-2xl ${bodoniModa.className}`} id="#programme">Programme</p>
      <div>
        <p><span className="font-bold">14h30:</span> Messe à la Collégiale Saint-Ours de Loches</p>
        <p>Adresse: <span className="italic">2 Rue Thomas Pactius, 37600 Loches</span></p>
      </div>
      <div>
        <p><span className="font-bold">17h30:</span> Réception au Château de Saint-Senoch</p>
        <p>Adresse: <span className="italic">Château de Saint-Senoch, 37600 Varennes</span></p>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <p className="text-xs mx-auto mt-10 mb-2">
      Designed by&nbsp;
      <span className="relative inline-block">Apple
        <span
        className="absolute -top-3.5 -left-1"
        >
          <StrikeThroughDrawing/>
        </span>
      </span>
      &nbsp;<a href="https://timothydelille.com" className="text-decoration-none">tim</a> in California.
    </p>
  )
}

export default Home;
