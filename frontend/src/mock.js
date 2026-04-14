// Mock data for Projeto Futuro - Grêmio Estudantil

export const mockMembers = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Presidente',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Liderando o grêmio com dedicação e compromisso com os estudantes.'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    role: 'Vice-Presidente',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Trabalhando para melhorar a experiência estudantil.'
  },
  {
    id: '3',
    name: 'Maria Costa',
    role: 'Secretária',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Organizando e documentando todas as atividades do grêmio.'
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    role: 'Tesoureiro',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Gerenciando os recursos do grêmio com transparência.'
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Festa Junina 2024',
    date: '2024-06-15',
    time: '18:00',
    location: 'Quadra da Escola',
    description: 'Grande festa junina com comidas típicas, quadrilha e muita diversão!',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
    category: 'Evento Cultural'
  },
  {
    id: '2',
    title: 'Campeonato de Futsal',
    date: '2024-06-20',
    time: '14:00',
    location: 'Ginásio Esportivo',
    description: 'Torneio entre as turmas. Inscrições abertas!',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop',
    category: 'Esporte'
  },
  {
    id: '3',
    title: 'Palestra sobre Sustentabilidade',
    date: '2024-06-25',
    time: '10:00',
    location: 'Auditório Principal',
    description: 'Aprenda sobre práticas sustentáveis e como podemos ajudar o meio ambiente.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    category: 'Educação'
  },
  {
    id: '4',
    title: 'Show de Talentos',
    date: '2024-07-05',
    time: '19:00',
    location: 'Teatro da Escola',
    description: 'Mostre seu talento! Canto, dança, teatro e muito mais.',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&h=600&fit=crop',
    category: 'Evento Cultural'
  }
];

export const mockNews = [
  {
    id: '1',
    title: 'Grêmio Projeto Futuro Vence Prêmio Estadual',
    date: '2024-06-01',
    author: 'Ana Silva',
    excerpt: 'Nosso grêmio foi reconhecido como o melhor do estado pela inovação em projetos estudantis.',
    content: 'Estamos orgulhosos em anunciar que o Grêmio Projeto Futuro foi premiado como o melhor grêmio estudantil do estado...',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    category: 'Conquistas'
  },
  {
    id: '2',
    title: 'Nova Sala de Estudos Inaugurada',
    date: '2024-05-28',
    author: 'Carlos Santos',
    excerpt: 'Espaço moderno e confortável para estudos em grupo já está disponível.',
    content: 'Graças ao esforço do grêmio e apoio da direção, inauguramos uma nova sala de estudos equipada...',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop',
    category: 'Infraestrutura'
  },
  {
    id: '3',
    title: 'Campanha de Arrecadação de Alimentos',
    date: '2024-05-20',
    author: 'Maria Costa',
    excerpt: 'Juntos, arrecadamos mais de 500kg de alimentos para famílias carentes.',
    content: 'A campanha solidária do Projeto Futuro superou todas as expectativas...',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
    category: 'Ação Social'
  }
];

export const mockPolls = [
  {
    id: '1',
    title: 'Qual tema para a próxima festa?',
    description: 'Vote no tema que você mais gostaria para nossa próxima festa.',
    endDate: '2024-06-30',
    status: 'active',
    options: [
      { id: 'opt1', text: 'Anos 80', votes: 45 },
      { id: 'opt2', text: 'Neon Party', votes: 67 },
      { id: 'opt3', text: 'Hawaiian', votes: 32 },
      { id: 'opt4', text: 'Black & White', votes: 28 }
    ],
    totalVotes: 172
  },
  {
    id: '2',
    title: 'Horário preferido para eventos',
    description: 'Qual horário você prefere para os eventos do grêmio?',
    endDate: '2024-06-25',
    status: 'active',
    options: [
      { id: 'opt1', text: 'Manhã (9h-12h)', votes: 23 },
      { id: 'opt2', text: 'Tarde (14h-17h)', votes: 56 },
      { id: 'opt3', text: 'Noite (18h-21h)', votes: 89 }
    ],
    totalVotes: 168
  },
  {
    id: '3',
    title: 'Melhor iniciativa de 2024',
    description: 'Qual projeto do grêmio você mais gostou este ano?',
    endDate: '2024-05-30',
    status: 'closed',
    options: [
      { id: 'opt1', text: 'Sala de Estudos', votes: 78 },
      { id: 'opt2', text: 'Campanha Solidária', votes: 92 },
      { id: 'opt3', text: 'Torneio Esportivo', votes: 65 }
    ],
    totalVotes: 235
  }
];

export const mockGallery = [
  {
    id: '1',
    title: 'Festa Junina 2023',
    date: '2023-06-15',
    images: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'Campeonato Esportivo',
    date: '2023-09-20',
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'Formatura 2023',
    date: '2023-12-15',
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1627556704283-02c23d1e72cb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop'
    ]
  },
  {
    id: '4',
    title: 'Ação Social - Arrecadação',
    date: '2024-05-10',
    images: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop'
    ]
  }
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'João Pedro',
    role: 'Estudante - 3º Ano',
    text: 'O Projeto Futuro transformou nossa escola! Os eventos são incríveis e realmente nos representam.',
    rating: 5
  },
  {
    id: '2',
    name: 'Beatriz Lima',
    role: 'Estudante - 2º Ano',
    text: 'Participar das atividades do grêmio me ajudou a desenvolver liderança e fazer novos amigos.',
    rating: 5
  },
  {
    id: '3',
    name: 'Rafael Mendes',
    role: 'Estudante - 1º Ano',
    text: 'Adoro poder votar nas decisões e sentir que minha opinião importa. O grêmio é do estudante!',
    rating: 5
  }
];

// Mock user for authentication
export const mockAdminUser = {
  email: 'gremioestudantil290@gmail.com',
  password: 'Gremioestudantil2026',
  name: 'Administrador',
  role: 'admin'
};

// Mock function to simulate API calls
export const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
