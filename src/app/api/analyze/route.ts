import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client only when the API key is available
// This prevents build-time errors when env vars are not set
let openai: OpenAI | null = null;

function getOpenAIClient() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export async function POST(request: NextRequest) {
  try {
    const client = getOpenAIClient();
    
    if (!client) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }

    // Call OpenAI Vision API
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert financial chart analyst specializing in technical analysis. Analyze trading charts and provide detailed predictions.

Your analysis must include:
1. Signal: BUY, SELL, or HOLD
2. Confidence percentage (70-100%)
3. Stop Loss level
4. Take Profit 1 and Take Profit 2 levels
5. Technical summary explaining the analysis
6. Detected patterns (e.g., Head and Shoulders, Double Top, Triangle, Flag, Support/Resistance, FVG, BOS, CHoCH)
7. Market type (FOREX, CRYPTO, STOCKS, INDICES, COMMODITIES)
8. Estimated timeframe (5M, 15M, 1H, 4H, 1D, etc.)
9. Risk level (LOW, MEDIUM, HIGH)
10. Trading pair/symbol

Analyze:
- Candlestick patterns and formations
- Trend direction and strength
- Support and resistance levels
- Liquidity zones
- Fair Value Gaps (FVG)
- Break of Structure (BOS) and Change of Character (CHoCH)
- Swing highs and lows
- Volume and momentum
- Classic chart patterns

Return ONLY a valid JSON object with this exact structure:
{
  "signal": "BUY" | "SELL" | "HOLD",
  "confidence": number (70-100),
  "stopLoss": "string",
  "takeProfit1": "string",
  "takeProfit2": "string",
  "technicalSummary": "detailed explanation in Portuguese",
  "pair": "string (e.g., EUR/USD, BTC/USD, AAPL)",
  "timeframe": "string (e.g., 1H, 4H, 1D)",
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "marketType": "FOREX" | "CRYPTO" | "STOCKS" | "INDICES" | "COMMODITIES",
  "detectedPatterns": ["pattern1", "pattern2", ...]
}`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this financial chart and provide a complete technical analysis with trading signals.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    const analysisData = JSON.parse(content);

    // Create full analysis object
    const analysis = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: '', // Will be set by client
      signal: analysisData.signal,
      confidence: analysisData.confidence,
      stopLoss: analysisData.stopLoss,
      takeProfit1: analysisData.takeProfit1,
      takeProfit2: analysisData.takeProfit2,
      technicalSummary: analysisData.technicalSummary,
      pair: analysisData.pair,
      timeframe: analysisData.timeframe,
      riskLevel: analysisData.riskLevel,
      marketType: analysisData.marketType,
      detectedPatterns: analysisData.detectedPatterns,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing chart:', error);
    return NextResponse.json(
      { error: 'Failed to analyze chart' },
      { status: 500 }
    );
  }
}
