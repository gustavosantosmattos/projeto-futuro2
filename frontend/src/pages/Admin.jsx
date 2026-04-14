import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Newspaper, Image, Vote, Users, Settings, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { mockEvents, mockNews, mockPolls, mockGallery } from '../mock';

const Admin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const isAdmin = localStorage.getItem('isAdmin');
    const name = localStorage.getItem('adminName');
    
    if (!isAdmin) {
      toast.error('Acesso negado', {
        description: 'Você precisa fazer login primeiro'
      });
      navigate('/login');
    } else {
      setAdminName(name || 'Administrador');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminName');
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  const stats = [
    {
      title: 'Total de Eventos',
      value: mockEvents.length,
      icon: Calendar,
      color: 'amber'
    },
    {
      title: 'Notícias Publicadas',
      value: mockNews.length,
      icon: Newspaper,
      color: 'purple'
    },
    {
      title: 'Votações Ativas',
      value: mockPolls.filter(p => p.status === 'active').length,
      icon: Vote,
      color: 'amber'
    },
    {
      title: 'Álbuns de Fotos',
      value: mockGallery.length,
      icon: Image,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Painel <span className="bg-gradient-to-r from-amber-400 to-purple-600 text-transparent bg-clip-text">Administrativo</span>
            </h1>
            <p className="text-gray-400">Bem-vindo, {adminName}!</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`bg-white/5 border-${stat.color}-500/20 backdrop-blur-sm hover:border-${stat.color}-500/40 transition-all duration-300`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold text-${stat.color}-400`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="events" className="space-y-8">
          <TabsList className="bg-white/5 border border-purple-500/20 p-1">
            <TabsTrigger value="events" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Calendar className="h-4 w-4 mr-2" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Newspaper className="h-4 w-4 mr-2" />
              Notícias
            </TabsTrigger>
            <TabsTrigger value="polls" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Vote className="h-4 w-4 mr-2" />
              Votações
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Image className="h-4 w-4 mr-2" />
              Galeria
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-amber-400">Gerenciar Eventos</CardTitle>
                    <CardDescription className="text-gray-400">
                      Visualize e gerencie todos os eventos
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold">
                    + Novo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all">
                      <div className="flex items-center space-x-4">
                        <img src={event.image} alt={event.title} className="h-16 w-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-white font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR')} • {event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news">
            <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-purple-400">Gerenciar Notícias</CardTitle>
                    <CardDescription className="text-gray-400">
                      Publique e edite notícias
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold">
                    + Nova Notícia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNews.map((news) => (
                    <div key={news.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <div className="flex items-center space-x-4">
                        <img src={news.image} alt={news.title} className="h-16 w-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-white font-semibold">{news.title}</h3>
                          <p className="text-sm text-gray-400">Por {news.author} • {new Date(news.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Polls Tab */}
          <TabsContent value="polls">
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-amber-400">Gerenciar Votações</CardTitle>
                    <CardDescription className="text-gray-400">
                      Crie e monitore enquetes
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold">
                    + Nova Votação
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPolls.map((poll) => (
                    <div key={poll.id} className="p-4 bg-white/5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold mb-1">{poll.title}</h3>
                          <p className="text-sm text-gray-400">{poll.description}</p>
                        </div>
                        <Badge className={poll.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                          {poll.status === 'active' ? 'Ativa' : 'Encerrada'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {poll.totalVotes} votos
                          </span>
                          <span>Termina: {new Date(poll.endDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                            Resultados
                          </Button>
                          <Button size="sm" variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-purple-400">Gerenciar Galeria</CardTitle>
                    <CardDescription className="text-gray-400">
                      Adicione e organize álbuns de fotos
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold">
                    + Novo Álbum
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockGallery.map((album) => (
                    <div key={album.id} className="p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {album.images.slice(0, 3).map((image, idx) => (
                          <img key={idx} src={image} alt={`${album.title} ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{album.title}</h3>
                          <p className="text-sm text-gray-400">{new Date(album.date).toLocaleDateString('pt-BR')} • {album.images.length} fotos</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                            Ver
                          </Button>
                          <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
