import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-transparent rounded-lg p-1">
                <img 
                  src="https://customer-assets.emergentagent.com/job_gremio-estudantil-1/artifacts/5gz13s7c_Design%20sem%20nome.png" 
                  alt="Projeto Futuro" 
                  className="h-14 w-14 object-contain"
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>
              <div>
                <h3 className="text-amber-400 font-bold text-lg">PROJETO FUTURO</h3>
                <p className="text-purple-400 text-xs">Grêmio Estudantil</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Representando os estudantes, construindo o futuro juntos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/eventos" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/votacao" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  Votação
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  Sugestões
                </Link>
              </li>
            </ul>
          </div>

          {/* About Grêmio */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Sobre o Grêmio</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              O Projeto Futuro é o grêmio estudantil comprometido em representar todos os estudantes, 
              promovendo eventos, atividades e melhorias para nossa comunidade escolar.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-amber-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} Projeto Futuro - Grêmio Estudantil. Todos os direitos reservados.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-center">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-center">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
