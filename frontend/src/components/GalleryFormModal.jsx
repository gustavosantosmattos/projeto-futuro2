import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { imageToBase64, validateImageFile } from '../utils/imageHelper';

const GalleryFormModal = ({ open, onClose, album = null, onSave }) => {
  const [formData, setFormData] = useState(album || {
    title: '',
    date: new Date().toISOString().split('T')[0],
    images: []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    const validFiles = [];
    for (const file of files) {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        toast.error(`${file.name}: ${validation.error}`);
      }
    }

    if (validFiles.length === 0) return;

    try {
      const base64Images = await Promise.all(
        validFiles.map(file => imageToBase64(file))
      );
      setFormData({ 
        ...formData, 
        images: [...formData.images, ...base64Images] 
      });
      toast.success(`${validFiles.length} imagem(ns) carregada(s)!`);
    } catch (error) {
      toast.error('Erro ao carregar imagens');
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Adicione pelo menos uma imagem');
      return;
    }

    onSave({
      ...formData,
      id: album?.id || Date.now().toString()
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
              <Label>Imagens do Álbum *</Label>
              <div className="text-sm text-gray-400">
                {formData.images.length} imagem(ns)
              </div>
            </div>

            <div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleImageUpload}
                className="bg-white/5 border-purple-500/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Selecione múltiplas imagens (JPG, PNG, GIF ou WEBP - máx. 5MB cada)
              </p>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-lg border-2 border-purple-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
