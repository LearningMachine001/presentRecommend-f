// This is a simplified mock implementation
// In a real application, you would use NLP libraries or AI services

import { readGiftItems, filterGiftItems, type GiftItem } from './utils'

export interface AnalysisResult {
  sentiment: {
    positive: number
    neutral: number
    negative: number
  }
  keywords: {
    name: string
    value: number
  }[]
  relationship: {
    date: string
    intimacy: number
  }[]
  messageStyle: {
    tone: string
    keywords: string[]
    example: string
  }
}

let cachedGiftItems: GiftItem[] | null = null

async function getGiftItems(): Promise<GiftItem[]> {
  if (cachedGiftItems) {
    return cachedGiftItems
  }
  
  cachedGiftItems = await readGiftItems()
  return cachedGiftItems
}

export async function analyzeConversation(text: string): Promise<AnalysisResult> {
  // In a real application, this would be a call to an NLP service
  // or use a library like natural, sentiment, etc.

  // Mock implementation for demonstration
  return {
    keywords: ["Birthday", "Congratulations", "Party", "Gift"],
    sentiment: {
      positive: 35,
      neutral: 25,
      negative: 15,
    },
    relationship: {
      intimacy: 0.75,
      tone: "Friendly",
    },
  }
}

export async function generateGiftRecommendations(
  analysis: AnalysisResult,
  filters: {
    occasion?: string
    recipient?: string
    budget?: number
  }
): Promise<GiftItem[]> {
  const items = await getGiftItems()
  const budget = filters.budget || 200000 // 기본 예산 20만원
  
  // 분석 결과에서 키워드 추출
  const keywords = analysis.keywords || []
  
  // 예산과 키워드 기반으로 상품 필터링
  const filteredItems = filterGiftItems(items, budget, keywords)
  
  // 상위 3개 상품 반환
  return filteredItems.slice(0, 3)
}

export async function analyzeChat(text: string): Promise<AnalysisResult> {
  // 실제 구현에서는 여기서 텍스트 분석을 수행합니다
  // 현재는 목업 데이터를 반환합니다
  return {
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10
    },
    keywords: [
      { name: "생일", value: 15 },
      { name: "선물", value: 12 },
      { name: "축하", value: 10 },
      { name: "파티", value: 8 },
      { name: "기념일", value: 6 }
    ],
    relationship: [
      { date: "1월", intimacy: 65 },
      { date: "2월", intimacy: 70 },
      { date: "3월", intimacy: 75 },
      { date: "4월", intimacy: 80 },
      { date: "5월", intimacy: 85 },
      { date: "6월", intimacy: 90 }
    ],
    messageStyle: {
      tone: "친근한",
      keywords: ["생일", "축하", "행복"],
      example: "생일 축하해! 너의 특별한 날을 함께 축하하고 싶어. 앞으로도 항상 행복하길 바랄게!"
    }
  }
}
