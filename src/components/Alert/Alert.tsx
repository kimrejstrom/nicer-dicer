import React from 'react';

interface IAlert {
  title: string;
  body: string;
}

export const Alert: React.FC<IAlert> = ({ title, body }) => (
  <div
    className="bg-red-100 border-t-4 border-red-400 rounded-b text-red-700 px-4 py-3 shadow-md"
    role="alert"
  >
    <div className="flex">
      <div className="py-1 self-center mr-6">
        <img src="https://icon.now.sh/warning/24/742A2A" alt="Alert logo" />
      </div>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm">{body}</p>
      </div>
    </div>
  </div>
);
