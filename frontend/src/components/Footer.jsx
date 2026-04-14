import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_gremio-estudantil-1/artifacts/ek4jtwvg_logo%20gremio.jpeg" 
                alt="Projeto Futuro" 
                className="h-12 w-12 object-contain"
              />
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
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Rua da Escola, 123<br />Centro - Cidade, Estado</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span>contato@projetofuturo.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Redes Sociais</h4>
            <p className="text-gray-400 text-sm mb-4">
              Siga-nos e fique por dentro de tudo!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-amber-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Projeto Futuro - Grêmio Estudantil. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
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
