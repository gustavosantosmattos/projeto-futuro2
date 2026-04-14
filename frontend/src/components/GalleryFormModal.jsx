import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const GalleryFormModal = ({ open, onClose, album = null, onSave }) => {
  const [formData, setFormData] = useState(album || {
    title: '',
    date: new Date().toISOString().split('T')[0],
    images: ['']
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const removeImage = (index) => {
    if (formData.images.length <= 1) {
      toast.error('O álbum deve ter pelo menos 1 imagem');
      return;
    }
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const validImages = formData.images.filter(img => img.trim());
    if (validImages.length === 0) {
      toast.error('Adicione pelo menos uma imagem');
      return;
    }

    onSave({
      ...formData,
      id: album?.id || Date.now().toString(),
      images: validImages
    });
    
    toast.success(album ? 'Álbum atualizado!' : 'Álbum criado!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-400">
            {album ? 'Editar Álbum' : 'Novo Álbum'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Adicione fotos ao álbum da galeria
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Álbum *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Festa Junina 2024"
              className="bg-white/5 border-purple-500/20 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data do Evento *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-white/5 border-purple-500/20 text-white"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Imagens (URLs) *</Label>
              <Button
                type="button"
                size="sm"
                onClick={addImage}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Imagem
              </Button>
            </div>

            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://... (URL da imagem)"
                  className="bg-white/5 border-purple-500/20 text-white flex-1"
                />
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeImage(index)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <p className="text-xs text-gray-500">
              Dica: Use serviços como Unsplash ou faça upload das imagens para um servidor
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-400">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold">
              {album ? 'Salvar Alterações' : 'Criar Álbum'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryFormModal;
