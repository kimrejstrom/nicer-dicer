import React from 'react';
import d20 from 'images/logo.svg';

export const Loading: React.FC = () => (
  <div className="fixed bg-primary-dark w-full h-full top-0 left-0 flex flex-col items-center justify-center">
    <img src={d20} className="w-12 px-2 py-2 shape-shadow" alt="logo" />
    <h1 className="text-center mb-6">Nicer Dicer</h1>
    <div className="spin spinner"></div>
  </div>
);
