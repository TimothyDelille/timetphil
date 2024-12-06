import React, { useState, useEffect } from 'react';

export default function Rsvp() {
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

    // Select the first guest when 'Enter' is pressed
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (filteredGuests.length > 0) {
          selectGuest(filteredGuests[0]);
        }
      }
    };
  
    return (
      <div className="w-10/12 mx-auto">
        <p className={"text-2xl"} id="#RSVP">RSVP</p>
        <div className="relative" onKeyPress={handleKeyPress}>
          <input
            className='bg-transparent border border-neutral-300 rounded-md px-2 py-1 w-full'
            type="text"
            placeholder="e.g. Jensen Huang"
            onChange={search}
            value={query}
          />
          
          {/* guests dropdown */}
          <Dropdown guests={filteredGuests} selectGuest={selectGuest} />
          {selectedGuest && <RsvpModal selectedGuest={selectedGuest} closeFunction={() => setSelectedGuest(null)}/>}
        </div>
      </div>
    );
  }

const Dropdown = ({ guests, selectGuest }) => {
  if (!(guests.length > 0 )) {
    return <></>
  }

  return (
    <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg overflow-y-auto max-h-40">
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

  // const fetchRsvp = async () => {
  //   const response = await fetch(`/api/getSingleGuest?id=${selectedGuest.id}`);
  //   const { guest, message } = await response.json();

  //   if (guest) {
  //     return guest.rsvp;
  //   } else {
  //     console.error('Error fetching guest:', message);
  //   }
  //   return null;
  // }

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
      <div className="bg-white rounded-lg p-4 w-5/6 mt-5 mb-auto flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="text-lg font-semibold">{selectedGuest.name}</p>
          <button
            onClick={closeFunction}
            className="text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-center mt-5">
          {/* <h2 className="text-lg font-semibold mb-2">RSVP Status</h2> */}
          {
            loading && <div className="flex justify-center"><LoadSpinner/></div>
          }

          {/* Missing RSPV */}
          { !loading && rsvp === null &&
          <>
          <p className="text-xl">Aucune réponse 🤷</p>
          <div className="flex flex-row justify-around">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => handleRsvp(true)}
            >
              Je viens
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => handleRsvp(false)}
            >
              Je ne viens pas
            </button>
          </div>
          </>
          }

          
          { !loading && rsvp &&
          <>
          <p className="text-xl">Présence confirmée! 🥳</p>
          <p className="mt-5 text-start text-gray-600">Changement de plan ?</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => handleRsvp(false)}
          >
            Je ne viens plus
          </button>
          </>
          }

          { !loading && rsvp === false &&
            <>
            <p className="text-xl">Absence confirmée 😢</p>
            <p className="mt-5 text-start text-gray-600">Changement de plan ?</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => handleRsvp(true)}
            >
              Je viens
            </button>
            </>
          }
        </div>
      </div>
    </div>
  )
}

const LoadSpinner = () => {
  return (
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  )
}