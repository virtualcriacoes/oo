import React, { useState } from 'react';
import { Plus, Edit, Trash2, Image, Link2 } from 'lucide-react';

interface Download {
  id: number;
  title: string;
  imageUrl: string;
  downloadLink: string;
  date: string;
  category: 'automation' | 'live-transmission';
}

function Downloads() {
  const [downloads, setDownloads] = useState<Download[]>([
    { 
      id: 1, 
      title: 'Script de Automação Básico', 
      imageUrl: 'https://example.com/automation-script.jpg',
      downloadLink: 'https://example.com/download/script1',
      date: '15/01/2024',
      category: 'automation'
    },
    { 
      id: 2, 
      title: 'Transmissão ao Vivo - Workshop', 
      imageUrl: 'https://example.com/live-workshop.jpg',
      downloadLink: 'https://example.com/download/live1',
      date: '20/01/2024',
      category: 'live-transmission'
    }
  ]);

  const [selectedDownload, setSelectedDownload] = useState<Download | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDownload = () => {
    setSelectedDownload({
      id: downloads.length + 1,
      title: '',
      imageUrl: '',
      downloadLink: '',
      date: new Date().toLocaleDateString('pt-BR'),
      category: 'automation'
    });
    setIsModalOpen(true);
  };

  const handleEditDownload = (download: Download) => {
    setSelectedDownload(download);
    setIsModalOpen(true);
  };

  const handleDeleteDownload = (id: number) => {
    setDownloads(downloads.filter(download => download.id !== id));
  };

  const handleSaveDownload = () => {
    if (selectedDownload) {
      const existingDownloadIndex = downloads.findIndex(d => d.id === selectedDownload.id);
      
      if (existingDownloadIndex > -1) {
        // Update existing download
        const updatedDownloads = [...downloads];
        updatedDownloads[existingDownloadIndex] = selectedDownload;
        setDownloads(updatedDownloads);
      } else {
        // Add new download
        setDownloads([...downloads, selectedDownload]);
      }
      
      setIsModalOpen(false);
      setSelectedDownload(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Gerenciamento de Downloads</h1>
        <button 
          onClick={handleAddDownload}
          className="flex items-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors"
        >
          <Plus className="mr-2" /> Adicionar Download
        </button>
      </div>

      {/* Download List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map(download => (
          <div 
            key={download.id} 
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md"
          >
            <img 
              src={download.imageUrl} 
              alt={download.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-primary">{download.title}</h2>
                <span className="text-sm text-gray-500">
                  {download.category === 'automation' ? 'Automação' : 'Transmissão'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{download.date}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditDownload(download)}
                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteDownload(download.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Modal */}
      {isModalOpen && selectedDownload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-primary">
              {selectedDownload.id ? 'Editar Download' : 'Novo Download'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={selectedDownload.category}
                  onChange={(e) => setSelectedDownload({
                    ...selectedDownload,
                    category: e.target.value as 'automation' | 'live-transmission'
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                >
                  <option value="automation">Automação</option>
                  <option value="live-transmission">Transmissão ao Vivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input 
                  type="text"
                  value={selectedDownload.title}
                  onChange={(e) => setSelectedDownload({
                    ...selectedDownload,
                    title: e.target.value
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                <div className="flex">
                  <input 
                    type="text"
                    value={selectedDownload.imageUrl}
                    onChange={(e) => setSelectedDownload({
                      ...selectedDownload,
                      imageUrl: e.target.value
                    })}
                    className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md">
                    <Image />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link de Download</label>
                <div className="flex">
                  <input 
                    type="text"
                    value={selectedDownload.downloadLink}
                    onChange={(e) => setSelectedDownload({
                      ...selectedDownload,
                      downloadLink: e.target.value
                    })}
                    className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md">
                    <Link2 />
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveDownload}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Downloads;
