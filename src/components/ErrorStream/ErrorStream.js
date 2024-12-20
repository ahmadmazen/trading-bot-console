import React from 'react';
import { AlertIcon } from '../icons/Icons';

const ErrorStream = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-900/50 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <AlertIcon className="mr-2 text-red-400" />
        Error Stream
      </h2>
      <div className="space-y-2">
        {errors.map((error, index) => (
          <div key={index} className="bg-red-900/50 p-3 rounded">
            <div className="font-semibold">Error Code: {error.code}</div>
            <div>{error.message}</div>
            <div className="text-sm text-red-300">{error.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorStream;