import Head from 'next/head';

import React, { useState, useEffect } from 'react';

import { birthstoneBounce, meddon, bodoniModa, parisienne, dancingScript } from '../pages/_app';
import Rsvp from '../components/rsvp.js';

import StrikeThroughDrawing from '../components/strikeThroughDrawing.js';

function Home() {

  const titleFont = parisienne.className;

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
      <Registry />
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
        <p>
          <br/>
          La collégiale est dans la cité royale qui est piétonne, prévoyez un peu de temps pour vous garer et accéder à l'église. En cas de difficulté pour marcher prenez contact avec nous dès maintenant pour que nous organisions une solution.
        </p>
      </div>
      <div>
        <p><span className="font-bold">17h30:</span> Réception au Château de Saint-Senoch</p>
        <p>Adresse: <span className="italic">Château de Saint-Senoch, 37600 Varennes</span></p>
      </div>
    </div>
  )
}

const Registry = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className={`text-2xl ${bodoniModa.className}`} id="#liste">Liste de mariage</p>
      <div>
        <a className="relative w-fit" href="https://www.millemercismariage.com/timetphil/liste.html">
        Lien vers la liste
        <svg className="absolute -top-2 left-0 w-full" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-50 0 431.0260804572722 38.10914215347327" width="862.0521609145444" height="76.21828430694654">
        <path fill="#ffc067" d="M 0,-6.24 Q 0,-6.24 9.00,-6.11 18.01,-5.97 30.04,-5.87 42.06,-5.77 57.93,-5.70 73.79,-5.63 85.31,-5.58 96.83,-5.53 115.00,-5.49 133.18,-5.45 154.18,-5.42 175.18,-5.39 197.31,-5.37 219.44,-5.35 239.59,-5.34 259.75,-5.33 277.90,-5.31 296.05,-5.30 306.46,-5.30 316.86,-5.29 322.92,-5.71 328.97,-6.13 337.68,-6.01 346.39,-5.89 351.29,-6.34 356.19,-6.79 360.01,-7.35 363.83,-7.91 364.78,-7.79 365.73,-7.68 366.62,-7.34 367.51,-7.00 368.29,-6.46 369.08,-5.92 369.71,-5.20 370.34,-4.49 370.79,-3.65 371.23,-2.80 371.46,-1.87 371.69,-0.95 371.69,0.00 371.69,0.95 371.46,1.88 371.23,2.80 370.79,3.65 370.34,4.49 369.71,5.20 369.08,5.92 368.29,6.46 367.51,7.00 366.62,7.34 365.72,7.68 364.78,7.79 363.83,7.91 357.06,7.85 350.29,7.79 338.83,6.88 327.36,5.97 309.77,6.16 292.19,6.36 270.11,7.82 248.02,9.29 213.93,10.62 179.84,11.96 150.91,13.21 121.97,14.46 103.12,14.97 84.27,15.47 54.83,16.92 25.39,18.37 10.76,19.28 -3.86,20.18 -15.78,20.56 -27.70,20.94 -36.45,21.21 -45.20,21.49 -46.06,21.38 -46.92,21.27 -47.70,20.89 -48.48,20.51 -49.10,19.90 -49.72,19.29 -50.11,18.52 -50.50,17.74 -50.62,16.88 -50.74,16.02 -50.59,15.17 -50.43,14.32 -50.01,13.56 -49.59,12.80 -48.94,12.22 -48.30,11.64 -47.51,11.29 -46.71,10.94 -45.85,10.87 -44.99,10.79 -44.14,10.99 -43.30,11.20 -42.57,11.66 -41.83,12.12 -41.29,12.79 -40.74,13.47 -40.43,14.28 -40.13,15.09 -40.10,15.96 -40.07,16.82 -40.32,17.65 -40.57,18.48 -41.07,19.19 -41.57,19.90 -42.27,20.41 -42.97,20.92 -43.80,21.18 -44.63,21.44 -45.49,21.42 -46.36,21.40 -47.18,21.11 -47.99,20.82 -48.67,20.28 -49.35,19.74 -49.82,19.01 -50.29,18.28 -50.51,17.44 -50.72,16.60 -50.66,15.74 -50.59,14.87 -50.26,14.08 -49.92,13.28 -49.35,12.63 -48.77,11.98 -48.02,11.55 -47.27,11.12 -46.42,10.95 -45.57,10.78 -45.57,10.78 -45.57,10.78 -36.82,10.46 -28.07,10.15 -16.31,9.72 -4.56,9.30 10.13,8.31 24.83,7.33 54.38,5.77 83.93,4.21 102.68,3.57 121.43,2.92 150.38,1.48 179.33,0.03 213.21,-1.56 247.10,-3.15 269.48,-5.00 291.86,-6.85 309.96,-7.54 328.07,-8.23 339.18,-8.01 350.30,-7.79 357.06,-7.85 363.83,-7.91 364.78,-7.79 365.72,-7.68 366.62,-7.34 367.51,-7.00 368.29,-6.46 369.08,-5.92 369.71,-5.20 370.34,-4.49 370.79,-3.65 371.23,-2.80 371.46,-1.88 371.69,-0.95 371.69,-0.00 371.69,0.95 371.46,1.87 371.23,2.80 370.79,3.65 370.34,4.49 369.71,5.20 369.08,5.92 368.29,6.46 367.51,7.00 366.62,7.34 365.73,7.68 364.78,7.79 363.83,7.91 360.01,7.35 356.19,6.79 351.29,6.34 346.39,5.89 337.68,6.01 328.97,6.13 322.92,5.71 316.86,5.29 306.46,5.30 296.05,5.30 277.90,5.31 259.75,5.33 239.59,5.34 219.44,5.35 197.31,5.37 175.18,5.39 154.18,5.42 133.18,5.45 115.00,5.49 96.83,5.53 85.31,5.58 73.79,5.63 57.93,5.70 42.06,5.77 30.04,5.87 18.01,5.97 9.00,6.11 0,6.24 -0.74,6.15 -1.49,6.06 -2.19,5.80 -2.90,5.53 -3.52,5.10 -4.14,4.67 -4.64,4.11 -5.14,3.54 -5.49,2.88 -5.84,2.21 -6.02,1.48 -6.20,0.75 -6.20,-0.00 -6.20,-0.75 -6.02,-1.48 -5.84,-2.21 -5.49,-2.88 -5.14,-3.55 -4.64,-4.11 -4.14,-4.67 -3.52,-5.10 -2.90,-5.53 -2.19,-5.80 -1.49,-6.06 -0.74,-6.15 0.00,-6.24 0.00,-6.24 L 0,-6.24 Z"></path>
        </svg>
      </a>
      &nbsp;😇
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
