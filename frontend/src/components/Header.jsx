import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Newspaper, Image, Vote, Mail, LogIn, Home } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Eventos', href: '/eventos', icon: Calendar },
    { name: 'Notícias', href: '/noticias', icon: Newspaper },
    { name: 'Galeria', href: '/galeria', icon: Image },
    { name: 'Votação', href: '/votacao', icon: Vote },
    { name: 'Sugestões', href: '/contato', icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative bg-transparent rounded-lg p-1">
              <img 
                src="https://customer-assets.emergentagent.com/job_gremio-estudantil-1/artifacts/7190a6lg_logo%20gremio.jpeg" 
                alt="Projeto Futuro" 
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-xl font-bold text-amber-400 tracking-wider">PROJETO FUTURO</h1>
              <p className="text-xs text-purple-400">Grêmio Estudantil</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                      : 'text-gray-300 hover:text-amber-400 hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link to="/login">
              <Button 
                variant="outline" 
                className="ml-4 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-amber-400 hover:bg-white/5 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-amber-500/20">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                        : 'text-gray-300 hover:text-amber-400 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
