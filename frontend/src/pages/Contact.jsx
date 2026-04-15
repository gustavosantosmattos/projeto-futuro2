import React, { useState } from 'react';
import { Lightbulb, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Sugestão Geral',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const suggestions = JSON.parse(localStorage.getItem('app_suggestions') || '[]');
    const newSuggestion = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'Pendente'
    };
    suggestions.push(newSuggestion);
    localStorage.setItem('app_suggestions', JSON.stringify(suggestions));

    setTimeout(() => {
      setIsSubmitted(true);
      toast.success('Sugestão enviada com sucesso!');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', category: 'Sugestão Geral', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const categories = [
    'Sugestão Geral',
    'Evento',
    'Melhoria na Escola',
    'Atividade Cultural',
    'Atividade Esportiva',
    'Outro'
  ];

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4">
            <Lightbulb className="h-7 w-7 sm:h-8 sm:w-8 text-black" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
            Envie sua <span className="bg-gradient-to-r from-amber-400 to-purple-600 text-transparent bg-clip-text">Sugestão</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Sua opinião é fundamental! Contribua com ideias para tornar nosso grêmio ainda melhor.
          </p>
        </div>

        <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-amber-400">Formulário de Sugestões</CardTitle>
            <CardDescription className="text-gray-400">
              Compartilhe suas ideias, sugestões de eventos, melhorias ou qualquer feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Categoria da Sugestão</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-purple-500/20 text-white rounded-md px-3 py-2 focus:border-purple-500/50 focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Sua Sugestão *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva sua sugestão detalhadamente..."
                    rows={6}
                    className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 resize-none"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold">
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Sugestão
                </Button>
              </form>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Sugestão Enviada!</h3>
                <p className="text-gray-400">Obrigado por contribuir!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
