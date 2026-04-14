import React, { useState } from 'react';
import { Vote, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { mockPolls } from '../mock';

const Voting = () => {
  const [votes, setVotes] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleVote = (pollId) => {
    const selectedOption = selectedOptions[pollId];
    if (!selectedOption) {
      toast.error('Selecione uma opção antes de votar');
      return;
    }

    setVotes({ ...votes, [pollId]: selectedOption });
    toast.success('Voto registrado com sucesso!', {
      description: 'Obrigado por participar.'
    });
  };

  const hasVoted = (pollId) => !!votes[pollId];

  const calculatePercentage = (votes, total) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const activePolls = mockPolls.filter(poll => poll.status === 'active');
  const closedPolls = mockPolls.filter(poll => poll.status === 'closed');

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Sistema de <span className="bg-gradient-to-r from-purple-400 to-amber-600 text-transparent bg-clip-text">Votação</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sua opinião importa! Participe das enquetes e votações do grêmio
          </p>
        </div>

        {/* Active Polls */}
        {activePolls.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Clock className="h-6 w-6 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Votações Ativas</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {activePolls.map((poll) => (
                <Card key={poll.id} className="bg-white/5 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-amber-500 text-black">
                        <Vote className="h-3 w-3 mr-1" />
                        Ativa
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        Termina em {new Date(poll.endDate).toLocaleDateString('pt-BR')}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-purple-400">{poll.title}</CardTitle>
                    <CardDescription className="text-gray-400">{poll.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!hasVoted(poll.id) ? (
                      <>
                        <RadioGroup
                          value={selectedOptions[poll.id] || ''}
                          onValueChange={(value) => setSelectedOptions({ ...selectedOptions, [poll.id]: value })}
                        >
                          <div className="space-y-3">
                            {poll.options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 cursor-pointer"
                              >
                                <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} className="border-amber-500 text-amber-500" />
                                <Label htmlFor={`${poll.id}-${option.id}`} className="flex-1 text-white cursor-pointer">
                                  {option.text}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        <Button
                          onClick={() => handleVote(poll.id)}
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
                        >
                          <Vote className="h-4 w-4 mr-2" />
                          Confirmar Voto
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-semibold">Você já votou nesta enquete</span>
                        </div>
                        {poll.options.map((option) => {
                          const percentage = calculatePercentage(option.votes, poll.totalVotes);
                          const isUserChoice = votes[poll.id] === option.id;
                          return (
                            <div key={option.id} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className={`text-sm font-medium ${isUserChoice ? 'text-amber-400' : 'text-gray-400'}`}>
                                  {option.text} {isUserChoice && '(Seu voto)'}
                                </span>
                                <span className="text-sm font-bold text-purple-400">{percentage}%</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                              <span className="text-xs text-gray-500">{option.votes} votos</span>
                            </div>
                          );
                        })}
                        <div className="text-sm text-gray-400 text-center pt-2">
                          Total de {poll.totalVotes} votos
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Closed Polls */}
        {closedPolls.length > 0 && (
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Resultados Anteriores</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {closedPolls.map((poll) => (
                <Card key={poll.id} className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit border-gray-600 text-gray-400 mb-2">
                      Encerrada
                    </Badge>
                    <CardTitle className="text-xl text-amber-400">{poll.title}</CardTitle>
                    <CardDescription className="text-gray-400">{poll.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {poll.options.map((option, index) => {
                      const percentage = calculatePercentage(option.votes, poll.totalVotes);
                      const isWinner = option.votes === Math.max(...poll.options.map(o => o.votes));
                      return (
                        <div key={option.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-medium ${isWinner ? 'text-amber-400 flex items-center' : 'text-gray-400'}`}>
                              {option.text}
                              {isWinner && <Badge className="ml-2 bg-amber-500 text-black text-xs">Vencedor</Badge>}
                            </span>
                            <span className="text-sm font-bold text-purple-400">{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                    <div className="text-sm text-gray-400 text-center pt-2 border-t border-gray-700">
                      {poll.totalVotes} votos totais
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-20 bg-gradient-to-r from-amber-900/20 to-purple-900/20 border border-amber-500/20 rounded-2xl p-12">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Como funciona?</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Cada estudante pode votar uma vez em cada enquete ativa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Os resultados são atualizados em tempo real após o voto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Votações encerradas mostram os resultados finais para todos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Sua participação ajuda o grêmio a tomar as melhores decisões</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
