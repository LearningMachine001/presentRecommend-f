"use client";

import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Gift, Home, BarChart2, Coins, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { generateGiftRecommendations } from "@/lib/analyze";
import type { GiftItem } from "@/lib/utils";
import type { RecommendationResult } from "@/lib/utils";
import { useAnalysis } from "@/context/analysis-context";

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const { analysisResult } = useAnalysis();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    if (!analysisResult || !Array.isArray(analysisResult) || analysisResult.length === 0) {
      setError("분석 결과가 없습니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const results: RecommendationResult[] = await generateGiftRecommendations(
        fileId as string,
        analysisResult,
        {}
      );

      if (!results || results.length === 0) {
        throw new Error("추천할 수 있는 선물이 없습니다.");
      }

      // 날짜별로 정렬
      const sortedResults = results.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setRecommendations(sortedResults);
      setSelectedIndex(sortedResults.length - 1);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (analysisResult) {
      fetchRecommendations();
    }
  }, [analysisResult]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-500 drop-shadow-sm">
          맞춤형 선물 추천
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto">
          분석 결과를 바탕으로 예산에 맞는 선물을 추천해드려요.
        </p>
      </div>
      <div className="w-full max-w-5xl">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-center font-semibold">
            <p className="mb-2">오류가 발생했습니다:</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">서버가 실행 중인지 확인해주세요.</p>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">선물을 찾고 있습니다...</p>
          </div>
        ) : (
          <>
            {recommendations.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {recommendations[selectedIndex]?.recommendations.slice(0, 3).map((gift) => (
                    <a
                      key={gift.id}
                      href={gift.description}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <Card className="overflow-hidden rounded-2xl shadow-md border-0 bg-white/95 hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                        <CardContent className="p-6 flex flex-col items-center h-full">
                          <div className="aspect-square w-full mb-4">
                            <img
                              src={gift.imageUrl}
                              alt={gift.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center line-clamp-2">
                            {gift.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-2 text-center">
                            {gift.category}
                          </p>
                          <p className="text-xl font-bold mb-4 text-pink-500 text-center">
                            {gift.price}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
                <div className="sticky bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg flex flex-col items-center z-50 bg-white/80 backdrop-blur-sm py-4 rounded-lg">
                  <Slider
                    min={0}
                    max={recommendations.length - 1}
                    step={1}
                    value={[selectedIndex]}
                    onValueChange={([v]) => setSelectedIndex(v)}
                    className="w-full max-w-lg"
                  />
                  <div className="text-lg font-bold text-pink-700 mt-2">
                    {recommendations[selectedIndex]?.date}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
