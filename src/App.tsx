import React, { useState, useEffect, MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';

interface HeartType {
  id: number;
  top: number;
  left: number;
  fontSize: number;
}

function App() {
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const [shadowOpacity, setShadowOpacity] = useState("0.2");

  const resetOpacity = () => {
    setShadowOpacity("0.2");
  }

  const randomBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const addHeart = (event: MouseEvent) => {
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
  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col gap-3">
      {/* <p className="text-4xl font-pacifico">Mariage de Tim et Phil</p> */}
      <div className="w-10/12 mx-auto">
        <p className="font-extrabold text-4xl">Mariage de</p>
        <p className="font-extrabold text-4xl">Phil et Tim</p>
        <p>Le samedi 14 juin 2025 à Loches</p>
      </div>

      <div className="w-10/12 mx-auto flex flex-col gap-3">
        <p className="font-extrabold text-3xl" id="#programme">programme</p>
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

      <div className="w-10/12 mx-auto">
      <p className="font-extrabold text-3xl" id="#RSVP">RSVP</p>
      </div>

      
      

      {/* don't put it too close to the right, otherwise the created
      hearts might create a scroll bar */}
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

    </div>
  );
}

export default App;
