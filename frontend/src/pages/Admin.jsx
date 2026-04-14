import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Newspaper, Image, Vote, Users, Edit, Trash2 } from 'lucide-react';
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
  
  const [events, setEvents] = useState(mockEvents);
  const [news, setNews] = useState(mockNews);
  const [polls, setPolls] = useState(mockPolls);
  const [gallery, setGallery] = useState(mockGallery);
  const [teamMembers, setTeamMembers] = useState(mockMembers);
  
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
    if (confirm('Excluir este evento?')) {
      setEvents(events.filter(e => e.id !== id));
      toast.success('Evento excluído!');
    }
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
    if (confirm('Excluir esta notícia?')) {
      setNews(news.filter(n => n.id !== id));
      toast.success('Notícia excluída!');
    }
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
    if (confirm('Excluir esta votação?')) {
      setPolls(polls.filter(p => p.id !== id));
      toast.success('Votação excluída!');
    }
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
    if (confirm('Excluir este álbum?')) {
      setGallery(gallery.filter(g => g.id !== id));
      toast.success('Álbum excluído!');
    }
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
    if (confirm('Remover este membro?')) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
      toast.success('Membro removido!');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Painel <span className="text-amber-400">Administrativo</span>
            </h1>
            <p className="text-gray-400">Bem-vindo, {adminName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
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
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="space-y-8">
          <TabsList className="bg-white/5 border border-purple-500/20">
            <TabsTrigger value="events" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Calendar className="h-4 w-4 mr-2" />Eventos
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-purple-500">
              <Newspaper className="h-4 w-4 mr-2" />Notícias
            </TabsTrigger>
            <TabsTrigger value="polls" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Vote className="h-4 w-4 mr-2" />Votações
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-500">
              <Image className="h-4 w-4 mr-2" />Galeria
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Users className="h-4 w-4 mr-2" />Equipe
            </TabsTrigger>
          </TabsList>

          {/* EVENTOS */}
          <TabsContent value="events">
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-amber-400">Eventos</CardTitle>
                    <CardDescription className="text-gray-400">{events.length} evento(s)</CardDescription>
                  </div>
                  <Button onClick={() => setEventModal({ open: true, data: null })} className="bg-amber-500 hover:bg-amber-600 text-black">
                    + Novo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-amber-500/20">
                      <div className="flex items-center space-x-4">
                        <img src={event.image} alt={event.title} className="h-16 w-16 object-cover rounded" />
                        <div>
                          <h3 className="text-white font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEventModal({ open: true, data: event })} className="border-purple-500/50 text-purple-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteEvent(event.id)} className="border-red-500/50 text-red-400">
                          <Trash2 className="h-4 w-4" />
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-purple-400">Notícias</CardTitle>
                    <CardDescription className="text-gray-400">{news.length} notícia(s)</CardDescription>
                  </div>
                  <Button onClick={() => setNewsModal({ open: true, data: null })} className="bg-purple-500 hover:bg-purple-600">
                    + Nova Notícia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-500/20">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded" />
                        <div>
                          <h3 className="text-white font-semibold">{item.title}</h3>
                          <p className="text-sm text-gray-400">{item.author} • {new Date(item.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setNewsModal({ open: true, data: item })} className="border-amber-500/50 text-amber-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteNews(item.id)} className="border-red-500/50 text-red-400">
                          <Trash2 className="h-4 w-4" />
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-purple-400">Galeria</CardTitle>
                    <CardDescription className="text-gray-400">{gallery.length} álbum(ns)</CardDescription>
                  </div>
                  <Button onClick={() => setGalleryModal({ open: true, data: null })} className="bg-purple-500 hover:bg-purple-600">
                    + Novo Álbum
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {gallery.map((album) => (
                    <div key={album.id} className="p-4 bg-white/5 rounded-lg border border-purple-500/20">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {album.images.slice(0, 3).map((img, i) => (
                          <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded" />
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-semibold">{album.title}</h3>
                          <p className="text-sm text-gray-400">{album.images.length} fotos</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setGalleryModal({ open: true, data: album })} className="border-amber-500/50 text-amber-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteGallery(album.id)} className="border-red-500/50 text-red-400">
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

          {/* EQUIPE */}
          <TabsContent value="team">
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-amber-400">Equipe</CardTitle>
                    <CardDescription className="text-gray-400">{teamMembers.length} membro(s)</CardDescription>
                  </div>
                  <Button onClick={() => setTeamModal({ open: true, data: null })} className="bg-amber-500 hover:bg-amber-600 text-black">
                    + Adicionar Membro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-white/5 rounded-lg border border-amber-500/20 text-center">
                      <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-purple-500/30" />
                      <h3 className="text-white font-semibold">{member.name}</h3>
                      <p className="text-sm text-purple-400 mb-2">{member.role}</p>
                      <div className="flex justify-center space-x-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => setTeamModal({ open: true, data: member })} className="border-purple-500/50 text-purple-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteTeam(member.id)} className="border-red-500/50 text-red-400">
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
