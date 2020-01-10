import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import d20 from 'pages/Home/d20.svg';

export const Header: React.FC = () => {
  // Open mobile menu open
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed bottom-0 w-full border-t-2 border-yellow-700 bg-white bg-secondary-dark">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-yellow-200 mr-6">
          <img src={d20} className="w-8 pr-2" alt="logo" />
          <Link to="/" className="font-semibold text-xl tracking-tighter">
            Nicer Dicer
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-200 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            open ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm font-medium lg:flex-grow">
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-yellow-100 text-yellow-400 mr-4"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-yellow-900 text-yellow-100 text-yellow-400"
            >
              About
            </Link>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 hover:text-yellow-900 text-yellow-100 text-yellow-400 mr-4"></div>
        </div>
      </nav>
    </header>
  );
};
