import React from 'react';
import d20 from 'images/logo.svg';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center border-t-4 border-yellow-700 sm:rounded-t-lg">
        <h1 className="text-center mt-4 mr-6">Nicer</h1>
        <div className="absolute arrow-down shape-shadow"></div>
        <Link className="w-12" to="/roller">
          <img
            src={d20}
            className="absolute top-0 w-12 px-2 py-2 shape-shadow"
            alt="logo"
          />
        </Link>
        <h1 className="text-center mt-4 ml-6">Dicer</h1>
      </div>
    </div>
  );
};
