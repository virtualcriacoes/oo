import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Filter, 
  Search, 
  X, 
  Image as ImageIcon 
} from 'lucide-react';
import { Background, BackgroundCategory } from '../../types/background';

// Mock data - in a real app, this would come from an API
const mockCategories: BackgroundCategory[] = [
  { id: '1', name: 'IA Gerada', description: 'Imagens criadas por inteligência artificial' },
  { id: '2', name: 'Abstrato', description: 'Designs abstratos e conceituais' },
  { id: '3', name: 'Gradiente', description: 'Fundos com transições suaves de cores' }
];

const mockBackgrounds: Background[] = [
  { 
    id: '1', 
    title: 'Paisagem Futurista', 
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809', 
    categoryId: '1',
    uploadedAt: new Date()
  },
  { 
    id: '2', 
    title: 'Ondas Digitais', 
    imageUrl: 'https://images.unsplash.com/photo-1553356084-58a6ae66e59d', 
    categoryId: '2',
    uploadedAt: new Date()
  }
];

function BackgroundsAdmin() {
  const [backgrounds, setBackgrounds] = useState<Background[]>(mockBackgrounds);
  const [categories, setCategories] = useState<BackgroundCategory[]>(mockCategories);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
  
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const [newCategory, setNewCategory] = useState<Partial<BackgroundCategory>>({});
  const [newBackground, setNewBackground] = useState<Partial<Background>>({});

  const filteredBackgrounds = useMemo(() => {
    return backgrounds.filter(bg => 
      (!selectedCategory || bg.categoryId === selectedCategory) &&
      bg.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [backgrounds, selectedCategory, searchTerm]);

  const handleAddCategory = () => {
    if (newCategory.name) {
      const newCat = {
        ...newCategory,
        id: (categories.length + 1).toString()
      } as BackgroundCategory;
      setCategories([...categories, newCat]);
      setNewCategory({});
      setIsAddCategoryModalOpen(false);
    }
  };

  const handleUploadBackground = () => {
    if (newBackground.title && newBackground.imageUrl && newBackground.categoryId) {
      const uploadedBg = {
        ...newBackground,
        id: (backgrounds.length + 1).toString(),
        uploadedAt: new Date()
      } as Background;
      setBackgrounds([...backgrounds, uploadedBg]);
      setNewBackground({});
      setIsUploadModalOpen(false);
    }
  };

  const handleDeleteBackgrounds = () => {
    setBackgrounds(backgrounds.filter(bg => !selectedBackgrounds.includes(bg.id)));
    setSelectedBackgrounds([]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Gerenciamento de Backgrounds</h1>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="flex items-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors"
          >
            <Plus className="mr-2" /> Nova Categoria
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            <Upload className="mr-2" /> Upload
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`
              px-4 py-2 rounded-lg transition-all 
              ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}
            `}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg transition-all 
                ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar backgrounds..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-primary/50"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBackgrounds.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-6">
          <span>{selectedBackgrounds.length} backgrounds selecionados</span>
          <button 
            onClick={handleDeleteBackgrounds}
            className="flex items-center text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg"
          >
            <Trash2 className="mr-2" /> Excluir Selecionados
          </button>
        </div>
      )}

      {/* Backgrounds Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredBackgrounds.map((background) => (
          <div 
            key={background.id} 
            className="bg-gray-100 rounded-lg p-2 relative group"
          >
            <input 
              type="checkbox" 
              checked={selectedBackgrounds.includes(background.id)}
              onChange={() => {
                setSelectedBackgrounds(prev => 
                  prev.includes(background.id) 
                    ? prev.filter(id => id !== background.id)
                    : [...prev, background.id]
                );
              }}
              className="absolute top-2 left-2 z-10"
            />
            <img 
              src={background.imageUrl} 
              alt={background.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{background.title}</p>
                <p className="text-xs text-gray-500">
                  {categories.find(c => c.id === background.categoryId)?.name}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => {
                    setBackgrounds(backgrounds.filter(bg => bg.id !== background.id));
                  }}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>
            <input 
              type="text" 
              placeholder="Nome da Categoria"
              value={newCategory.name || ''}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <textarea 
              placeholder="Descrição (opcional)"
              value={newCategory.description || ''}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsAddCategoryModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddCategory}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Background Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Upload de Background</h2>
            <input 
              type="text" 
              placeholder="Título do Background"
              value={newBackground.title || ''}
              onChange={(e) => setNewBackground({...newBackground, title: e.target.value})}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <select 
              value={newBackground.categoryId || ''}
              onChange={(e) => setNewBackground({...newBackground, categoryId: e.target.value})}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Selecione uma Categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewBackground({...newBackground, imageUrl: reader.result as string});
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center"
              >
                <ImageIcon className="text-gray-400 mb-2" size={40} />
                <p className="text-gray-600">
                  {newBackground.imageUrl 
                    ? 'Imagem Selecionada' 
                    : 'Clique para selecionar uma imagem'}
                </p>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                onClick={handleUploadBackground}
                disabled={!newBackground.title || !newBackground.imageUrl || !newBackground.categoryId}
                className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackgroundsAdmin;
