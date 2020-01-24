import React from 'react';
import { Link } from 'react-router-dom';
import d20 from 'images/logo.svg';

export const Navigation: React.FC = () => {
  return (
    <header className="h-20 max-w-lg fixed bottom-0 w-full border-t-2 border-yellow-700 bg-secondary-dark sm:rounded-b-lg">
      <nav className="flex align-center items-center justify-between flex-wrap px-4">
        <Link to="/" className="p-4">
          <img src="https://icon.now.sh/home/24/fefcbf" alt="home" />
        </Link>
        <Link
          to="/roller"
          className="font-semibold text-xl tracking-tighter p-4"
        >
          <img src={d20} className="w-8" alt="logo" />
        </Link>
        <Link to="/info" className="p-4">
          <img src="https://icon.now.sh/info_outline/24/fefcbf" alt="info" />
        </Link>
      </nav>
    </header>
  );
};
