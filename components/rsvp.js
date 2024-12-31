import React, { useState, useEffect } from 'react';

import ArrowDrawing from './arrowDrawing';
import { birthstoneBounce, meddon, bodoniModa } from '../pages/_app';

export default function Rsvp() {
    const [query, setQuery] = useState("");
    const [guests, setGuests] = useState([]);
    const [filteredGuests, setFilteredGuests] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);

    // Load all guests on component mount
    const loadGuests = async () => {
      fetch('/api/getAllGuests')
      .then(response => response.json())
      .then(data => {
        if (data.guests) {
          setGuests(data.guests);
        } else if (data.message) {
          console.error('Error fetching guests:', data.message);
        }
      })
      .catch(error => console.error('Error fetching guests:', error));
    }
  
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

    // Select the first guest when 'Enter' is pressed
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (filteredGuests.length > 0) {
          selectGuest(filteredGuests[0]);
        }
      }
    };
    
    const handleCloseModal = () => {
      setSelectedGuest(null);
      setQuery("");
    }

    const handleOnFocus = async () => {
      await loadGuests();
      setIsDropdownOpen(true);
    }

    const handleOnBlur = () => {
      setIsDropdownOpen(false);
    }
    return (
      <div>
        <p className={`text-2xl mb-2 ${bodoniModa.className}`} id="#RSVP">RSVP</p>
        <div className="relative">
          <div className="absolute -top-8 md:-top-10 right-10 size-12 md:size-16 rotate-45 mt-1"><ArrowDrawing/></div>
        </div>
        <div className="relative" onKeyPress={handleKeyPress} onBlur={handleOnBlur}>
          <div className="px-2 py-1 flex flex-row gap-x-2 border border-neutral-300 focus:border-orange-100 rounded-md w-full mx-auto">
          <input
            id="rsvp-input"
            // outline-none prevents the blue ring when the input is in focus.
            className='bg-transparent outline-none w-full'
            type="text"
            placeholder="e.g. Jensen Huang"
            onChange={search}
            // why not use useEffect instead? if I rsvp in the modal, close it
            // and search for my name again, i want to see the updated value.
            onFocus={handleOnFocus}
            value={query}
          />

          <button
            onClick={() => {setQuery(""); setFilteredGuests([]);}}
            className="text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          </div>
          
          {/* guests dropdown */}
          { <Dropdown guests={filteredGuests} selectGuest={selectGuest} /> }
          {selectedGuest && <RsvpModal selectedGuest={selectedGuest} closeFunction={handleCloseModal}/>}
        </div>
      </div>
    );
  }

const Dropdown = ({ guests, selectGuest }) => {
  if (!(guests.length > 0 )) {
    return <></>
  }

  return (
    <div
    className="absolute w-full mt-1 bg-white border rounded-md shadow-lg overflow-y-auto max-h-40"
    onTouchStart={(e) => {
      // Prevent input from maintaining focus when touching the dropdown
      document.getElementById('rsvp-input').blur();
    }}
    >
        {guests.map(guest => (
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
  )
}

const RsvpModal = ({ selectedGuest, closeFunction }) => {
  const [loading, setLoading] = useState(false);
  const [rsvp, setLocalRsvp] = useState(selectedGuest?.rsvp);

  if (!selectedGuest) { 
    return <></>
  }

  const setRsvp = async (id, rsvp) => {
    try {
      const response = await fetch('/api/setSingleGuestRsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          rsvp: rsvp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating RSVP:', error.message);
      throw error;
    }
  }

  const handleRsvp = async (rsvp) => {
    setLoading(true);
    // simulate timeout
    setTimeout(
      () => {null},
      1000
    );

    try {
      await setRsvp(selectedGuest?.id, rsvp); 
      setLocalRsvp(rsvp);
    } catch (error) {
      console.error('Error updating RSVP:', error.message);
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-5/6 md:w-1/4 mt-5 mb-auto flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="text-lg font-light">{selectedGuest.name}</p>
          <button
            onClick={closeFunction}
            className="text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-center mt-5 flex flex-col h-full justify-center items-center">
          {
            loading && <div className="flex justify-center"><LoadSpinner/></div>
          }

          {/* Missing RSPV */}
          { !loading && rsvp === null &&
          <>
            <p className="text-lg font-light">Aucune réponse 🤷</p>
            <div className="flex flex-row gap-x-3">
              <ButtonYes handleRsvp={handleRsvp} />
              <ButtonNo handleRsvp={handleRsvp} />
            </div>
          </>
          }
          
          { !loading && rsvp &&
          <>
          <p className="text-xl">Présence confirmée! 🥳</p>
          <p className="mt-5 text-start text-gray-600">Changement de plan ?</p>
          <div className="flex flex-row gap-x-3">
            <ButtonNo handleRsvp={handleRsvp} />
            <ButtonNull handleRsvp={handleRsvp} />
          </div>
          </>
          }

          { !loading && rsvp === false &&
            <>
            <p className="text-xl">Absence confirmée 😢</p>
            <p className="mt-5 text-start text-gray-600">Changement de plan ?</p>
            <div className="flex flex-row gap-x-3">
              <ButtonYes handleRsvp={handleRsvp} />
              <ButtonNull handleRsvp={handleRsvp} />
            </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

const ButtonYes = ({ handleRsvp }) => {
  return (
    <button
      className="bg-green-100 hover:bg-green-200 border border-green-700 text-sm text-green-700 px-2 py-2 rounded-md mt-4"
      onClick={() => handleRsvp(true)}
    >
      Je viens
    </button>
  )
}

const ButtonNo = ({ handleRsvp }) => {
  return (
    <button
      className="bg-red-100 hover:bg-red-200 border border-red-700 text-sm text-red-700 px-2 py-2 rounded-md mt-4"
      onClick={() => handleRsvp(false)}
    >
      Je ne viens pas
    </button>
  )
}

const ButtonNull = ({ handleRsvp }) => {
  return (
    <button
      className="bg-neutral-100 hover:bg-neutral-200 border border-neutral-700 text-sm text-neutral-700 px-2 py-2 rounded-md mt-4"
      onClick={() => handleRsvp(null)}
    >
      Je ne sais pas encore
    </button>
  )
}

const LoadSpinner = () => {
  return (
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  )
}