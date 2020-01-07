import React from 'react';
import headerImage from 'pages/Home/header.svg';
import { PresetFeature } from 'features/presets/PresetFeature';
import { RollInput } from 'features/rollInput/RollInput';

export const Home: React.FC = () => (
  <div className="container mx-auto">
    <img src={headerImage} className="w-2/3 m-auto pt-10 pb-10" alt="logo" />
    <h1 className="text-center">DnD Dice Roller</h1>
    <RollInput />
    <PresetFeature />
  </div>
);
