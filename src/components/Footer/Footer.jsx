import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'About', to: '/about' },
    { name: 'Privacy', to: '/privacy' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm sm:text-base tracking-wide text-gray-500">
          © {currentYear} <span className="font-semibold text-gray-700">Mega Blog</span>. All rights reserved.
        </span>

        <div className="flex space-x-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
