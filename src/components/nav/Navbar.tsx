'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import MegaMenuPanel from './MegaMenuPanel';
import { menuData } from '@/data/menuData';

const NAV_ITEMS = [
  'SKIN CARE',
  'CLENSERS',
  'MOISTURIZORS',
  'SERUMS',
  'TONERS',
  'SUNSCREENS',
  'EYE & LIP CARE',
];

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);

  const handleEnter = (label: string) => {
    if (menuData[label]) {
      setActive(label);
    }
  };

  const handleLeave = () => setActive(null);

  return (
    <div className="hidden lg:block relative">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-black relative">
          {NAV_ITEMS.map((label) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => handleEnter(label)}
              onMouseLeave={handleLeave}
            >
              <Link className="navbar__link relative" href="#">
                {label}
              </Link>
              <MegaMenuPanel data={menuData[label]} isVisible={active === label} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
