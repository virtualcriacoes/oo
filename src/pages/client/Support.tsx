import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Central de Suporte</h1>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-blue-700">Abrir Chamado</h2>
          <p className="text-gray-600">Precisa de ajuda? Abra um chamado agora mesmo.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-green-700">Perguntas Frequentes</h2>
          <p className="text-gray-600">Consulte nossa base de conhecimento.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
