import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { getEvents, getNews, getMembers } from '../hooks/useLocalData';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [members, setMembers] = useState([]);
  const [siteStats, setSiteStats] = useState({
    students: '500+',
    events: '50+',
    projects: '15+'
  });

  useEffect(() => {
    // Carrega dados iniciais
    setEvents(getEvents());
    setNews(getNews());
    setMembers(getMembers());
    
    // Carrega estatísticas do site
    const savedStats = localStorage.getItem('app_site_stats');
    if (savedStats) {
      setSiteStats(JSON.parse(savedStats));
    }

    // Escuta mudanças no localStorage
    const handleDataUpdate = () => {
      setEvents(getEvents());
      setNews(getNews());
      setMembers(getMembers());
      const stats = localStorage.getItem('app_site_stats');
      if (stats) {
        setSiteStats(JSON.parse(stats));
      }
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 text-xs sm:text-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Representação Estudantil
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Bem-vindo ao</span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-transparent bg-clip-text">
                  Projeto Futuro
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed">
                O grêmio estudantil que representa você, promove eventos incríveis e constrói um futuro melhor para todos os estudantes.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link to="/eventos">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold w-full sm:w-auto">
                    Ver Eventos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 w-full sm:w-auto">
                    Enviar Sugestão
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">{siteStats.students}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Estudantes</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400">{siteStats.events}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Eventos</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">{siteStats.projects}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Projetos</div>
                </div>
              </div>
            </div>

            {/* Right - Logo */}
            <div className="relative order-first lg:order-last">
              <div className="relative z-10">
                <img 
                  src="https://customer-assets.emergentagent.com/job_gremio-estudantil-1/artifacts/ek4jtwvg_logo%20gremio.jpeg" 
                  alt="Projeto Futuro Logo" 
                  className="w-full max-w-xs sm:max-w-md mx-auto drop-shadow-2xl animate-float"
                />
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-amber-600/30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Nossa Missão</h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
              Representar, unir e promover ações que melhoram a experiência estudantil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-amber-400">Representação</CardTitle>
                <CardDescription className="text-gray-400">
                  Somos a voz dos estudantes junto à direção da escola
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-purple-400">Eventos</CardTitle>
                <CardDescription className="text-gray-400">
                  Organizamos eventos culturais, esportivos e educacionais
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-amber-400">Crescimento</CardTitle>
                <CardDescription className="text-gray-400">
                  Promovemos o desenvolvimento pessoal e coletivo dos estudantes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Próximos Eventos</h2>
              <p className="text-gray-400">Não perca as atividades que preparamos para você</p>
            </div>
            <Link to="/eventos">
              <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/10">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-white/5 border-amber-500/20 backdrop-blur-sm overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-purple-500 text-white">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-amber-400 group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('pt-BR')} • {event.time}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-amber-950/5 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Últimas Notícias</h2>
              <p className="text-sm sm:text-base text-gray-400">Fique por dentro das novidades do grêmio</p>
            </div>
            <Link to="/noticias">
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 text-sm">
                Ver Todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestNews.map((news) => (
              <Card key={news.id} className="bg-white/5 border-purple-500/20 backdrop-blur-sm overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <CardHeader>
                  <Badge className="w-fit bg-amber-500/20 text-amber-300 border-amber-500/30 mb-2">
                    {news.category}
                  </Badge>
                  <CardTitle className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {news.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-xs">
                    Por {news.author} • {new Date(news.date).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{news.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossa Equipe</h2>
            <p className="text-gray-400 text-lg">Conheça quem faz o Projeto Futuro acontecer</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <Card key={member.id} className="bg-white/5 border-amber-500/20 backdrop-blur-sm text-center group hover:border-amber-500/40 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full border-4 border-purple-500/30 group-hover:border-amber-500/50 transition-all duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full p-2">
                      <Award className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  <CardTitle className="text-amber-400">{member.name}</CardTitle>
                  <CardDescription className="text-purple-400 font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-amber-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Contribua com o Projeto Futuro
          </h2>
          <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8">
            Tem sugestões de eventos, melhorias ou ideias? Envie suas contribuições!
          </p>
          <Link to="/contato">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold">
              Enviar Sugestão
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
