import React, { useState, useEffect } from 'react';
import { Newspaper, Search, Filter, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getNews } from '../hooks/useLocalData';

const News = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    setNews(getNews());

    const handleDataUpdate = () => {
      setNews(getNews());
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, []);

  const categories = ['all', 'Conquistas', 'Infraestrutura', 'Ação Social'];

  const filteredNews = news.filter(newsItem => {
    const matchesSearch = newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsItem.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || newsItem.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">Notícias</span> e Atualizações
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fique por dentro de tudo que acontece no Projeto Futuro
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white/5 border-amber-500/20 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-amber-500/20">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                  {category === 'all' ? 'Todas as Categorias' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured News */}
        {filteredNews.length > 0 && (
          <Card className="mb-12 bg-white/5 border-purple-500/20 backdrop-blur-sm overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={filteredNews[0].image} 
                  alt={filteredNews[0].title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                <Badge className="absolute top-6 left-6 bg-amber-500 text-black border-none">
                  Destaque
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
                  {filteredNews[0].category}
                </Badge>
                <CardTitle className="text-3xl text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                  {filteredNews[0].title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {filteredNews[0].author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(filteredNews[0].date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {filteredNews[0].excerpt}
                </p>
                <Button className="w-fit bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  Ler Mais
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* News Grid */}
        {filteredNews.length > 1 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.slice(1).map((news) => (
              <Card key={news.id} className="bg-white/5 border-purple-500/20 backdrop-blur-sm overflow-hidden group hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                    {news.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-purple-400 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {news.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {news.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(news.date).toLocaleDateString('pt-BR')}
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
                  <Button variant="outline" className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                    Ler Notícia Completa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou buscar por outros termos</p>
          </div>
        ) : null}

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-r from-amber-900/20 to-purple-900/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <Newspaper className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Não perca nenhuma atualização
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Siga-nos nas redes sociais e fique por dentro de todas as novidades do Projeto Futuro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu e-mail..."
              className="bg-white/5 border-amber-500/20 text-white placeholder:text-gray-500"
            />
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold whitespace-nowrap">
              Inscrever-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
