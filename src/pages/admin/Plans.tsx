import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

function Plans() {
  const [plans, setPlans] = useState<Plan[]>([
    { 
      id: 1, 
      name: 'Plano Básico', 
      price: 29.99, 
      features: ['Recurso 1', 'Recurso 2'] 
    }
  ]);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: plans.length + 1,
      name: 'Novo Plano',
      price: 0,
      features: []
    };
    setPlans([...plans, newPlan]);
    setSelectedPlan(newPlan);
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Gerenciamento de Planos</h1>
        <button 
          onClick={handleAddPlan}
          className="flex items-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors"
        >
          <Plus className="mr-2" /> Adicionar Plano
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Lista de Planos</h2>
          {plans.map(plan => (
            <div 
              key={plan.id} 
              className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-primary">{plan.name}</h3>
                <p className="text-sm text-gray-600">R$ {plan.price.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditPlan(plan)}
                  className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeletePlan(plan.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-primary">
              {selectedPlan.id ? 'Editar Plano' : 'Novo Plano'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Plano</label>
                <input 
                  type="text" 
                  value={selectedPlan.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input 
                  type="number" 
                  value={selectedPlan.price}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Recursos</label>
                <textarea 
                  placeholder="Digite os recursos, um por linha"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                >
                  Salvar
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Plans;
