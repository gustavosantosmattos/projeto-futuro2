import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { getGallery } from '../hooks/useLocalData';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    setGallery(getGallery());

    const handleDataUpdate = () => {
      setGallery(getGallery());
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, []);

  const openImage = (image, album) => {
    setSelectedImage(image);
    setSelectedAlbum(album);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-purple-600 text-transparent bg-clip-text">Galeria</span> de Fotos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Reviva os melhores momentos dos eventos do Projeto Futuro
          </p>
        </div>

        {/* Gallery Albums */}
        <div className="space-y-16">
          {gallery.map((album) => (
            <div key={album.id}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-1">{album.title}</h2>
                  <p className="text-gray-400 text-sm flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {new Date(album.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {album.images.length} fotos
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {album.images.map((image, index) => (
                  <Card 
                    key={index}
                    onClick={() => openImage(image, album)}
                    className="relative h-64 overflow-hidden bg-white/5 border-amber-500/20 backdrop-blur-sm cursor-pointer group hover:border-amber-500/40 transition-all duration-300"
                  >
                    <img 
                      src={image} 
                      alt={`${album.title} - ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white font-semibold">Clique para ampliar</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-black/95 border-amber-500/20">
            <DialogHeader>
              <DialogTitle className="text-amber-400 text-xl">
                {selectedAlbum?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Imagem ampliada" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-900/20 to-amber-900/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <ImageIcon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Participou de algum evento?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Compartilhe suas fotos conosco! Envie suas melhores imagens dos eventos do grêmio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contato@projetofuturo.com" className="inline-block">
              <span className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer inline-block">
                Enviar Fotos
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
