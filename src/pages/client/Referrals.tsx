import React from 'react';

function Referrals() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Programa de Indicação</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-600">Total de Indicações</h2>
          <p className="text-3xl font-bold text-purple-800">12</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-indigo-600">Indicações Ativas</h2>
          <p className="text-3xl font-bold text-indigo-800">8</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-pink-600">Bônus Acumulado</h2>
          <p className="text-3xl font-bold text-pink-800">R$ 480</p>
        </div>
      </div>
    </div>
  );
}

export default Referrals;
