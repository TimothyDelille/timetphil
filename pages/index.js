import Head from 'next/head';
import { meddon } from '../pages/_app';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

function Home() {

  return (
    <div className="bg-[#F7F2F0] min-h-screen flex flex-col gap-3">
      <Head>
        <title>Tim et Phil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* <p className="text-4xl font-pacifico">Mariage de Tim et Phil</p> */}
    <div className="w-10/12 mx-auto flex flex-col gap-y-5 mt-5">
      <p className={`text-4xl ${meddon.className}`}>Philippine</p>
      <p className={`text-3xl ${meddon.className}`}>et</p>
      <p className={`text-4xl ${meddon.className}`}>Timothy</p>
    </div>

    <Rsvp/>

    <div className="w-10/12 mx-auto flex flex-col gap-3">
      <p className={`text-2xl ${meddon.className}`} id="#programme">programme</p>
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

function Rsvp() {
  const [query, setQuery] = useState("");
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Load all guests on component mount
  useEffect(() => {
    fetch('/api/getAllGuests')
      .then(response => response.json())
      .then(data => {
        if (data.guests) {
          setGuests(data.guests);
          setFilteredGuests(data.guests);
        } else if (data.message) {
          console.error('Error fetching guests:', data.message);
        }
      })
      .catch(error => console.error('Error fetching guests:', error));
  }, []);

  // Filter guests on query change
  const search = (event) => {
    const query = event.target.value;
    setQuery(query);
    
    if (query.trim() === '') {
      setFilteredGuests([]);
      return;
    }

    // Simple contains search.
    const filtered = guests.filter(guest => 
      guest.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGuests(filtered);
  };

  // When user selects their name
  const selectGuest = async (selectedGuest) => {
    // Fetch latest RSVP status for the selected guest.
    const response = await fetch(`/api/getSingleGuest?id=${selectedGuest.id}`);
    const { guest, message } = await response.json();
    
    if (guest) {
      setSelectedGuest({ ...selectedGuest, rsvp: guest.rsvp });
      setQuery(guest.name);
      setFilteredGuests([]);
    } else {
      console.error('Error fetching guest:', message);
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <p className="text-2xl" id="#RSVP">RSVP</p>
      <div className="relative">
        <input
          className='bg-transparent border border-neutral-300 rounded-md px-2 py-1 w-full'
          type="text"
          placeholder="e.g. Jensen Huang"
          onChange={search}
          value={query}
        />
        
        {/* Suggestions dropdown */}
        {filteredGuests.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg overflow-y-auto max-h-40">
            {filteredGuests.map(guest => (
              <div
                key={guest.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex flex-row items-center justify-between"
                onClick={() => selectGuest(guest)}
              >
                <span>{guest.name}</span>
                <span className="text-sm text-gray-500">
                  {guest.rsvp === null ? '🤷' : 
                   guest.rsvp ? '✅' : '❌'}
                </span>
              </div>
            ))}
          </div>
        )}

      {selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-sm">
            <button
              onClick={() => setSelectedGuest(null)}
              className="m-4 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">RSVP Status</h2>
              <p>{selectedGuest.name}</p>
              <p>{selectedGuest.rsvp ? 'Attending' : 'Not Attending'}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

function Hearts() {
  const [hearts, setHearts] = useState([]);
  const [shadowOpacity, setShadowOpacity] = useState("0.2");

  const resetOpacity = () => {
    setShadowOpacity("0.2");
  }

  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const addHeart = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const w = buttonRect.width;
    const newHeart = {
      id: Date.now(),
      top: Number(buttonRect.top - buttonRect.height / 2),
      left: Number(buttonRect.left) + randomBetween(-w/2, w/2),
      // left: randomBetween(0, window.innerWidth),
      fontSize: randomBetween(25, 50),
    };
    setHearts([...hearts, newHeart]);
    setShadowOpacity("0");

    // Remove the heart before the hand of the animation.
    // Otherwise there is a flicker.
    setTimeout(() => {
      setHearts((hearts) => hearts.filter((heart) => heart.id !== newHeart.id));
    }, 2500);
  };

  {/* don't put it too close to the right, otherwise the created
      hearts might create a scroll bar */}
  return (
      <div className="mr-10 ml-auto">
      <button 
        onPointerDown={addHeart}
        onPointerUp={resetOpacity}
        className="text-2xl mx-auto rounded-full h-10 w-10 -rotate-12"
        style={{boxShadow: `1px 3px 1px 1px rgb(0 0 0 / ${shadowOpacity})`}}
      >💗</button>
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="heart"
            style={{ left: heart.left, top:heart.top, fontSize: `${heart.fontSize}px` }}
          >💗</span>
        ))}
      </div>
  );
}

export default Home;
