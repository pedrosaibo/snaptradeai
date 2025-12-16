'use client';

import { useState } from 'react';
import { Camera, Upload, History, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/custom/Navbar';
import { AnalysisResult } from '@/components/custom/AnalysisResult';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { generateMockAnalysis } from '@/lib/ai-analysis';
import { Analysis } from '@/lib/types';

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<Analysis[]>([]);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Create temporary URL for the image
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate AI analysis (in production, this would call the API)
    setTimeout(() => {
      const analysis = generateMockAnalysis(imageUrl);
      setCurrentAnalysis(analysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleTakePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleImageUpload(file);
    };
    input.click();
  };

  const handleUploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleImageUpload(file);
    };
    input.click();
  };

  const handleSaveAnalysis = () => {
    if (currentAnalysis) {
      setRecentAnalyses([currentAnalysis, ...recentAnalyses.slice(0, 4)]);
      // In production, save to database
      alert('Análise guardada no histórico!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {t.dashboard}
          </h1>
          <p className="text-gray-400">
            Carregue uma imagem ou tire uma foto para análise instantânea
          </p>
        </div>

        {/* Upload Section */}
        {!currentAnalysis && (
          <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 mb-8">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Comece a Análise
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Carregue uma imagem de qualquer gráfico financeiro e obtenha análise profissional em segundos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={handleTakePhoto}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-blue-500/50"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    {t.takePhoto}
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleUploadImage}
                    disabled={isAnalyzing}
                    variant="outline"
                    className="border-2 border-blue-500/50 text-white hover:bg-blue-500/10 px-8 py-6 text-lg rounded-xl"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {t.uploadImage}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Result */}
        {currentAnalysis && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Resultado da Análise</h2>
              <Button
                variant="outline"
                onClick={() => setCurrentAnalysis(null)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Nova Análise
              </Button>
            </div>
            <AnalysisResult analysis={currentAnalysis} onSave={handleSaveAnalysis} />
          </div>
        )}

        {/* Recent Analyses */}
        {recentAnalyses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <History className="w-6 h-6" />
                Análises Recentes
              </h2>
              <Button
                variant="ghost"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => window.location.href = '/history'}
              >
                Ver Todas
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAnalyses.map((analysis) => (
                <Card key={analysis.id} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-3 bg-gray-800">
                      <img
                        src={analysis.imageUrl}
                        alt={analysis.pair}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{analysis.pair}</span>
                      <span className={`text-sm font-bold ${
                        analysis.signal === 'BUY' ? 'text-green-400' :
                        analysis.signal === 'SELL' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {t[analysis.signal]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{analysis.timeframe}</span>
                      <span>{analysis.confidence}% confiança</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analyzing Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-xl font-semibold mb-2">{t.analyzing}</p>
            <p className="text-gray-400 text-sm">A detetar padrões e calcular probabilidades...</p>
          </div>
        </div>
      )}
    </div>
  );
}
