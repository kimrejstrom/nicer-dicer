import React from 'react';
import d20 from 'images/d20.svg';

export const Header: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <div className="w-full absolute top-0 h-1 bg-yellow-700"></div>
        <h1 className="text-center mt-4 mr-12">Nicer</h1>
        <div className="absolute arrow-down shape-shadow"></div>
        <img
          src={d20}
          className="absolute top-0 w-12 px-2 py-2 shape-shadow"
          alt="logo"
        />
        <h1 className="text-center mt-4 ml-12">Dicer</h1>
      </div>
    </div>
  );
};
