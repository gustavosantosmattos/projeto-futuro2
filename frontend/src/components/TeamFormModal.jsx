import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const TeamFormModal = ({ open, onClose, member = null, onSave }) => {
  const [formData, setFormData] = useState(member || {
    name: '',
    role: 'Membro',
    photo: '',
    bio: ''
  });

  const roles = [
    'Presidente',
    'Vice-Presidente',
    'Secretário',
    'Secretária',
    'Tesoureiro',
    'Tesoureira',
    'Diretor de Eventos',
    'Diretora de Eventos',
    'Diretor de Comunicação',
    'Diretora de Comunicação',
    'Membro'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.bio) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    onSave({
      ...formData,
      id: member?.id || Date.now().toString(),
      photo: formData.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    });
    
    toast.success(member ? 'Membro atualizado!' : 'Membro adicionado!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-amber-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-amber-400">
            {member ? 'Editar Membro da Equipe' : 'Adicionar Membro'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Preencha as informações do membro do grêmio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Ana Silva"
              className="bg-white/5 border-purple-500/20 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Cargo/Função *</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="bg-white/5 border-purple-500/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-500/20 max-h-60">
                {roles.map((role) => (
                  <SelectItem key={role} value={role} className="text-white hover:bg-white/10">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">URL da Foto</Label>
            <Input
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/5 border-purple-500/20 text-white"
            />
            <p className="text-xs text-gray-500">
              Dica: Use uma foto quadrada para melhor visualização
            </p>
            {formData.photo && (
              <div className="mt-2">
                <img 
                  src={formData.photo} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-full border-2 border-purple-500/30"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop';
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografia *</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Breve descrição sobre o membro..."
              rows={4}
              className="bg-white/5 border-purple-500/20 text-white resize-none"
              required
            />
            <p className="text-xs text-gray-500">
              {formData.bio.length}/200 caracteres
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-400">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold">
              {member ? 'Salvar Alterações' : 'Adicionar Membro'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamFormModal;
