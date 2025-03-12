import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface DownloadItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  downloadLink: string;
  date: string;
  category: 'automation' | 'live-transmission';
}

function Downloads() {
  const [activeCategory, setActiveCategory] = useState<'automation' | 'live-transmission'>('automation');

  // Mock data - in a real app, this would come from an API or state management
  const downloadItems: DownloadItem[] = [
    {
      id: 1,
      title: 'Script de Automação Básico',
      description: 'Automatização de tarefas repetitivas',
      imageUrl: 'https://example.com/automation-script.jpg',
      downloadLink: 'https://example.com/download/script1',
      date: '15/01/2024',
      category: 'automation'
    },
    {
      id: 2,
      title: 'Transmissão ao Vivo - Workshop',
      description: 'Gravação completa do evento',
      imageUrl: 'https://example.com/live-workshop.jpg',
      downloadLink: 'https://example.com/download/live1',
      date: '20/01/2024',
      category: 'live-transmission'
    }
  ];

  const filteredDownloads = downloadItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Meus Downloads</h1>
      
      {/* Category Tabs */}
      <div className="flex mb-6 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveCategory('automation')}
          className={`
            px-4 py-2 mr-4 font-semibold transition-all duration-300
            ${activeCategory === 'automation' 
              ? 'text-white bg-primary rounded-t-lg' 
              : 'text-gray-600 hover:text-primary'}
          `}
        >
          Automação
        </button>
        <button
          onClick={() => setActiveCategory('live-transmission')}
          className={`
            px-4 py-2 font-semibold transition-all duration-300
            ${activeCategory === 'live-transmission' 
              ? 'text-white bg-primary rounded-t-lg' 
              : 'text-gray-600 hover:text-primary'}
          `}
        >
          Transmissão ao Vivo
        </button>
      </div>

      {/* Download Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDownloads.map(item => (
          activeCategory === 'automation' ? (
            // Automation Card Design
            <div 
              key={item.id} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md transform transition-all hover:scale-105"
            >
              <div className="relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm">
                  {item.date}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-primary mb-2">{item.title}</h2>
                <div className="flex justify-between items-center mt-4">
                  <a 
                    href={item.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors"
                  >
                    <Download className="mr-2" /> Baixar
                  </a>
                </div>
              </div>
            </div>
          ) : (
            // Live Transmission Card Design
            <div 
              key={item.id} 
              className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-56 object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-primary/30 flex flex-col justify-end p-4">
                  <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">{item.date}</span>
                    <a 
                      href={item.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {filteredDownloads.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Nenhum download disponível nesta categoria.
        </div>
      )}
    </div>
  );
}

export default Downloads;
