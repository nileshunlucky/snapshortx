'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Snaps = () => {
  const [snaps, setSnaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnaps = async () => {
      try {
        const res = await fetch('/api/snap');
        const data = await res.json();
        setSnaps(data.snaps || []);
      } catch (error) {
        console.error('Error fetching snaps:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching is done
      }
    };

    fetchSnaps();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-[2px] md:w-2/4 w-full mx-auto">
        {loading
          ? // Show skeleton placeholders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[250px] md:h-[400px] w-full bg-gray-200"
              />
            ))
          : // Render snaps after loading is complete
            [...snaps].reverse().map((snap) => ( // Reverse the array here
              <div key={snap._id}>
                <a href={snap.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    className="cursor-pointer object-cover h-[250px] md:h-[400px]"
                    src={snap.image}
                    alt={snap.name}
                    width={300}
                    height={300}
                  />
                </a>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Snaps;
