// src/App.jsx
import React, { useState, useEffect } from 'react';
import StatusCard from './components/StatusCard/StatusCard';
import BotControls from './components/BotControls/BotControls';
import ErrorStream from './components/ErrorStream/ErrorStream';
import DataTable from './components/DataStream/DataTable';

const App = () => {
  const [botStatus, setBotStatus] = useState({
    isRunning: false,
    isSimulating: false,
    uptime: '00:00:00'
  });
  const [errors, setErrors] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [priceData, setPriceData] = useState([]);

  // Bot control handlers
  const startBot = async () => {
    try {
      const response = await fetch('/web/bot/start', { method: 'POST' });
      if (response.ok) {
        setBotStatus(prev => ({ ...prev, isRunning: true }));
      }
    } catch (error) {
      console.error('Failed to start bot:', error);
    }
  };

  const stopBot = async () => {
    try {
      const response = await fetch('/web/bot/stop', { method: 'POST' });
      if (response.ok) {
        setBotStatus(prev => ({ 
          ...prev, 
          isRunning: false,
          isSimulating: false 
        }));
      }
    } catch (error) {
      console.error('Failed to stop bot:', error);
    }
  };

  const startSimulation = async () => {
    try {
      const response = await fetch('/web/bot/simulate/start', { method: 'POST' });
      if (response.ok) {
        setBotStatus(prev => ({ ...prev, isSimulating: true }));
      }
    } catch (error) {
      console.error('Failed to start simulation:', error);
    }
  };

  const stopSimulation = async () => {
    try {
      const response = await fetch('/web/bot/simulate/stop', { method: 'POST' });
      if (response.ok) {
        setBotStatus(prev => ({ ...prev, isSimulating: false }));
      }
    } catch (error) {
      console.error('Failed to stop simulation:', error);
    }
  };

  useEffect(() => {
    // Error Stream
    const errorSource = new EventSource('/api/errors');
    errorSource.onmessage = (event) => {
      const error = JSON.parse(event.data);
      setErrors(prev => [{
        code: error.errorCode,
        message: error.errorMessage,
        timestamp: new Date().toLocaleString()
      }, ...prev.slice(0, 4)]); // Keep last 5 errors
    };

    // Volume Stream
    const volumeSource = new EventSource('/web/bot/stream/volume');
    volumeSource.addEventListener('volumeUpdate', (event) => {
      const data = JSON.parse(event.data);
      setVolumeData(prev => [data, ...prev.slice(0, 5)]); // Keep last 6 updates
    });

    // Price Stream
    const priceSource = new EventSource('/web/bot/stream/price');
    priceSource.addEventListener('priceUpdate', (event) => {
      const data = JSON.parse(event.data);
      setPriceData(prev => [data, ...prev.slice(0, 5)]); // Keep last 6 updates
    });

    // Cleanup function
    return () => {
      errorSource.close();
      volumeSource.close();
      priceSource.close();
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
          Trading Bot Console
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatusCard botStatus={botStatus} />
          <BotControls
            botStatus={botStatus}
            onStartBot={startBot}
            onStopBot={stopBot}
            onStartSimulation={startSimulation}
            onStopSimulation={stopSimulation}
          />
        </div>

        <ErrorStream errors={errors} />

        <div className="grid md:grid-cols-2 gap-6">
          <DataTable title="Volume Updates" data={volumeData} type="Volume" />
          <DataTable title="Price Updates" data={priceData} type="Price" />
        </div>
      </div>
    </div>
  );
};

export default App;