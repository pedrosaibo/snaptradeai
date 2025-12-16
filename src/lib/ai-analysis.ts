// AI Analysis Service for SnapTrade AI
import { Analysis, SignalType, RiskLevel, MarketType } from './types';

export async function analyzeChartImage(imageFile: File): Promise<Analysis> {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Call OpenAI Vision API
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
      }),
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    const result = await response.json();
    return result.analysis;
  } catch (error) {
    console.error('Error analyzing chart:', error);
    throw error;
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]); // Remove data:image/...;base64, prefix
    };
    reader.onerror = reject;
  });
}

// Mock analysis for development
export function generateMockAnalysis(imageUrl: string): Analysis {
  const signals: SignalType[] = ['BUY', 'SELL', 'HOLD'];
  const risks: RiskLevel[] = ['LOW', 'MEDIUM', 'HIGH'];
  const markets: MarketType[] = ['FOREX', 'CRYPTO', 'STOCKS', 'INDICES', 'COMMODITIES'];
  
  const signal = signals[Math.floor(Math.random() * signals.length)];
  const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
  const risk = risks[Math.floor(Math.random() * risks.length)];
  const market = markets[Math.floor(Math.random() * markets.length)];

  const patterns = [
    'Head and Shoulders',
    'Double Top',
    'Triangle Ascending',
    'Flag Pattern',
    'Support/Resistance',
    'Trend Line Break',
    'FVG (Fair Value Gap)',
    'BOS (Break of Structure)',
  ];

  const detectedPatterns = patterns
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 2);

  const pairs = ['EUR/USD', 'BTC/USD', 'AAPL', 'S&P 500', 'GOLD'];
  const timeframes = ['5M', '15M', '1H', '4H', '1D'];

  return {
    id: Math.random().toString(36).substr(2, 9),
    imageUrl,
    signal,
    confidence,
    stopLoss: signal === 'BUY' ? '1.0850' : '1.0950',
    takeProfit1: signal === 'BUY' ? '1.0980' : '1.0820',
    takeProfit2: signal === 'BUY' ? '1.1050' : '1.0750',
    technicalSummary: generateTechnicalSummary(signal, detectedPatterns),
    pair: pairs[Math.floor(Math.random() * pairs.length)],
    timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
    riskLevel: risk,
    marketType: market,
    detectedPatterns,
    createdAt: new Date(),
  };
}

function generateTechnicalSummary(signal: SignalType, patterns: string[]): string {
  const summaries = {
    BUY: [
      `Análise técnica indica forte momentum de compra. Padrões identificados: ${patterns.join(', ')}. O preço está a respeitar suportes importantes e mostra sinais de continuação bullish. Volume crescente confirma a força do movimento.`,
      `Estrutura de mercado favorável para posições longas. Detetados ${patterns.length} padrões bullish. Rompimento de resistência com reteste bem-sucedido. Indicadores técnicos apontam para continuação da tendência ascendente.`,
      `Oportunidade de compra identificada com base em múltiplos fatores técnicos. Padrões: ${patterns.join(', ')}. Zona de suporte forte mantém-se intacta. Momentum positivo com potencial de extensão do movimento.`,
    ],
    SELL: [
      `Análise técnica sugere pressão vendedora. Padrões identificados: ${patterns.join(', ')}. O preço está a enfrentar resistências significativas e mostra sinais de reversão bearish. Volume em declínio confirma fraqueza.`,
      `Estrutura de mercado indica possível movimento descendente. Detetados ${patterns.length} padrões bearish. Quebra de suporte importante com rejeição em resistência. Indicadores técnicos sugerem continuação da tendência de baixa.`,
      `Oportunidade de venda identificada através de análise técnica avançada. Padrões: ${patterns.join(', ')}. Zona de resistência forte está a rejeitar o preço. Momentum negativo com potencial de extensão do movimento.`,
    ],
    HOLD: [
      `Análise técnica indica consolidação. Padrões identificados: ${patterns.join(', ')}. O mercado está em fase de acumulação/distribuição. Recomenda-se aguardar por confirmação direcional antes de entrar.`,
      `Estrutura de mercado neutra no momento. Detetados ${patterns.length} padrões conflitantes. Preço oscila entre suporte e resistência sem direção clara. Melhor aguardar por breakout confirmado.`,
      `Sem sinal claro de entrada no momento. Padrões: ${patterns.join(', ')}. Mercado em equilíbrio, sem momentum definido. Recomenda-se paciência e aguardar por setup de maior probabilidade.`,
    ],
  };

  const options = summaries[signal];
  return options[Math.floor(Math.random() * options.length)];
}
