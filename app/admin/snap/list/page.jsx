'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Settings, Trash } from 'lucide-react';

const Page = () => {

  const [snaps, setSnaps] = useState([]);

  const deleteHandler = async (id) => { // Pass id directly, no need for object destructuring
    try {
      const response = await fetch('/api/snap', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      // Assuming successful deletion, filter out the deleted snap
      if (response.ok) {
        setSnaps(prevSnaps => prevSnaps.filter(snap => snap._id !== id));
      } else {
        console.error('Failed to delete the snap');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/snap');
        const data = await response.json();
        setSnaps(data.snaps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-3 p-3'>
      {
        snaps.map((snap) => (
          <div key={snap._id} className='flex justify-around items-center'>
            <Image className='cursor-pointer h-32 w-32 object-contain' src={snap.image} alt={snap.name} width={100} height={100} />
            <p>{snap.name}</p>

            <div className="flex gap-3 items-center">
              <Button variant="outline"><Settings /></Button>
              <Button onClick={() => deleteHandler(snap._id)} variant="outline"><Trash /></Button> {/* Pass id directly */}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Page;