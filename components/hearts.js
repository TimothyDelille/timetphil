import { useState } from "react";

export default function Hearts() {
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