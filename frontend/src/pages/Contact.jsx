import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
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
    subject: '',
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
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entraremos em contato em breve.'
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Entre em <span className="bg-gradient-to-r from-amber-400 to-purple-600 text-transparent bg-clip-text">Contato</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou quer participar? Estamos aqui para ouvir você!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-purple-400">Endereço</CardTitle>
                <CardDescription className="text-gray-400">
                  Rua da Escola, 123<br />
                  Centro - Cidade, Estado<br />
                  CEP: 12345-678
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-amber-400">Telefone</CardTitle>
                <CardDescription className="text-gray-400">
                  (11) 98765-4321<br />
                  Segunda a Sexta<br />
                  8h às 17h
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-purple-400">E-mail</CardTitle>
                <CardDescription className="text-gray-400">
                  contato@projetofuturo.com<br />
                  <br />
                  Respondemos em até 24h
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl text-amber-400">Envie sua Mensagem</CardTitle>
                <CardDescription className="text-gray-400">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
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
                          className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50"
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
                          className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Assunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sobre o que você quer falar?"
                        className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Mensagem *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escreva sua mensagem aqui..."
                        rows={6}
                        className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                ) : (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Mensagem Enviada!</h3>
                    <p className="text-gray-400">
                      Obrigado por entrar em contato. Responderemos em breve.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm overflow-hidden">
            <div className="h-[400px] bg-gradient-to-br from-purple-900/20 to-amber-900/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Mapa de localização</p>
                <p className="text-gray-500 text-sm">Rua da Escola, 123 - Centro</p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-amber-900/20 border border-purple-500/20 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Perguntas Frequentes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h4 className="text-amber-400 font-semibold mb-2">Como posso participar do grêmio?</h4>
              <p className="text-sm">Entre em contato conosco ou participe das reuniões abertas mensais.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold mb-2">Quando são as eleições?</h4>
              <p className="text-sm">As eleições acontecem anualmente no segundo semestre.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold mb-2">Como sugerir um evento?</h4>
              <p className="text-sm">Envie sua sugestão através deste formulário ou nas nossas redes sociais.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold mb-2">Onde fica a sala do grêmio?</h4>
              <p className="text-sm">Nossa sala fica no 2º andar, próximo à biblioteca.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
