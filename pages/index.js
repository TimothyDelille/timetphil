import Head from 'next/head';

import React, { useState, useEffect } from 'react';

import { birthstoneBounce, meddon } from '../pages/_app';
import Rsvp from '../components/rsvp.js';

function Home() {

  return (
    <div className="bg-[#F7F2F0] min-h-screen flex flex-col gap-3 font-light pb-10">
      <Head>
        <title>Tim et Phil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* <p className="text-4xl font-pacifico">Mariage de Tim et Phil</p> */}
    {/* hide overflow because picture is full height otherwise */}
    <div className="relative w-full overflow-y-hidden">
      <img className="absolute inset-x-0 top-0 object-cover" src="engagement_pic.jpg" alt="engagement" />
      <div className="relative text-white w-10/12 mx-auto flex flex-col gap-y-5 my-5">
        <p className={`text-4xl ${birthstoneBounce.className}`}>Philippine</p>
        <p className={`text-3xl ${birthstoneBounce.className}`}>et</p>
        <p className={`text-4xl ${birthstoneBounce.className}`}>Timothy</p>
      </div>
    </div>
    
    <div className="relative flex flex-row justify-center">
      <p className="text-sm text-gray-600 text-center mr-3">le samedi 14 juin 2025</p>
      <div className="absolute top-6 left-60 size-10 rotate-45 mt-1"><ArrowDrawing/></div>
    </div>
    <Rsvp/>
    <Program />
    <Address />
    <Registry />
    </div>
  )
}

const ArrowDrawing = () => {
  const stroke = "#ffc067";
  return (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94.06113603136941 95.60964287493192">
      <path d="M0.06 1.83 C7.33 6.23, 29.92 12.63, 41.7 24.54 C53.47 36.45, 66.56 65.03, 70.72 73.27 M-3.34 0.35 C4.97 5.23, 34.77 14.53, 46.99 27.13 C59.2 39.73, 66.78 67.71, 69.97 75.96" stroke={stroke} strokeWidth="4" fill="none"></path>
      <path d="M55.54 55.06 C56.41 62.45, 60.89 64.09, 69.94 75.15 M53.89 55.58 C59.25 63.7, 65.08 70.11, 70.31 75.9" stroke={stroke} stroke-width="4" fill="none"></path>
      <path d="M71.71 49.49 C68.77 58.19, 69.48 61.12, 69.94 75.15 M70.06 50.02 C69.72 60.22, 69.82 68.59, 70.31 75.9" stroke={stroke} stroke-width="4" fill="none"></path>
  </svg>
  )
}

const Program = () => {
  return (
    <div className="w-10/12 mx-auto flex flex-col gap-3">
      <p className="text-2xl" id="#programme">Programme</p>
      <ul>
        <li>14h30: Messe</li>
        <li>18h00: Réception au Château de Saint-Senoch</li>
        <li>20h00: Dîner</li>
        <li>22h00: party time</li>
      </ul>
      <p>Le dimanche 15 juin</p>
      <ul>
        <li>11h00: Brunch au Château de Saint-Senoch</li>
      </ul>

    </div>
  )
}

const Address = () => {
  return (
    <div className="w-10/12 mx-auto flex flex-col gap-3">
      <p className="text-2xl" id="#adresse">Adresse</p>
      <p>Château de Saint-Senoch</p>
    </div>
  )
}

const Registry = () => {
  return (
    <div className="w-10/12 mx-auto flex flex-col gap-3">
      <p className="text-2xl" id="#liste-de-mariage">Liste de mariage</p>
      <p>des jouets</p>
    </div>
  )
}

export default Home;
