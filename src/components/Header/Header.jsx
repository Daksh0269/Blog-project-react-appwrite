import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from '../Button';
import LogoutButton from './LogoutButton';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Posts', slug: '/', show: true },
    { name: 'SavedPosts', slug: '/post/saved', show: authStatus },
    { name: 'Add', slug: '/add-post', show: authStatus },
    { name: 'Login', slug: '/login', show: !authStatus },
    { name: 'Signup', slug: '/signup', show: !authStatus },
  ];

  const isActive = (slug) => location.pathname === slug;

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-white text-gray-900 shadow-sm border-b border-gray-200 w-full relative z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <motion.h1
          onClick={() => navigate('/')}
          className="
    text-xl sm:text-2xl font-extrabold cursor-pointer
    bg-gradient-to-r from-black via-black to-black
    text-transparent bg-clip-text tracking-tight
    transition-transform duration-300 hover:scale-105
  "
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Nerdled
        </motion.h1>

        {/* Hamburger Button (mobile only) */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex items-center space-x-3 sm:space-x-5">
          {navItems.filter(item => item.show).map((item, index) => (
            <motion.li
              key={item.slug}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                onClick={() => navigate(item.slug)}
                textColor={isActive(item.slug) ? 'text-white' : 'text-blue-700'}
                bgColor={isActive(item.slug) ? 'bg-blue-600' : 'bg-transparent'}
                hoverColor={
                  isActive(item.slug)
                    ? ''
                    : 'hover:bg-blue-50 hover:text-blue-800'
                }
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${isActive(item.slug) ? 'shadow-sm' : 'border border-transparent'
                  }`}
              >
                {item.name}
              </Button>
            </motion.li>
          ))}
        </ul>

        <div className="hidden sm:block">
          <LogoutButton />
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <ul className="flex flex-col px-4 py-2 space-y-2">
              {navItems.filter(item => item.show).map((item) => (
                <li key={item.slug}>
                  <Button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    textColor={isActive(item.slug) ? 'text-white' : 'text-blue-700'}
                    bgColor={isActive(item.slug) ? 'bg-blue-600' : 'bg-transparent'}
                    hoverColor={
                      isActive(item.slug)
                        ? ''
                        : 'hover:bg-blue-50 hover:text-blue-800'
                    }
                    className="w-full text-left px-4 py-2 text-sm rounded-md"
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
