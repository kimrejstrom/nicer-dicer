import React from 'react';
import d20 from 'images/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'components/Modal/modalSlice';
import Settings from 'features/settings/Settings';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
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
      <button
        className="absolute p-8 top-0 right-0"
        onClick={() =>
          dispatch(
            toggleModal({
              visible: true,
              title: '',
              content: <Settings />,
            }),
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="text-white fill-current opacity-25"
        >
          <path d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      </button>
    </div>
  );
};
