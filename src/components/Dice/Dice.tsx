import React from 'react';
import d20 from 'images/d20.svg';
import d12 from 'images/d12.svg';
import d10 from 'images/d10.svg';
import d8 from 'images/d8.svg';
import d6 from 'images/d6.svg';
import d4 from 'images/d4.svg';

export const Dice: React.FC = () => {
  return (
    <div className="flex align-center items-center justify-between mx-auto mb-4">
      <img src={d4} className="w-10 px-2 py-2" alt="logo" />
      <img src={d6} className="w-10 px-2 py-2" alt="logo" />
      <img src={d8} className="w-10 px-2 py-2" alt="logo" />
      <img src={d10} className="w-10 px-2 py-2" alt="logo" />
      <img src={d12} className="w-10 px-2 py-2" alt="logo" />
      <img src={d20} className="w-10 px-2 py-2" alt="logo" />
    </div>
  );
};
