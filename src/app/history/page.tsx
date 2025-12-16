'use client';

import { useState } from 'react';
import { Filter, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/custom/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Analysis, SignalType } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HistoryPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSignal, setFilterSignal] = useState<SignalType | 'ALL'>('ALL');
  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  const getSignalIcon = (signal: SignalType) => {
    switch (signal) {
      case 'BUY':
        return <TrendingUp className="w-4 h-4" />;
      case 'SELL':
        return <TrendingDown className="w-4 h-4" />;
      case 'HOLD':
        return <Minus className="w-4 h-4" />;
    }
  };

  const getSignalColor = (signal: SignalType) => {
    switch (signal) {
      case 'BUY':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'SELL':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'HOLD':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    }
  };

  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesSearch = analysis.pair.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSignal = filterSignal === 'ALL' || analysis.signal === filterSignal;
    return matchesSearch && matchesSignal;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {t.history}
          </h1>
          <p className="text-gray-400">
            Reveja todas as suas análises anteriores
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t.filterByPair}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Signal Filter */}
              <Select value={filterSignal} onValueChange={(value) => setFilterSignal(value as SignalType | 'ALL')}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t.filterBySignal} />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="ALL" className="text-white">Todos os Sinais</SelectItem>
                  <SelectItem value="BUY" className="text-white">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      {t.BUY}
                    </span>
                  </SelectItem>
                  <SelectItem value="SELL" className="text-white">
                    <span className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      {t.SELL}
                    </span>
                  </SelectItem>
                  <SelectItem value="HOLD" className="text-white">
                    <span className="flex items-center gap-2">
                      <Minus className="w-4 h-4 text-yellow-400" />
                      {t.HOLD}
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Analysis List */}
        {filteredAnalyses.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.noAnalysis}
              </h3>
              <p className="text-gray-400 mb-6">
                Comece a analisar gráficos para ver o seu histórico aqui
              </p>
              <Button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
              >
                Ir para Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => (
              <Card key={analysis.id} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full sm:w-48 h-32 relative rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={analysis.imageUrl}
                        alt={analysis.pair}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{analysis.pair}</h3>
                          <p className="text-sm text-gray-400">
                            {new Date(analysis.createdAt).toLocaleDateString(language === 'pt' ? 'pt-PT' : language === 'fr' ? 'fr-FR' : 'en-GB', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <Badge className={`${getSignalColor(analysis.signal)} border flex items-center gap-1 px-3 py-1`}>
                          {getSignalIcon(analysis.signal)}
                          {t[analysis.signal]}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Confiança:</span>
                          <p className="text-white font-semibold">{analysis.confidence}%</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Timeframe:</span>
                          <p className="text-white font-semibold">{analysis.timeframe}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Stop Loss:</span>
                          <p className="text-white font-semibold">{analysis.stopLoss}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Take Profit:</span>
                          <p className="text-white font-semibold">{analysis.takeProfit1}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {analysis.detectedPatterns.slice(0, 3).map((pattern, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                            {pattern}
                          </Badge>
                        ))}
                        {analysis.detectedPatterns.length > 3 && (
                          <Badge variant="outline" className="bg-gray-700/30 text-gray-400 border-gray-600 text-xs">
                            +{analysis.detectedPatterns.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
