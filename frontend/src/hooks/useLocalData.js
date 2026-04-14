import { useState, useEffect } from 'react';
import { mockEvents, mockNews, mockPolls, mockGallery, mockMembers } from '../mock';

// Hook para gerenciar dados com localStorage
export const useLocalData = (key, initialData) => {
  const [data, setData] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      // Dispara evento customizado para sincronizar entre componentes
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { key, data } }));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, data]);

  return [data, setData];
};

// Inicializa localStorage com dados mock se não existir
export const initializeLocalStorage = () => {
  if (!localStorage.getItem('app_events')) {
    localStorage.setItem('app_events', JSON.stringify(mockEvents));
  }
  if (!localStorage.getItem('app_news')) {
    localStorage.setItem('app_news', JSON.stringify(mockNews));
  }
  if (!localStorage.getItem('app_polls')) {
    localStorage.setItem('app_polls', JSON.stringify(mockPolls));
  }
  if (!localStorage.getItem('app_gallery')) {
    localStorage.setItem('app_gallery', JSON.stringify(mockGallery));
  }
  if (!localStorage.getItem('app_members')) {
    localStorage.setItem('app_members', JSON.stringify(mockMembers));
  }
};

// Funções helpers para obter dados
export const getEvents = () => {
  try {
    const data = localStorage.getItem('app_events');
    return data ? JSON.parse(data) : mockEvents;
  } catch {
    return mockEvents;
  }
};

export const getNews = () => {
  try {
    const data = localStorage.getItem('app_news');
    return data ? JSON.parse(data) : mockNews;
  } catch {
    return mockNews;
  }
};

export const getPolls = () => {
  try {
    const data = localStorage.getItem('app_polls');
    return data ? JSON.parse(data) : mockPolls;
  } catch {
    return mockPolls;
  }
};

export const getGallery = () => {
  try {
    const data = localStorage.getItem('app_gallery');
    return data ? JSON.parse(data) : mockGallery;
  } catch {
    return mockGallery;
  }
};

export const getMembers = () => {
  try {
    const data = localStorage.getItem('app_members');
    return data ? JSON.parse(data) : mockMembers;
  } catch {
    return mockMembers;
  }
};
