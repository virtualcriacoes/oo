import React, { useState, useMemo } from 'react';
import { Download, Eye, Search } from 'lucide-react';
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
  },
  { 
    id: '3', 
    title: 'Gradiente Suave', 
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673a1f2f0', 
    categoryId: '3',
    uploadedAt: new Date()
  }
];

function Backgrounds() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Background | null>(null);

  const filteredBackgrounds = useMemo(() => {
    return mockBackgrounds.filter(bg => 
      (!selectedCategory || bg.categoryId === selectedCategory) &&
      bg.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedCategory, searchTerm]);

  const handleDownload = (image: Background) => {
    // In a real app, implement actual download logic
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `${image.title}.jpg`;
    link.click();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Meus Backgrounds</h1>
        
        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
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
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex space-x-2 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`
            px-4 py-2 rounded-lg transition-all 
            ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}
          `}
        >
          Todos
        </button>
        {mockCategories.map(category => (
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

      {/* Backgrounds Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredBackgrounds.map((background) => (
          <div 
            key={background.id} 
            className="bg-gray-100 rounded-lg p-2 text-center group relative"
          >
            <div className="relative">
              <img 
                src={background.imageUrl} 
                alt={background.title}
                className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedImage(background)}
                    className="bg-white/80 p-2 rounded-full hover:bg-white"
                  >
                    <Eye className="text-primary" size={20} />
                  </button>
                  <button 
                    onClick={() => handleDownload(background)}
                    className="bg-white/80 p-2 rounded-full hover:bg-white"
                  >
                    <Download className="text-primary" size={20} />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{background.title}</p>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex">
            <div className="w-2/3">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-l-lg"
              />
            </div>
            <div className="w-1/3 p-6 bg-gray-50 rounded-r-lg">
              <h2 className="text-xl font-bold mb-4">{selectedImage.title}</h2>
              <p className="text-gray-600 mb-4">
                Categoria: {mockCategories.find(c => c.id === selectedImage.categoryId)?.name}
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleDownload(selectedImage)}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Download className="mr-2 inline" size={18} /> Baixar
                </button>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Backgrounds;
