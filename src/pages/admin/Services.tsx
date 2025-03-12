import React from 'react';

function Services() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Gerenciamento de Serviços</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-600">Total de Serviços</h2>
          <p className="text-3xl font-bold text-purple-800">24</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-indigo-600">Serviços Ativos</h2>
          <p className="text-3xl font-bold text-indigo-800">18</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
