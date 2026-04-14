import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const PollFormModal = ({ open, onClose, poll = null, onSave }) => {
  const [formData, setFormData] = useState(poll || {
    title: '',
    description: '',
    endDate: '',
    status: 'active',
    options: [
      { id: 'opt1', text: '', votes: 0 },
      { id: 'opt2', text: '', votes: 0 }
    ]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [
        ...formData.options,
        { id: `opt${formData.options.length + 1}`, text: '', votes: 0 }
      ]
    });
  };

  const removeOption = (index) => {
    if (formData.options.length <= 2) {
      toast.error('A enquete deve ter pelo menos 2 opções');
      return;
    }
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.endDate) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const emptyOptions = formData.options.filter(opt => !opt.text.trim());
    if (emptyOptions.length > 0) {
      toast.error('Todas as opções devem ter texto');
      return;
    }

    const totalVotes = formData.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);

    onSave({
      ...formData,
      id: poll?.id || Date.now().toString(),
      totalVotes
    });
    
    toast.success(poll ? 'Votação atualizada!' : 'Votação criada!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-amber-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-amber-400">
            {poll ? 'Editar Votação' : 'Nova Votação'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure a enquete ou votação
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Votação *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Qual tema para a próxima festa?"
              className="bg-white/5 border-purple-500/20 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva a votação..."
              rows={2}
              className="bg-white/5 border-purple-500/20 text-white resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="bg-white/5 border-purple-500/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-white/5 border-purple-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/20">
                  <SelectItem value="active" className="text-white">Ativa</SelectItem>
                  <SelectItem value="closed" className="text-white">Encerrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Opções de Voto *</Label>
              <Button
                type="button"
                size="sm"
                onClick={addOption}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Opção
              </Button>
            </div>

            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                  className="bg-white/5 border-purple-500/20 text-white flex-1"
                  required
                />
                {formData.options.length > 2 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeOption(index)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-400">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold">
              {poll ? 'Salvar Alterações' : 'Criar Votação'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PollFormModal;
