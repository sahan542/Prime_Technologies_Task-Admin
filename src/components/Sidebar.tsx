import React from 'react';
import Link from 'next/link'; // For next.js routing

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const links = [
    { id: 1, label: 'Dashboard', href: '/' },
    { id: 5, label: 'Users', href: '/users' },
    { id: 2, label: 'Orders', href: '/orders' },
    { id: 3, label: 'Products', href: '/products' },
    { id: 4, label: 'QnA', href: '/qna' },
    { id: 6, label: 'Reviews', href: '/reviews' },
    { id: 7, label: 'Notifications', href: '/notifications' },

  ];

return (
    <div className={`sidebar ${className} mt-[60px] flex items-center justify-center`}>
      <ul className="space-y-4">
        {links.map((link) => (
          <li
            key={link.id}
            className="py-2 px-12 bg-white border border-[#7b1f4b] hover:bg-[#7b1f4b]/80 rounded-lg transition-colors duration-200"
          >
            <Link
              href={link.href}
              className="block text-xl text-[#7b1f4b] hover:text-white px-4 py-2 rounded transition-colors duration-200"
            >
            <b>
              {link.label}
            </b>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Sidebar;
