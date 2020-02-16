import React from 'react';
import { Link } from 'react-router-dom';
import { Dice } from 'components/Dice/Dice';
import { useServiceWorker, IServiceWorkerContext } from 'useServiceWorker';

export const Home: React.FC = () => {
  const { updateAssets } = useServiceWorker() as IServiceWorkerContext;
  return (
    <div className="container mx-auto mt-8 max-w-xs pt-4">
      <div className="text-center">
        <div className="text-white text-xl pb-4">
          The Ultimate RPG Dice Roller
        </div>
        <Dice />
        <p className="mx-auto w-full mb-6">
          The dice roller is very easy to use, simply type in your roll in the
          box and press enter. <br />
          Nicer Dicer has support for a wide array of dice mechanics. For the
          complete list of available commands, visit the{' '}
          <Link className="text-yellow-500" to="/info">
            Help
          </Link>{' '}
          page.
        </p>
        <Link
          to="roller"
          className="bg-transparent text-lg text-yellow-200 py-2 px-4 border border-yellow-700 rounded"
        >
          Get Started
        </Link>
        <div className="m-6"></div>
        <Dice />
        <button className="block mx-auto mt-8" onClick={updateAssets}>
          <svg
            className="inline-block fill-current h-4 w-4 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M6 18.7V21a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H7.1A7 7 0 0 0 19 12a1 1 0 1 1 2 0 9 9 0 0 1-15 6.7zM18 5.3V3a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h2.9A7 7 0 0 0 5 12a1 1 0 1 1-2 0 9 9 0 0 1 15-6.7z" />
          </svg>
          Check for updates
        </button>
        <div className="w-full mb-12 mt-24 font-sans text-sm">
          <div className="flex justify-around">
            <Link to="/about">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 fill-current text-white mr-2"
                width="24"
                height="24"
              >
                <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              About the project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
