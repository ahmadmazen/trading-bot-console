import React from 'react';
import { StartIcon, StopIcon, SimulationIcon } from '../icons/Icons';

const BotControls = ({ botStatus, onStartBot, onStopBot, onStartSimulation, onStopSimulation }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Bot Controls</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onStartBot}
          disabled={botStatus.isRunning}
          className="bg-green-600 hover:bg-green-700 p-3 rounded-md flex items-center justify-center disabled:opacity-50"
        >
          <StartIcon />
          <span className="ml-2">Start Bot</span>
        </button>
        <button
          onClick={onStopBot}
          disabled={!botStatus.isRunning}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-md flex items-center justify-center disabled:opacity-50"
        >
          <StopIcon />
          <span className="ml-2">Stop Bot</span>
        </button>
        <button
          onClick={onStartSimulation}
          disabled={botStatus.isSimulating}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-md flex items-center justify-center disabled:opacity-50"
        >
          <SimulationIcon />
          <span className="ml-2">Start Sim</span>
        </button>
        <button
          onClick={onStopSimulation}
          disabled={!botStatus.isSimulating}
          className="bg-yellow-600 hover:bg-yellow-700 p-3 rounded-md flex items-center justify-center disabled:opacity-50"
        >
          <StopIcon />
          <span className="ml-2">Stop Sim</span>
        </button>
      </div>
    </div>
  );
};

export default BotControls;
