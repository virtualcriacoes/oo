import React from 'react';

function Invoices() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Minhas Faturas</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-600">Total Pago</h2>
          <p className="text-3xl font-bold text-blue-800">R$ 1,234</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-600">Faturas Pagas</h2>
          <p className="text-3xl font-bold text-green-800">5</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-600">Faturas Pendentes</h2>
          <p className="text-3xl font-bold text-yellow-800">2</p>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
