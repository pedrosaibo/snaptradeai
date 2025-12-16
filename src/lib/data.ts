// Mock data for SnapTrade AI
import { Testimonial } from './types';

export const testimonials: Testimonial[] = [
  {
    name: 'João M.',
    location: 'Portugal',
    text: 'A IA analisa gráficos em segundos. Interface impecável.',
    rating: 5,
  },
  {
    name: 'Laura G.',
    location: 'França',
    text: 'Previsões claras e bem explicadas. Muito útil.',
    rating: 5,
  },
  {
    name: 'Michael S.',
    location: 'Reino Unido',
    text: 'Excelente para traders iniciantes e avançados. Recomendo!',
    rating: 5,
  },
  {
    name: 'Rui A.',
    location: 'Brasil',
    text: 'Rápida, simples e profissional. A função de foto é incrível.',
    rating: 5,
  },
  {
    name: 'Sophie L.',
    location: 'França',
    text: 'Interface moderne et analyses précises. Parfait pour le trading quotidien.',
    rating: 5,
  },
  {
    name: 'Carlos R.',
    location: 'Espanha',
    text: 'La mejor herramienta de análisis que he usado. Muy profesional.',
    rating: 5,
  },
];

export const features = [
  {
    icon: 'Camera',
    title: {
      pt: 'Análise por Foto',
      en: 'Photo Analysis',
      fr: 'Analyse par Photo',
    },
    description: {
      pt: 'Tire uma foto de qualquer gráfico e obtenha análise instantânea',
      en: 'Take a photo of any chart and get instant analysis',
      fr: 'Prenez une photo de n\'importe quel graphique et obtenez une analyse instantanée',
    },
  },
  {
    icon: 'Brain',
    title: {
      pt: 'IA Avançada',
      en: 'Advanced AI',
      fr: 'IA Avancée',
    },
    description: {
      pt: 'Algoritmos de última geração para deteção de padrões e previsões',
      en: 'State-of-the-art algorithms for pattern detection and predictions',
      fr: 'Algorithmes de pointe pour la détection de modèles et les prévisions',
    },
  },
  {
    icon: 'TrendingUp',
    title: {
      pt: 'Múltiplos Mercados',
      en: 'Multiple Markets',
      fr: 'Marchés Multiples',
    },
    description: {
      pt: 'Forex, Cripto, Ações, Índices e Commodities',
      en: 'Forex, Crypto, Stocks, Indices and Commodities',
      fr: 'Forex, Crypto, Actions, Indices et Matières Premières',
    },
  },
  {
    icon: 'Target',
    title: {
      pt: 'Precisão Elevada',
      en: 'High Precision',
      fr: 'Haute Précision',
    },
    description: {
      pt: 'Stop Loss e Take Profit calculados automaticamente',
      en: 'Stop Loss and Take Profit calculated automatically',
      fr: 'Stop Loss et Take Profit calculés automatiquement',
    },
  },
  {
    icon: 'Clock',
    title: {
      pt: 'Análise Instantânea',
      en: 'Instant Analysis',
      fr: 'Analyse Instantanée',
    },
    description: {
      pt: 'Resultados em segundos, não em minutos',
      en: 'Results in seconds, not minutes',
      fr: 'Résultats en secondes, pas en minutes',
    },
  },
  {
    icon: 'Shield',
    title: {
      pt: 'Garantia de 90 Dias',
      en: '90-Day Guarantee',
      fr: 'Garantie de 90 Jours',
    },
    description: {
      pt: 'Satisfação garantida ou devolução do dinheiro',
      en: 'Satisfaction guaranteed or money back',
      fr: 'Satisfaction garantie ou remboursement',
    },
  },
];

export const patterns = [
  {
    name: 'Head and Shoulders',
    description: {
      pt: 'Padrão de reversão que indica mudança de tendência',
      en: 'Reversal pattern indicating trend change',
      fr: 'Modèle de retournement indiquant un changement de tendance',
    },
  },
  {
    name: 'Double Top/Bottom',
    description: {
      pt: 'Padrão de reversão formado por dois topos ou fundos',
      en: 'Reversal pattern formed by two tops or bottoms',
      fr: 'Modèle de retournement formé par deux sommets ou creux',
    },
  },
  {
    name: 'Triangle',
    description: {
      pt: 'Padrão de consolidação que precede movimento forte',
      en: 'Consolidation pattern preceding strong movement',
      fr: 'Modèle de consolidation précédant un mouvement fort',
    },
  },
  {
    name: 'Flag/Pennant',
    description: {
      pt: 'Padrão de continuação de tendência',
      en: 'Trend continuation pattern',
      fr: 'Modèle de continuation de tendance',
    },
  },
  {
    name: 'Wedge',
    description: {
      pt: 'Padrão que indica possível reversão ou continuação',
      en: 'Pattern indicating possible reversal or continuation',
      fr: 'Modèle indiquant un retournement ou une continuation possible',
    },
  },
  {
    name: 'Channel',
    description: {
      pt: 'Movimento de preço entre linhas paralelas',
      en: 'Price movement between parallel lines',
      fr: 'Mouvement de prix entre des lignes parallèles',
    },
  },
];
