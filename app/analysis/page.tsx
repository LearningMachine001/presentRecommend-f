"use client"

import { useState } from "react"
import Link from "next/link"
import { Gift, Home, BarChart2, MessageSquare, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

// Mock data for demonstration
const keywordData = [
  { name: "생일", value: 15 },
  { name: "선물", value: 12 },
  { name: "축하", value: 10 },
  { name: "파티", value: 8 },
  { name: "기념일", value: 6 },
]

const relationshipData = [
  { date: "1월", intimacy: 65, trend: 65 },
  { date: "2월", intimacy: 75, trend: 70 },
  { date: "3월", intimacy: 60, trend: 68 },
  { date: "4월", intimacy: 85, trend: 72 },
  { date: "5월", intimacy: 70, trend: 75 },
  { date: "6월", intimacy: 90, trend: 80 },
  { date: "7월", intimacy: 75, trend: 82 },
  { date: "8월", intimacy: 95, trend: 85 },
  { date: "9월", intimacy: 80, trend: 87 },
  { date: "10월", intimacy: 88, trend: 88 },
  { date: "11월", intimacy: 92, trend: 89 },
  { date: "12월", intimacy: 95, trend: 90 },
]

export default function AnalysisPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-white to-pink-50">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-500 drop-shadow-sm">카카오톡 대화 분석 결과</h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto">대화 데이터를 기반으로 주요 키워드와 관계 친밀도를 분석해드립니다.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mb-8 px-4">
        {/* 키워드 분석 */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-500 text-2xl">
              <MessageSquare className="h-6 w-6" />
              주요 키워드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywordData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 14 }} />
                  <YAxis tick={{ fill: '#4b5563', fontSize: 14 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px'
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 관계 변화 추적 */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500 text-2xl">
              <Star className="h-6 w-6" />
              관계 친밀도 변화
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={relationshipData}>
                  <defs>
                    <linearGradient id="colorIntimacy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fill: '#4b5563', fontSize: 14 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 14 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="intimacy"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorIntimacy)"
                  />
                  <Line
                    type="monotone"
                    dataKey="trend"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild className="bg-pink-500 text-white rounded-full px-8 py-4 text-lg font-bold shadow-md hover:bg-pink-600 transition-all duration-300 hover:scale-105">
          <a href="/recommendations">선물 추천받기</a>
        </Button>
      </div>
    </section>
  )
}
