import Head from 'next/head';

import React, { useState, useEffect } from 'react';

import { birthstoneBounce, meddon } from '../pages/_app';
import Rsvp from '../components/rsvp.js';

function Home() {

  return (
    <div className="bg-[#F7F2F0] min-h-screen flex flex-col gap-3">
      <Head>
        <title>Tim et Phil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* <p className="text-4xl font-pacifico">Mariage de Tim et Phil</p> */}
    <div className="w-10/12 mx-auto flex flex-col gap-y-5 mt-5">
      <p className={`text-4xl ${birthstoneBounce.className}`}>Philippine</p>
      <p className={`text-3xl ${birthstoneBounce.className}`}>et</p>
      <p className={`text-4xl ${birthstoneBounce.className}`}>Timothy</p>
    </div>

    <Rsvp/>

    <div className="w-10/12 mx-auto flex flex-col gap-3">
      <p className={`text-2xl ${birthstoneBounce.className}`} id="#programme">programme</p>
      <p className="text-xl">Messe</p>
      <p>16h00: Messe à l'église de Saint-Timothy-de-Delille</p>
      <p className="text-xl">Réception</p>
      <ul>
        <li>18h00: Réception au Château de Saint-Senoch</li>
        <li>20h00: Dîner</li>
        <li>22h00: Petite fiestouille!</li>
      </ul>
      <p>Le dimanche 15 juin</p>
      <ul>
        <li>11h00: Brunch au Château de Saint-Senoch</li>
      </ul>

    </div>
    </div>
  )
}

export default Home;
