import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.svg';
import google from 'images/google.svg';
import ios from 'images/ios.svg';

export const About: React.FC = () => (
  <div className="container mx-auto mt-8 max-w-xs pt-4">
    <div className="text-center text-white font-sans">
      <img
        src={logo}
        className="m-auto rounded-lg bg-secondary-dark w-24 p-4 shape-shadow"
        alt="logo"
      />
      <p className="mx-auto w-full m-6">
        This is an open source, mobile-first dice roller project built using
        React and Typescript. See{' '}
        <a
          href="https://github.com/kimrejstrom/nicer-dicer"
          target="_blank"
          className="underline hover:text-yellow-200"
          rel="noopener noreferrer"
        >
          Github
        </a>{' '}
        for details.
      </p>
      <p>
        It is a fully fledged Progressive Web App (PWA) and can thus be added to
        your phone's homescreen as a fully functioning offline app.
      </p>
      <div className="mt-6 font-bold">Available soon on:</div>
      <div className="flex items-center justify-center mt-2">
        <img src={google} className="h-12 p-1" alt="google" />
        <img src={ios} className="h-12 p-1" alt="ios" />
      </div>
      <div className="w-full mb-12 mt-24 font-sans text-sm">
        <div className="flex justify-around">
          <a
            href="https://github.com/kimrejstrom/nicer-dicer"
            target="_blank"
            className="flex items-center underline hover:text-yellow-200"
            rel="noopener noreferrer"
          >
            <svg
              width="256"
              height="256"
              className="inline-block h-4 w-4 fill-current text-white mr-2"
              viewBox="0 0 16 16"
              version="1.1"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>{' '}
            Project
          </a>
          <a
            href="https://github.com/kimrejstrom/nicer-dicer/issues/new/choose"
            target="_blank"
            className="underline hover:text-yellow-200"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="inline-block h-4 w-4 fill-current text-white mr-2"
              width="24"
              height="24"
            >
              <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            Report a problem
          </a>
          <Link className="underline hover:text-yellow-200" to="/info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="inline-block h-4 w-4 fill-current text-white mr-2"
              width="24"
              height="24"
            >
              <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Help
          </Link>
        </div>
        <p className="text-xs text-white opacity-50 mt-2">
          © 2020 Kim Rejström
        </p>
      </div>
    </div>
  </div>
);
