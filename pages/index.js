import Head from 'next/head';

import React, { useState, useEffect } from 'react';

import { birthstoneBounce, meddon } from '../pages/_app';
import Rsvp from '../components/rsvp.js';

import StrikeThroughDrawing from '../components/strikeThroughDrawing.js';

function Home() {

  return (
    <div className="min-h-screen mx-auto flex flex-col gap-3 font-light">
      <Head>
        <title>Tim et Phil</title>
        <link rel="icon" href="/engagement_pic_sm.png" />
      </Head>
    {/* <p className="text-4xl font-pacifico">Mariage de Tim et Phil</p> */}
    {/* hide overflow because picture is full height otherwise */}
    {/* <div className="relative w-full flex overflow-y-hidden min-h-[40vh] md:min-h-[70vh]">
      <img className="absolute inset-x-0 top-0 object-cover" src="/engagement_pic.JPG" alt="engagement" />
      <div className="relative text-white w-10/12 mx-auto my-auto flex flex-col gap-y-5">
        <p className={`text-4xl md:text-6xl ${birthstoneBounce.className}`}>Philippine</p>
        <p className={`text-3xl md:text-4xl ${birthstoneBounce.className}`}>et</p>
        <p className={`text-4xl md:text-6xl ${birthstoneBounce.className}`}>Timothy</p>
      </div>
    </div> */}
    <div className="relative w-full flex overflow-y-hidden py-5 sm:min-h-[70vh] bg-no-repeat bg-top bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/engagement_pic.JPG)', backgroundSize: '100%' }}>
      <div className="relative text-white w-10/12 mx-auto my-auto flex flex-col gap-y-5">
        <p className={`text-4xl md:text-6xl ${birthstoneBounce.className}`}>Philippine</p>
        <p className={`text-3xl md:text-4xl ${birthstoneBounce.className}`}>et</p>
        <p className={`text-4xl md:text-6xl ${birthstoneBounce.className}`}>Timothy</p>
      </div>
    </div>
    
    <div className="w-full md:w-1/3 mx-auto">
      <div className="flex flex-col gap-y-3 w-10/12 mx-auto">
      <p className="text-gray-600 text-center mr-3">le samedi 14 juin 2025</p>
      <Rsvp/>
      <Program />
      <Address />
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
    <div className="flex flex-col gap-3">
      <p className="text-2xl" id="#adresse">Adresse</p>
      <p>Château de Saint-Senoch</p>
    </div>
  )
}

const Registry = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl" id="#liste-de-mariage">Liste de mariage</p>
      <p>des jouets par milliers</p>
    </div>
  )
}

const Footer = () => {
  return (
    <p className="text-xs mx-auto sm:mr-10 sm:ml-auto mt-10 mb-2">
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
