import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { toggleModal } from 'components/Modal/modalSlice';
// import Button from 'components/Button/Button';

export interface IModal {
  title?: string;
  content?: JSX.Element;
}

export const Modal: React.FC<IModal> = ({ title, content }) => {
  // Get visibility from Redux
  const { visible } = useSelector((state: RootState) => state.modalVisibility);
  const dispatch = useDispatch();

  return visible ? (
    <div className="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-primary-dark opacity-75"></div>

      <div className="modal-container bg-secondary-dark w-11/12 max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div
          onClick={() => dispatch(toggleModal({ visible: false }))}
          className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
        >
          <svg
            className="fill-current text-white opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>

        <div className="modal-content text-center py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <div
              onClick={() => dispatch(toggleModal({ visible: false }))}
              className="modal-close cursor-pointer z-50"
            >
              <svg
                className="fill-current text-white opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          {content}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
