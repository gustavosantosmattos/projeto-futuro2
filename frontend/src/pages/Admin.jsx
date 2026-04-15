import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Newspaper, Image, Vote, Users, Edit, Trash2, Lightbulb, CheckCircle, X, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { useLocalData, initializeLocalStorage } from '../hooks/useLocalData';
import EventFormModal from '../components/EventFormModal';
import NewsFormModal from '../components/NewsFormModal';
import PollFormModal from '../components/PollFormModal';
import GalleryFormModal from '../components/GalleryFormModal';
import TeamFormModal from '../components/TeamFormModal';

const Admin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  
  // Inicializa localStorage na primeira vez
  useEffect(() => {
    initializeLocalStorage();
  }, []);
  
  const [events, setEvents] = useLocalData('app_events', []);
  const [news, setNews] = useLocalData('app_news', []);
  const [polls, setPolls] = useLocalData('app_polls', []);
  const [gallery, setGallery] = useLocalData('app_gallery', []);
  const [teamMembers, setTeamMembers] = useLocalData('app_members', []);
  
  const [suggestions, setSuggestions] = useState([]);
  const [siteStats, setSiteStats] = useState({
    students: '500+',
    events: '50+',
    projects: '15+'
  });
  
  useEffect(() => {
    const loadSuggestions = () => {
      const saved = localStorage.getItem('app_suggestions');
      setSuggestions(saved ? JSON.parse(saved) : []);
    };
    const loadSiteStats = () => {
      const saved = localStorage.getItem('app_site_stats');
      if (saved) {
        setSiteStats(JSON.parse(saved));
      }
    };
    loadSuggestions();
    loadSiteStats();
    
    const handleUpdate = () => {
      loadSuggestions();
      loadSiteStats();
    };
    window.addEventListener('storage', handleUpdate);
    return () => window.removeEventListener('storage', handleUpdate);
  }, []);
  
  const [eventModal, setEventModal] = useState({ open: false, data: null });
  const [newsModal, setNewsModal] = useState({ open: false, data: null });
  const [pollModal, setPollModal] = useState({ open: false, data: null });
  const [galleryModal, setGalleryModal] = useState({ open: false, data: null });
  const [teamModal, setTeamModal] = useState({ open: false, data: null });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    const name = localStorage.getItem('adminName');
    
    if (!isAdmin) {
      toast.error('Acesso negado');
      navigate('/login');
    } else {
      setAdminName(name || 'Administrador');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminName');
    toast.success('Logout realizado');
    navigate('/');
  };

  // EVENTOS
  const saveEvent = (event) => {
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      const newEvents = [...events];
      newEvents[index] = event;
      setEvents(newEvents);
      toast.success('Evento atualizado!');
    } else {
      setEvents([event, ...events]);
      toast.success('Evento criado!');
    }
    setEventModal({ open: false, data: null });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success('Evento excluído!');
  };

  // NOTÍCIAS
  const saveNews = (item) => {
    const index = news.findIndex(n => n.id === item.id);
    if (index >= 0) {
      const newNews = [...news];
      newNews[index] = item;
      setNews(newNews);
      toast.success('Notícia atualizada!');
    } else {
      setNews([item, ...news]);
      toast.success('Notícia publicada!');
    }
    setNewsModal({ open: false, data: null });
  };

  const deleteNews = (id) => {
    setNews(news.filter(n => n.id !== id));
    toast.success('Notícia excluída!');
  };

  // VOTAÇÕES
  const savePoll = (poll) => {
    const index = polls.findIndex(p => p.id === poll.id);
    if (index >= 0) {
      const newPolls = [...polls];
      newPolls[index] = poll;
      setPolls(newPolls);
      toast.success('Votação atualizada!');
    } else {
      setPolls([poll, ...polls]);
      toast.success('Votação criada!');
    }
    setPollModal({ open: false, data: null });
  };

  const deletePoll = (id) => {
    setPolls(polls.filter(p => p.id !== id));
    toast.success('Votação excluída!');
  };

  // GALERIA
  const saveGallery = (album) => {
    const index = gallery.findIndex(g => g.id === album.id);
    if (index >= 0) {
      const newGallery = [...gallery];
      newGallery[index] = album;
      setGallery(newGallery);
      toast.success('Álbum atualizado!');
    } else {
      setGallery([album, ...gallery]);
      toast.success('Álbum criado!');
    }
    setGalleryModal({ open: false, data: null });
  };

  const deleteGallery = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
    toast.success('Álbum excluído!');
  };

  // EQUIPE
  const saveTeam = (member) => {
    const index = teamMembers.findIndex(m => m.id === member.id);
    if (index >= 0) {
      const newMembers = [...teamMembers];
      newMembers[index] = member;
      setTeamMembers(newMembers);
      toast.success('Membro atualizado!');
    } else {
      setTeamMembers([member, ...teamMembers]);
      toast.success('Membro adicionado!');
    }
    setTeamModal({ open: false, data: null });
  };

  const deleteTeam = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    toast.success('Membro removido!');
  };

  const deleteSuggestion = (id) => {
    const updated = suggestions.filter(s => s.id !== id);
    setSuggestions(updated);
    localStorage.setItem('app_suggestions', JSON.stringify(updated));
    toast.success('Sugestão removida!');
  };

  const markSuggestionAsRead = (id) => {
    const updated = suggestions.map(s => 
      s.id === id ? { ...s, status: 'Lida' } : s
    );
    setSuggestions(updated);
    localStorage.setItem('app_suggestions', JSON.stringify(updated));
    toast.success('Marcada como lida!');
  };

  const updateSiteStats = (newStats) => {
    setSiteStats(newStats);
    localStorage.setItem('app_site_stats', JSON.stringify(newStats));
    window.dispatchEvent(new Event('storage'));
    toast.success('Estatísticas atualizadas!');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
              Painel <span className="text-amber-400">Administrativo</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Bem-vindo, {adminName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 text-sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <Card className="bg-white/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Eventos</CardTitle>
              <Calendar className="h-5 w-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-400">{events.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Notícias</CardTitle>
              <Newspaper className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{news.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Votações</CardTitle>
              <Vote className="h-5 w-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-400">{polls.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Equipe</CardTitle>
              <Users className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{teamMembers.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Sugestões</CardTitle>
              <Lightbulb className="h-5 w-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-400">{suggestions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="space-y-6 sm:space-y-8">
          <TabsList className="bg-white/5 border border-purple-500/20 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="events" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-xs sm:text-sm flex-1 sm:flex-initial">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Eventos</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-purple-500 text-xs sm:text-sm flex-1 sm:flex-initial">
              <Newspaper className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Notícias</span>
            </TabsTrigger>
            <TabsTrigger value="polls" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-xs sm:text-sm flex-1 sm:flex-initial">
              <Vote className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Votações</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-500 text-xs sm:text-sm flex-1 sm:flex-initial">
              <Image className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Galeria</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-xs sm:text-sm flex-1 sm:flex-initial">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Equipe</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="data-[state=active]:bg-purple-500 text-xs sm:text-sm flex-1 sm:flex-initial">
              <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sugestões</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-xs sm:text-sm flex-1 sm:flex-initial">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          {/* EVENTOS */}
          <TabsContent value="events">
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-amber-400">Eventos</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{events.length} evento(s)</CardDescription>
                  </div>
                  <Button onClick={() => setEventModal({ open: true, data: null })} className="bg-amber-500 hover:bg-amber-600 text-black text-sm w-full sm:w-auto">
                    + Novo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-amber-500/20 gap-3">
                      <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <img src={event.image} alt={event.title} className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">{event.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" onClick={() => setEventModal({ open: true, data: event })} className="border-purple-500/50 text-purple-400 flex-1 sm:flex-initial">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteEvent(event.id)} className="border-red-500/50 text-red-400 flex-1 sm:flex-initial">
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTÍCIAS */}
          <TabsContent value="news">
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-purple-400">Notícias</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{news.length} notícia(s)</CardDescription>
                  </div>
                  <Button onClick={() => setNewsModal({ open: true, data: null })} className="bg-purple-500 hover:bg-purple-600 text-sm w-full sm:w-auto">
                    + Nova Notícia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-purple-500/20 gap-3">
                      <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <img src={item.image} alt={item.title} className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">{item.author} • {new Date(item.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" onClick={() => setNewsModal({ open: true, data: item })} className="border-amber-500/50 text-amber-400 flex-1 sm:flex-initial">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteNews(item.id)} className="border-red-500/50 text-red-400 flex-1 sm:flex-initial">
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VOTAÇÕES */}
          <TabsContent value="polls">
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-amber-400">Votações</CardTitle>
                    <CardDescription className="text-gray-400">{polls.length} votação(ões)</CardDescription>
                  </div>
                  <Button onClick={() => setPollModal({ open: true, data: null })} className="bg-amber-500 hover:bg-amber-600 text-black">
                    + Nova Votação
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {polls.map((poll) => (
                    <div key={poll.id} className="p-4 bg-white/5 rounded-lg border border-amber-500/20">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{poll.title}</h3>
                          <p className="text-sm text-gray-400">{poll.totalVotes} votos</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setPollModal({ open: true, data: poll })} className="border-purple-500/50 text-purple-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deletePoll(poll.id)} className="border-red-500/50 text-red-400">
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

          {/* GALERIA */}
          <TabsContent value="gallery">
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-purple-400">Galeria</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{gallery.length} álbum(ns)</CardDescription>
                  </div>
                  <Button onClick={() => setGalleryModal({ open: true, data: null })} className="bg-purple-500 hover:bg-purple-600 text-sm w-full sm:w-auto">
                    + Novo Álbum
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {gallery.map((album) => (
                    <div key={album.id} className="p-3 sm:p-4 bg-white/5 rounded-lg border border-purple-500/20">
                      <div className="grid grid-cols-3 gap-2 mb-3 sm:mb-4">
                        {album.images.slice(0, 3).map((img, i) => (
                          <img key={i} src={img} alt="" className="w-full h-20 sm:h-24 object-cover rounded" />
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <h3 className="text-white font-semibold text-sm sm:text-base">{album.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-400">{album.images.length} fotos</p>
                        </div>
                        <div className="flex space-x-2 w-full sm:w-auto">
                          <Button size="sm" variant="outline" onClick={() => setGalleryModal({ open: true, data: album })} className="border-amber-500/50 text-amber-400 flex-1 sm:flex-initial">
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteGallery(album.id)} className="border-red-500/50 text-red-400 flex-1 sm:flex-initial">
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EQUIPE */}
          <TabsContent value="team">
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-amber-400">Equipe</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{teamMembers.length} membro(s)</CardDescription>
                  </div>
                  <Button onClick={() => setTeamModal({ open: true, data: null })} className="bg-amber-500 hover:bg-amber-600 text-black text-sm w-full sm:w-auto">
                    + Adicionar Membro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-white/5 rounded-lg border border-amber-500/20 text-center">
                      <img src={member.photo} alt={member.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 border-2 border-purple-500/30" />
                      <h3 className="text-white font-semibold text-sm sm:text-base">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-purple-400 mb-2">{member.role}</p>
                      <div className="flex justify-center space-x-2 mt-3 sm:mt-4">
                        <Button size="sm" variant="outline" onClick={() => setTeamModal({ open: true, data: member })} className="border-purple-500/50 text-purple-400">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteTeam(member.id)} className="border-red-500/50 text-red-400">
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUGESTÕES */}
          <TabsContent value="suggestions">
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-purple-400">Sugestões Recebidas</CardTitle>
                  <CardDescription className="text-sm text-gray-400">{suggestions.length} sugestão(ões)</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {suggestions.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {suggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 sm:p-4 bg-white/5 rounded-lg border border-purple-500/20">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                          <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={suggestion.status === 'Lida' ? 'bg-green-500 text-xs' : 'bg-amber-500 text-xs'}>
                                {suggestion.category}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(suggestion.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{suggestion.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-400 mb-2">{suggestion.email}</p>
                            <p className="text-gray-300 text-xs sm:text-sm break-words">{suggestion.message}</p>
                          </div>
                          <div className="flex space-x-2 w-full sm:w-auto">
                            {suggestion.status !== 'Lida' && (
                              <Button size="sm" variant="outline" onClick={() => markSuggestionAsRead(suggestion.id)} className="border-green-500/50 text-green-400 flex-1 sm:flex-initial">
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => deleteSuggestion(suggestion.id)} className="border-red-500/50 text-red-400 flex-1 sm:flex-initial">
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <Lightbulb className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-2">Nenhuma sugestão ainda</h3>
                    <p className="text-sm sm:text-base text-gray-500">As sugestões enviadas pelos estudantes aparecerão aqui</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONFIGURAÇÕES */}
          <TabsContent value="settings">
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-400">Configurações do Site</CardTitle>
                <CardDescription className="text-gray-400">
                  Edite as estatísticas que aparecem na página inicial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    updateSiteStats({
                      students: formData.get('students'),
                      events: formData.get('events'),
                      projects: formData.get('projects')
                    });
                  }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-semibold">Número de Estudantes</label>
                      <Input
                        name="students"
                        defaultValue={siteStats.students}
                        placeholder="Ex: 500+"
                        className="bg-white/5 border-purple-500/20 text-white text-2xl font-bold"
                      />
                      <p className="text-xs text-gray-500">Aparece na seção de estatísticas da página inicial</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-semibold">Número de Eventos</label>
                      <Input
                        name="events"
                        defaultValue={siteStats.events}
                        placeholder="Ex: 50+"
                        className="bg-white/5 border-purple-500/20 text-white text-2xl font-bold"
                      />
                      <p className="text-xs text-gray-500">Total de eventos realizados</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-semibold">Número de Projetos</label>
                      <Input
                        name="projects"
                        defaultValue={siteStats.projects}
                        placeholder="Ex: 15+"
                        className="bg-white/5 border-purple-500/20 text-white text-2xl font-bold"
                      />
                      <p className="text-xs text-gray-500">Projetos desenvolvidos pelo grêmio</p>
                    </div>

                    <Button type="submit" className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold">
                      Salvar Configurações
                    </Button>
                  </form>

                  <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-2">Preview</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-400">{siteStats.students}</div>
                        <div className="text-sm text-gray-400">Estudantes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{siteStats.events}</div>
                        <div className="text-sm text-gray-400">Eventos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-400">{siteStats.projects}</div>
                        <div className="text-sm text-gray-400">Projetos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <EventFormModal open={eventModal.open} onClose={() => setEventModal({ open: false, data: null })} event={eventModal.data} onSave={saveEvent} />
        <NewsFormModal open={newsModal.open} onClose={() => setNewsModal({ open: false, data: null })} news={newsModal.data} onSave={saveNews} />
        <PollFormModal open={pollModal.open} onClose={() => setPollModal({ open: false, data: null })} poll={pollModal.data} onSave={savePoll} />
        <GalleryFormModal open={galleryModal.open} onClose={() => setGalleryModal({ open: false, data: null })} album={galleryModal.data} onSave={saveGallery} />
        <TeamFormModal open={teamModal.open} onClose={() => setTeamModal({ open: false, data: null })} member={teamModal.data} onSave={saveTeam} />
      </div>
    </div>
  );
};

export default Admin;
