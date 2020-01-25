import React from 'react';
import { useServiceWorker, IServiceWorkerContext } from 'useServiceWorker';
import Button from 'components/Button/Button';

export const UpdateNotification: React.FC = () => {
  // Check for new service worker
  const {
    isUpdateAvailable,
    updateAssets,
  } = useServiceWorker() as IServiceWorkerContext;
  return isUpdateAvailable ? (
    <div className="max-w-lg fixed w-full bottom-0 mb-20">
      <div
        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none flex justify-center items-center"
        role="alert"
      >
        <span className="flex rounded-full bg-primary-dark px-2 py-1 text-xs font-bold mr-3">
          New
        </span>
        <div>
          A new version is available
          <Button
            className="hover:bg-primary-dark bg-secondary-dark text-yellow-100 py-1 px-2 border border-yellow-600 rounded ml-4"
            onClick={updateAssets}
            title="Update now"
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
