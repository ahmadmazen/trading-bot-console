import React from 'react';

const StatusCard = ({ botStatus }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">System Status</h2>
        <div className={`w-3 h-3 rounded-full ${botStatus.isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>Bot Status</span>
          <span className={botStatus.isRunning ? 'text-green-500' : 'text-red-500'}>
            {botStatus.isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Simulation</span>
          <span className={botStatus.isSimulating ? 'text-blue-500' : 'text-gray-500'}>
            {botStatus.isSimulating ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Uptime</span>
          <span>{botStatus.uptime}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;