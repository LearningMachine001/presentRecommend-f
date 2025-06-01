"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Gift, Home, BarChart2, Coins, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { GiftItem } from "@/lib/utils"

export default function RecommendationsPage() {
  const [budget, setBudget] = useState(200000)
  const [gifts, setGifts] = useState<GiftItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)

      const keywords = ["골프", "스포츠", "운동"]
      const response = await fetch(`/api/gifts?budget=${budget}&keywords=${keywords.join(',')}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "선물 추천을 가져오는데 실패했습니다.")
      }

      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("추천할 수 있는 선물이 없습니다.")
      }
      setGifts(data)
    } catch (err) {
      console.error('Error fetching recommendations:', err)
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const handleBudgetChange = (value: number[]) => {
    setBudget(value[0])
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-500 drop-shadow-sm">맞춤형 선물 추천</h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto">분석 결과를 바탕으로 예산에 맞는 선물을 추천해드려요.</p>
      </div>
      <div className="w-full max-w-5xl">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-center font-semibold">
            오류가 발생했습니다: {error}
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">선물을 찾고 있습니다...</p>
          </div>
        ) : gifts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {gifts.map((gift, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl shadow-md border-0 bg-white/95 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="aspect-square w-full mb-4">
                    <img
                      src={gift.imageUrl}
                      alt={gift.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">{gift.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 text-center">{gift.brand}</p>
                  <p className="text-xl font-bold mb-4 text-pink-500 text-center">{gift.price.toLocaleString()}원</p>
                  <a
                    href={gift.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    구매하기
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">선물 추천을 시작하려면 아래 버튼을 클릭하세요.</p>
          </div>
        )}
      </div>
      <div className="w-full max-w-5xl mb-10 mt-4">
        <Card className="rounded-2xl shadow-lg border-0 bg-pink-50">
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-pink-500">
              <Coins className="h-5 w-5 text-pink-400" />
              예산 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-sm text-pink-400">최대 예산</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-pink-600">
                    {budget.toLocaleString()}원
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    defaultValue={[budget]}
                    max={200000}
                    step={1000}
                    onValueChange={handleBudgetChange}
                    className="py-4 [&_.range-track]:bg-pink-400 [&_.range-thumb]:bg-pink-500"
                  />
                  <div 
                    className="absolute -top-12 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-100"
                    style={{
                      left: `${(budget / 200000) * 100}%`
                    }}
                  >
                    <span className="text-lg font-bold">{budget.toLocaleString()}원</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-pink-400">
                  <span>0원</span>
                  <span>200,000원</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-pink-500 text-white rounded-full py-6 text-lg font-bold shadow-md hover:bg-pink-600 transition mt-8"
              onClick={fetchRecommendations}
              disabled={loading}
            >
              {loading ? "새로운 추천을 찾는 중..." : "선물 추천받기"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
