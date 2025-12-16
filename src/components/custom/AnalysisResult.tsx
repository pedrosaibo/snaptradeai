'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Target, Shield, Clock, Save } from 'lucide-react';
import { Analysis } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import Image from 'next/image';

interface AnalysisResultProps {
  analysis: Analysis;
  onSave?: () => void;
}

export function AnalysisResult({ analysis, onSave }: AnalysisResultProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'SELL':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'HOLD':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return <TrendingUp className="w-6 h-6" />;
      case 'SELL':
        return <TrendingDown className="w-6 h-6" />;
      case 'HOLD':
        return <Minus className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'text-green-400';
      case 'MEDIUM':
        return 'text-yellow-400';
      case 'HIGH':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Signal Card */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white">{t.analysisComplete}</CardTitle>
            <Badge className={`${getSignalColor(analysis.signal)} border px-4 py-2 text-lg font-bold`}>
              <span className="mr-2">{getSignalIcon(analysis.signal)}</span>
              {t[analysis.signal]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chart Image */}
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-gray-800">
            <Image
              src={analysis.imageUrl}
              alt="Chart Analysis"
              fill
              className="object-contain"
            />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Confidence */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">{t.confidence}</span>
              </div>
              <p className="text-2xl font-bold text-white">{analysis.confidence}%</p>
            </div>

            {/* Stop Loss */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-sm text-gray-400">{t.stopLoss}</span>
              </div>
              <p className="text-2xl font-bold text-white">{analysis.stopLoss}</p>
            </div>

            {/* Take Profit 1 */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">TP1</span>
              </div>
              <p className="text-2xl font-bold text-white">{analysis.takeProfit1}</p>
            </div>

            {/* Take Profit 2 */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">TP2</span>
              </div>
              <p className="text-2xl font-bold text-white">{analysis.takeProfit2}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <span className="text-sm text-gray-400">{t.pair}</span>
              <p className="text-lg font-semibold text-white mt-1">{analysis.pair}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{t.timeframe}</span>
              </div>
              <p className="text-lg font-semibold text-white mt-1">{analysis.timeframe}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${getRiskColor(analysis.riskLevel)}`} />
                <span className="text-sm text-gray-400">{t.riskLevel}</span>
              </div>
              <p className={`text-lg font-semibold mt-1 ${getRiskColor(analysis.riskLevel)}`}>
                {t[analysis.riskLevel]}
              </p>
            </div>
          </div>

          {/* Technical Summary */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">{t.technicalSummary}</h3>
            <p className="text-gray-300 leading-relaxed">{analysis.technicalSummary}</p>
          </div>

          {/* Detected Patterns */}
          {analysis.detectedPatterns.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">{t.detectedPatterns}</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.detectedPatterns.map((pattern, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          {onSave && (
            <Button
              onClick={onSave}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-6 rounded-xl"
            >
              <Save className="w-5 h-5 mr-2" />
              {t.saveToHistory}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
