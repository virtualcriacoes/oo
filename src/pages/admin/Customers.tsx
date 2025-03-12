import React from 'react';

function Customers() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Gerenciamento de Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-600">Total de Clientes</h2>
          <p className="text-3xl font-bold text-blue-800">1,234</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-600">Novos Clientes (Mês)</h2>
          <p className="text-3xl font-bold text-green-800">87</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-red-600">Clientes Inativos</h2>
          <p className="text-3xl font-bold text-red-800">42</p>
        </div>
      </div>
    </div>
  );
}

export default Customers;
