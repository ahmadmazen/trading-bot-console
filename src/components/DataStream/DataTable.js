import React from 'react';

const DataTable = ({ title, data, type }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">ReqID</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">{type}</th>
              <th className="text-left p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0">
                <td className="p-2">{item.reqId}</td>
                <td className="p-2">{item.eventType}</td>
                <td className="p-2">{item[type.toLowerCase()]}</td>
                <td className="p-2">{new Date(item.updateTimestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;