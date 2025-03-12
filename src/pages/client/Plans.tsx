import React from 'react';

function Plans() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Meus Planos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-600">Plano Atual</h2>
          <p className="text-3xl font-bold text-blue-800">Pro</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-600">Próximo Ciclo</h2>
          <p className="text-3xl font-bold text-green-800">30/09/2023</p>
        </div>
      </div>
    </div>
  );
}

export default Plans;
