'use client';

import { BookOpen, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/custom/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { patterns } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EducationPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const categories = [
    {
      id: 'patterns',
      title: {
        pt: 'Padrões Gráficos',
        en: 'Chart Patterns',
        fr: 'Modèles Graphiques',
      },
      icon: BarChart3,
    },
    {
      id: 'indicators',
      title: {
        pt: 'Indicadores Técnicos',
        en: 'Technical Indicators',
        fr: 'Indicateurs Techniques',
      },
      icon: TrendingUp,
    },
    {
      id: 'strategies',
      title: {
        pt: 'Estratégias de Trading',
        en: 'Trading Strategies',
        fr: 'Stratégies de Trading',
      },
      icon: Target,
    },
  ];

  const indicators = [
    {
      name: 'RSI (Relative Strength Index)',
      description: {
        pt: 'Indicador de momentum que mede a velocidade e magnitude das mudanças de preço. Valores acima de 70 indicam sobrecompra, abaixo de 30 indicam sobrevenda.',
        en: 'Momentum indicator measuring speed and magnitude of price changes. Values above 70 indicate overbought, below 30 indicate oversold.',
        fr: 'Indicateur de momentum mesurant la vitesse et l\'amplitude des changements de prix. Valeurs supérieures à 70 indiquent suracheté, inférieures à 30 indiquent survendu.',
      },
    },
    {
      name: 'MACD (Moving Average Convergence Divergence)',
      description: {
        pt: 'Indicador de tendência que mostra a relação entre duas médias móveis. Cruzamentos da linha MACD com a linha de sinal geram sinais de compra/venda.',
        en: 'Trend indicator showing relationship between two moving averages. MACD line crossovers with signal line generate buy/sell signals.',
        fr: 'Indicateur de tendance montrant la relation entre deux moyennes mobiles. Les croisements de la ligne MACD avec la ligne de signal génèrent des signaux d\'achat/vente.',
      },
    },
    {
      name: 'Bollinger Bands',
      description: {
        pt: 'Bandas de volatilidade que se expandem e contraem com base na volatilidade do mercado. Preços próximos das bandas superiores/inferiores indicam condições extremas.',
        en: 'Volatility bands that expand and contract based on market volatility. Prices near upper/lower bands indicate extreme conditions.',
        fr: 'Bandes de volatilité qui s\'étendent et se contractent en fonction de la volatilité du marché. Les prix près des bandes supérieures/inférieures indiquent des conditions extrêmes.',
      },
    },
    {
      name: 'Fibonacci Retracement',
      description: {
        pt: 'Ferramenta que identifica níveis potenciais de suporte e resistência baseados em proporções matemáticas. Níveis comuns: 23.6%, 38.2%, 50%, 61.8%.',
        en: 'Tool identifying potential support and resistance levels based on mathematical ratios. Common levels: 23.6%, 38.2%, 50%, 61.8%.',
        fr: 'Outil identifiant les niveaux potentiels de support et résistance basés sur des ratios mathématiques. Niveaux communs: 23.6%, 38.2%, 50%, 61.8%.',
      },
    },
  ];

  const strategies = [
    {
      name: 'Trend Following',
      description: {
        pt: 'Estratégia que identifica e segue a direção da tendência principal. Compra em tendências de alta, vende em tendências de baixa. Usa médias móveis e linhas de tendência.',
        en: 'Strategy identifying and following main trend direction. Buy in uptrends, sell in downtrends. Uses moving averages and trend lines.',
        fr: 'Stratégie identifiant et suivant la direction de la tendance principale. Acheter dans les tendances haussières, vendre dans les tendances baissières. Utilise moyennes mobiles et lignes de tendance.',
      },
    },
    {
      name: 'Breakout Trading',
      description: {
        pt: 'Entrada em posições quando o preço rompe níveis importantes de suporte/resistência. Requer confirmação de volume e momentum para validar o rompimento.',
        en: 'Entering positions when price breaks important support/resistance levels. Requires volume and momentum confirmation to validate breakout.',
        fr: 'Entrer en position lorsque le prix casse des niveaux importants de support/résistance. Nécessite confirmation de volume et momentum pour valider la cassure.',
      },
    },
    {
      name: 'Range Trading',
      description: {
        pt: 'Negociação dentro de canais laterais. Compra próximo ao suporte, vende próximo à resistência. Ideal para mercados sem tendência definida.',
        en: 'Trading within sideways channels. Buy near support, sell near resistance. Ideal for markets without defined trend.',
        fr: 'Trading dans des canaux latéraux. Acheter près du support, vendre près de la résistance. Idéal pour marchés sans tendance définie.',
      },
    },
    {
      name: 'Price Action',
      description: {
        pt: 'Análise baseada exclusivamente no movimento de preço e formações de velas. Identifica padrões de reversão e continuação sem indicadores técnicos.',
        en: 'Analysis based exclusively on price movement and candle formations. Identifies reversal and continuation patterns without technical indicators.',
        fr: 'Analyse basée exclusivement sur le mouvement des prix et formations de bougies. Identifie modèles de retournement et continuation sans indicateurs techniques.',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {t.education}
            </h1>
          </div>
          <p className="text-gray-400">
            Aprenda sobre análise técnica e padrões de trading
          </p>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="patterns" className="space-y-8">
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.title[language]}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Patterns Tab */}
          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patterns.map((pattern, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      {pattern.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {pattern.description[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Indicators Tab */}
          <TabsContent value="indicators" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {indicators.map((indicator, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      {indicator.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {indicator.description[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Strategies Tab */}
          <TabsContent value="strategies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      {strategy.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {strategy.description[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <Card className="bg-yellow-500/10 border-yellow-500/30 mt-12">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 text-xl">⚠️</span>
                </div>
              </div>
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">Aviso Importante</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Trading envolve riscos significativos. As análises fornecidas são apenas para fins educacionais e não constituem aconselhamento financeiro. 
                  Nunca invista mais do que pode perder. Consulte sempre um profissional financeiro qualificado antes de tomar decisões de investimento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
