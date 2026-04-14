# PRD - Projeto Futuro - Grêmio Estudantil Website

## Original Problem Statement
Criar um site para grêmio estudantil com todas as funcionalidades: página inicial, calendário de eventos, sistema de votação/enquetes, galeria de fotos, formulário de contato, blog/notícias, e área administrativa com login.

## User Personas
- **Estudantes**: Principais usuários que visualizam eventos, notícias, votam em enquetes e entram em contato
- **Membros do Grêmio**: Administradores que gerenciam conteúdo (eventos, notícias, votações, galeria)
- **Visitantes**: Pais, professores e comunidade que querem conhecer o grêmio

## Architecture & Tech Stack
- **Frontend**: React 19, TailwindCSS, Shadcn/UI components
- **Backend**: FastAPI, Python (to be implemented)
- **Database**: MongoDB (to be implemented)
- **Design**: Black, Gold (#d4af37), Purple (#9333ea) color scheme
- **Logo**: Projeto Futuro wolf logo with crown

## What's Been Implemented (Dec 2025)

### ✅ Frontend (Mock Data Phase)
- **Header Component**: Responsive navigation with logo, menu items
- **Footer Component**: Contact info, social media links, quick links
- **Home Page**: 
  - Hero section with logo and CTA buttons
  - Mission cards (Representação, Eventos, Crescimento)
  - Upcoming events preview (3 cards)
  - Latest news preview (3 cards)
  - Team members section (4 members)
  - CTA section
- **Events Page**: 
  - Full event listing with search and category filter
  - Event cards with images, date, time, location
  - "Add to Calendar" button
- **News Page**:
  - Featured news highlight
  - News grid with category filter and search
  - Newsletter signup section
- **Gallery Page**:
  - Album-based photo organization
  - Modal for enlarged images
  - Photo upload CTA
- **Voting Page**:
  - Active polls with radio button voting
  - Real-time results display after voting
  - Closed polls with final results
  - How it works info section
- **Contact Page**:
  - Contact info cards (address, phone, email)
  - Contact form with validation
  - Success state feedback
  - FAQ section
- **Login Page**:
  - Admin authentication form
  - Mock credentials display
- **Admin Dashboard**:
  - Stats overview (events, news, polls, albums)
  - Tabbed interface for managing:
    - Events
    - News
    - Polls/Voting
    - Gallery
  - Mock CRUD interface

### Mock Data Structure
- Events: 4 sample events with categories, dates, locations
- News: 3 sample articles with authors, dates, categories
- Polls: 3 polls (2 active, 1 closed) with vote counts
- Gallery: 4 albums with 3 photos each
- Team Members: 4 members with roles
- Admin User: email/password authentication

## Prioritized Backlog

### P0 - Backend Development (Next Phase)
1. **Authentication System**
   - User registration and login
   - JWT token implementation
   - Role-based access (admin/student)
   - Password hashing with bcrypt

2. **Event Management API**
   - CRUD endpoints for events
   - Image upload for events
   - Category management
   - Calendar integration

3. **News/Blog API**
   - CRUD endpoints for news articles
   - Author attribution
   - Category/tag system
   - Rich text content support

4. **Voting System API**
   - CRUD endpoints for polls
   - Vote recording with user tracking
   - Prevent duplicate voting
   - Real-time vote counting
   - Poll status management (active/closed)

5. **Gallery API**
   - Album creation and management
   - Image upload and storage
   - Album organization

6. **Contact Form API**
   - Form submission handling
   - Email notification system
   - Message storage

### P1 - Enhanced Features
1. **Email Notifications**
   - Event reminders
   - New poll notifications
   - Newsletter system

2. **User Profiles**
   - Student registration
   - Profile management
   - Activity history

3. **Advanced Search**
   - Full-text search across all content
   - Advanced filters

4. **Social Media Integration**
   - Share buttons for events/news
   - Instagram feed integration

### P2 - Future Enhancements
1. **Analytics Dashboard**
   - Event attendance tracking
   - Voting participation metrics
   - Popular content insights

2. **Mobile App**
   - React Native implementation
   - Push notifications

3. **Multilingual Support**
   - Portuguese/English toggle

## Next Tasks
1. Create MongoDB schemas for all entities
2. Implement authentication system with JWT
3. Build REST API endpoints for all features
4. Replace mock data with real database calls
5. Add image upload functionality
6. Implement email service for contact form
7. Test all features end-to-end
8. Deploy to production

## Design Guidelines Followed
- ✅ Black background with gold and purple accents
- ✅ No dark purple/blue or purple/pink gradients
- ✅ Glassmorphism effects with backdrop filters
- ✅ Smooth transitions and hover states
- ✅ Custom scrollbar with gradient
- ✅ Lucide React icons (no emoji)
- ✅ Responsive design for all screen sizes
- ✅ Shadcn/UI components throughout
