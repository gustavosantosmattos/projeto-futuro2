import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Newspaper, Image, Vote, Users, Settings, TrendingUp, Eye, Trash2, Edit, Mail, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { mockEvents, mockNews, mockPolls, mockGallery, mockMembers } from '../mock';
import EventFormModal from '../components/EventFormModal';
import NewsFormModal from '../components/NewsFormModal';
import PollFormModal from '../components/PollFormModal';
import GalleryFormModal from '../components/GalleryFormModal';
import TeamFormModal from '../components/TeamFormModal';

const Admin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  
  // State for data
  const [events, setEvents] = useState(mockEvents);
  const [news, setNews] = useState(mockNews);
  const [polls, setPolls] = useState(mockPolls);
  const [gallery, setGallery] = useState(mockGallery);
  const [teamMembers, setTeamMembers] = useState(mockMembers);
  
  // State for modals
  const [eventModal, setEventModal] = useState({ open: false, data: null });
  const [newsModal, setNewsModal] = useState({ open: false, data: null });
  const [pollModal, setPollModal] = useState({ open: false, data: null });
  const [galleryModal, setGalleryModal] = useState({ open: false, data: null });
  const [teamModal, setTeamModal] = useState({ open: false, data: null });

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

  // Event handlers
  const handleSaveEvent = (event) => {
    const existingIndex = events.findIndex(e => e.id === event.id);
    if (existingIndex >= 0) {
      const newEvents = [...events];
      newEvents[existingIndex] = event;
      setEvents(newEvents);
    } else {
      setEvents([...events, event]);
    }
    setEventModal({ open: false, data: null });
  };

  const handleDeleteEvent = (eventId) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      setEvents(events.filter(e => e.id !== eventId));
      toast.success('Evento excluído com sucesso!');
    }
  };

  const handleSaveNews = (newsItem) => {
    const existingIndex = news.findIndex(n => n.id === newsItem.id);
    if (existingIndex >= 0) {
      const newNews = [...news];
      newNews[existingIndex] = newsItem;
      setNews(newNews);
    } else {
      setNews([...news, newsItem]);
    }
    setNewsModal({ open: false, data: null });
  };

  const handleDeleteNews = (newsId) => {
    if (confirm('Tem certeza que deseja excluir esta notícia?')) {
      setNews(news.filter(n => n.id !== newsId));
      toast.success('Notícia excluída com sucesso!');
    }
  };

  const handleSavePoll = (poll) => {
    const existingIndex = polls.findIndex(p => p.id === poll.id);
    if (existingIndex >= 0) {
      const newPolls = [...polls];
      newPolls[existingIndex] = poll;
      setPolls(newPolls);
    } else {
      setPolls([...polls, poll]);
    }
    setPollModal({ open: false, data: null });
  };

  const handleDeletePoll = (pollId) => {
    if (confirm('Tem certeza que deseja excluir esta votação?')) {
      setPolls(polls.filter(p => p.id !== pollId));
      toast.success('Votação excluída com sucesso!');
    }
  };

  const handleSaveGallery = (album) => {
    const existingIndex = gallery.findIndex(g => g.id === album.id);
    if (existingIndex >= 0) {
      const newGallery = [...gallery];
      newGallery[existingIndex] = album;
      setGallery(newGallery);
    } else {
      setGallery([...gallery, album]);
    }
    setGalleryModal({ open: false, data: null });
  };

  const handleDeleteGallery = (albumId) => {
    if (confirm('Tem certeza que deseja excluir este álbum?')) {
      setGallery(gallery.filter(g => g.id !== albumId));
      toast.success('Álbum excluído com sucesso!');
    }
  };

  const handleSaveTeamMember = (member) => {
    const existingIndex = teamMembers.findIndex(m => m.id === member.id);
    if (existingIndex >= 0) {
      const newMembers = [...teamMembers];
      newMembers[existingIndex] = member;
      setTeamMembers(newMembers);
    } else {
      setTeamMembers([...teamMembers, member]);
    }
    setTeamModal({ open: false, data: null });
  };

  const handleDeleteTeamMember = (memberId) => {
    if (confirm('Tem certeza que deseja remover este membro?')) {
      setTeamMembers(teamMembers.filter(m => m.id !== memberId));
      toast.success('Membro removido com sucesso!');
    }
  };

  const stats = [
    {
      title: 'Total de Eventos',
      value: events.length,
      icon: Calendar,
      color: 'amber',
      change: '+3 este mês'
    },
    {
      title: 'Notícias Publicadas',
      value: news.length,
      icon: Newspaper,
      color: 'purple',
      change: '+1 esta semana'
    },
    {
      title: 'Votações Ativas',
      value: polls.filter(p => p.status === 'active').length,
      icon: Vote,
      color: 'amber',
      change: `${polls.filter(p => p.status === 'closed').length} encerradas`
    },
    {
      title: 'Membros da Equipe',
      value: teamMembers.length,
      icon: Users,
      color: 'purple',
      change: `${gallery.length} álbuns`
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
            const colorClass = stat.color === 'amber' ? 'text-amber-400' : 'text-purple-400';
            const borderClass = stat.color === 'amber' ? 'border-amber-500/20' : 'border-purple-500/20';
            return (
              <Card key={index} className={`bg-white/5 ${borderClass} backdrop-blur-sm hover:border-${stat.color}-500/40 transition-all duration-300`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${colorClass}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${colorClass} mb-1`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">{stat.change}</p>
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
            <TabsTrigger value="team" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Users className="h-4 w-4 mr-2" />
              Equipe
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
                      {events.length} evento(s) cadastrado(s)
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setEventModal({ open: true, data: null })}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  >
                    + Novo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all">
                      <div className="flex items-center space-x-4">
                        <img src={event.image} alt={event.title} className="h-16 w-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-white font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR')} • {event.location}</p>
                          <Badge className="mt-1 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button"
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEventModal({ open: true, data: event })}
                          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button"
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteEvent(event.id)}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
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
                      {news.length} notícia(s) publicada(s)
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setNewsModal({ open: true, data: null })}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
                  >
                    + Nova Notícia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((newsItem) => (
                    <div key={newsItem.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <div className="flex items-center space-x-4">
                        <img src={newsItem.image} alt={newsItem.title} className="h-16 w-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-white font-semibold">{newsItem.title}</h3>
                          <p className="text-sm text-gray-400">Por {newsItem.author} • {new Date(newsItem.date).toLocaleDateString('pt-BR')}</p>
                          <Badge className="mt-1 bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                            {newsItem.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button"
                          size="sm" 
                          variant="outline" 
                          onClick={() => setNewsModal({ open: true, data: newsItem })}
                          className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button"
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteNews(newsItem.id)}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
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
                      {polls.length} votação(ões) criada(s)
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setPollModal({ open: true, data: null })}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  >
                    + Nova Votação
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {polls.map((poll) => (
                    <div key={poll.id} className="p-4 bg-white/5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
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
                          <Button 
                            type="button"
                            size="sm" 
                            variant="outline" 
                            onClick={() => setPollModal({ open: true, data: poll })}
                            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button"
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeletePoll(poll.id)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
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
                      {gallery.length} álbum(ns) criado(s)
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setGalleryModal({ open: true, data: null })}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
                  >
                    + Novo Álbum
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {gallery.map((album) => (
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
                          <Button 
                            type="button"
                            size="sm" 
                            variant="outline" 
                            onClick={() => setGalleryModal({ open: true, data: album })}
                            className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button"
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteGallery(album.id)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-amber-400">Gerenciar Equipe</CardTitle>
                    <CardDescription className="text-gray-400">
                      {teamMembers.length} membro(s) na equipe
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setTeamModal({ open: true, data: null })}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  >
                    + Adicionar Membro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-white/5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-full h-full object-cover rounded-full border-4 border-purple-500/30"
                        />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                      <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {member.role}
                      </Badge>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{member.bio}</p>
                      <div className="flex items-center justify-center space-x-2">
                        <Button 
                          type="button"
                          size="sm" 
                          variant="outline" 
                          onClick={() => setTeamModal({ open: true, data: member })}
                          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button"
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteTeamMember(member.id)}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <EventFormModal 
          open={eventModal.open} 
          onClose={() => setEventModal({ open: false, data: null })}
          event={eventModal.data}
          onSave={handleSaveEvent}
        />
        <NewsFormModal 
          open={newsModal.open} 
          onClose={() => setNewsModal({ open: false, data: null })}
          news={newsModal.data}
          onSave={handleSaveNews}
        />
        <PollFormModal 
          open={pollModal.open} 
          onClose={() => setPollModal({ open: false, data: null })}
          poll={pollModal.data}
          onSave={handleSavePoll}
        />
        <GalleryFormModal 
          open={galleryModal.open} 
          onClose={() => setGalleryModal({ open: false, data: null })}
          album={galleryModal.data}
          onSave={handleSaveGallery}
        />
        <TeamFormModal 
          open={teamModal.open} 
          onClose={() => setTeamModal({ open: false, data: null })}
          member={teamModal.data}
          onSave={handleSaveTeamMember}
        />
      </div>
    </div>
  );
};

export default Admin;
