import React from 'react';

export const Footer: React.FC = () => (
  <footer className="flex justify-center bg-primary-dark dark:bg-black p-4">
    <div className="text-gray-700 text-center px-4 py-2 m-2">
      <a
        className="w-1/4 text-white"
        href="https://github.com/kimrejstrom/rr-starter-kit"
      >
        <svg
          data-icon="github"
          viewBox="0 0 32 32"
          className="fill-current opacity-75 h-6 w-6"
        >
          <title>github icon</title>
          <path d="M0 18 C0 12 3 10 3 9 C2.5 7 2.5 4 3 3 C6 3 9 5 10 6 C12 5 14 5 16 5 C18 5 20 5 22 6 C23 5 26 3 29 3 C29.5 4 29.5 7 29 9 C29 10 32 12 32 18 C32 25 30 30 16 30 C2 30 0 25 0 18 M3 20 C3 24 4 28 16 28 C28 28 29 24 29 20 C29 16 28 14 16 14 C4 14 3 16 3 20 M8 21 A1.5 2.5 0 0 0 13 21 A1.5 2.5 0 0 0 8 21 M24 21 A1.5 2.5 0 0 0 19 21 A1.5 2.5 0 0 0 24 21 z"></path>
        </svg>
      </a>
    </div>
    <div className="text-gray-700 text-center px-4 py-2 m-2">
      <div className="text-sm font-light">
        <a
          href="#TODO"
          className="m-2 opacity-75 text-yellow-300 hover:text-yellow-500"
        >
          Help
        </a>
        <a
          href="#TODO"
          className="m-2 opacity-75 text-yellow-300 hover:text-yellow-500"
        >
          Send feedback
        </a>
        <a
          href="#TODO"
          className="m-2 opacity-75 text-yellow-300 hover:text-yellow-500"
        >
          Privacy
        </a>
      </div>
    </div>
  </footer>
);
