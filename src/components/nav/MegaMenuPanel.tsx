'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Category = { label: string; href: string };
type Props = {
  data: {
    title: string;
    categories: Category[];
    images: string[];
  };
  isVisible: boolean;
};

const MegaMenuPanel: React.FC<Props> = ({ data, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 w-[400px] bg-white shadow-lg z-40 py-6 px-10 flex gap-12 border-t border-[#7b1f4b] mt-[25px] rounded-[20px]">
      <div className="flex flex-col min-w-[400px]">
        <h3 className="font-bold text-[#7b1f4b] mb-2">{data.title}</h3>
        {data.categories.map((cat, i) => (
          <Link key={i} href={cat.href} className="text-sm py-1 text-gray-700 hover:underline">
            {cat.label}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={60}
            height={40}
            className="rounded-md object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default MegaMenuPanel;
