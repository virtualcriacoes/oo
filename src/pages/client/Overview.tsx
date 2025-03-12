import React from 'react';
import { CreditCard, Users, Download } from 'lucide-react';

function Overview() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Bem-vindo ao RadioCast</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Próxima Fatura
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    R$ 99,90
                  </dd>
                  <dd className="text-sm text-gray-500">
                    Vencimento em 15/03/2024
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Programa de Indicação
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    2 Indicações
                  </dd>
                  <dd className="text-sm text-gray-500">
                    Faltam 3 para ganhar R$ 50,00
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Download className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Downloads Disponíveis
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    3 Novos Arquivos
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Informações do Plano</h2>
        <div className="mt-4 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dados do Xcast</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Usuário:</span> cliente123
                </p>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Painel:</span>{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Acessar Painel Xcast
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dados do Aplicativo</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Usuário:</span> app_cliente123
                </p>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Painel:</span>{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Acessar Painel do App
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
