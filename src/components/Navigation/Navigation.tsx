import React from 'react';
import { Link } from 'react-router-dom';
import d20 from 'images/logo.svg';

export const Navigation: React.FC = () => {
  return (
    <header className="h-20 max-w-lg fixed bottom-0 w-full border-t-2 border-yellow-700 bg-secondary-dark sm:rounded-b-lg">
      <nav className="flex align-center items-center justify-between flex-wrap px-4">
        <Link to="/" className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
        <Link
          to="/roller"
          className="font-semibold text-xl tracking-tighter p-4"
        >
          <img src={d20} className="w-8" alt="logo" />
        </Link>
        <Link to="/info" className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </nav>
    </header>
  );
};
