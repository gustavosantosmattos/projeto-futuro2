import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { mockAdminUser } from '../mock';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple mock authentication
    if (formData.email === mockAdminUser.email && formData.password === mockAdminUser.password) {
      toast.success('Login realizado com sucesso!');
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminName', mockAdminUser.name);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      toast.error('E-mail ou senha incorretos', {
        description: 'Verifique suas credenciais e tente novamente.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-amber-900/20"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_gremio-estudantil-1/artifacts/5gz13s7c_Design%20sem%20nome.png" 
            alt="Projeto Futuro" 
            className="h-20 w-20 sm:h-24 sm:w-24 object-contain mx-auto mb-3 sm:mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Área Administrativa</h1>
          <p className="text-sm sm:text-base text-gray-400">Entre com suas credenciais</p>
        </div>

        <Card className="bg-white/5 border-purple-500/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-amber-400 flex items-center">
              <LogIn className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
              Login
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Acesso exclusivo para membros do grêmio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-500/50 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
          >
            ← Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
