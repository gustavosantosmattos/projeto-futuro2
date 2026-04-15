import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getEvents } from '../hooks/useLocalData';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    setEvents(getEvents());

    const handleDataUpdate = () => {
      setEvents(getEvents());
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, []);

  const categories = ['all', 'Evento Cultural', 'Esporte', 'Educação'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
            Calendário de <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">Eventos</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Participe das atividades e eventos organizados pelo Projeto Futuro
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-amber-500/20 text-white placeholder:text-gray-500 focus:border-amber-500/50"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white/5 border-purple-500/20 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-purple-500/20">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                  {category === 'all' ? 'Todas as Categorias' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-white/5 border-amber-500/20 backdrop-blur-sm overflow-hidden group hover:border-amber-500/40 hover:bg-white/10 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-purple-500 text-white border-none">
                    {event.category}
                  </Badge>
                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 bg-amber-500 text-black px-4 py-2 rounded-lg font-bold">
                    <div className="text-2xl leading-none">{new Date(event.date).getDate()}</div>
                    <div className="text-xs uppercase">
                      {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-amber-400 group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      {event.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Adicionar ao Calendário
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <CalendarIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou buscar por outros termos</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-900/20 to-amber-900/20 border border-amber-500/20 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Tem uma ideia de evento?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Sugestões de eventos são sempre bem-vindas! Entre em contato conosco e vamos tornar sua ideia realidade.
          </p>
          <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            Enviar Sugestão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Events;
