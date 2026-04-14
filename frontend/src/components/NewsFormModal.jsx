import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { imageToBase64, validateImageFile } from '../utils/imageHelper';

const NewsFormModal = ({ open, onClose, news = null, onSave }) => {
  const [formData, setFormData] = useState(news || {
    title: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    excerpt: '',
    content: '',
    category: 'Conquistas',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    try {
      const base64 = await imageToBase64(file);
      setFormData({ ...formData, image: base64 });
      toast.success('Imagem carregada!');
    } catch (error) {
      toast.error('Erro ao carregar imagem');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.excerpt) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    onSave({
      ...formData,
      id: news?.id || Date.now().toString(),
      image: formData.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop'
    });
    
    toast.success(news ? 'Notícia atualizada!' : 'Notícia publicada!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-400">
            {news ? 'Editar Notícia' : 'Nova Notícia'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Preencha as informações da notícia
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título da notícia"
              className="bg-white/5 border-purple-500/20 text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Autor *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Nome do autor"
                className="bg-white/5 border-purple-500/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white/5 border-purple-500/20 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-white/5 border-purple-500/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-500/20">
                <SelectItem value="Conquistas" className="text-white">Conquistas</SelectItem>
                <SelectItem value="Infraestrutura" className="text-white">Infraestrutura</SelectItem>
                <SelectItem value="Ação Social" className="text-white">Ação Social</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagem da Notícia</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-white/5 border-purple-500/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:cursor-pointer"
            />
            <p className="text-xs text-gray-500">
              JPG, PNG, GIF ou WEBP (máx. 5MB)
            </p>
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-purple-500/30"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Breve resumo da notícia..."
              rows={3}
              className="bg-white/5 border-purple-500/20 text-white resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo Completo</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Conteúdo completo da notícia..."
              rows={6}
              className="bg-white/5 border-purple-500/20 text-white resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-400">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold">
              {news ? 'Salvar Alterações' : 'Publicar Notícia'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsFormModal;
