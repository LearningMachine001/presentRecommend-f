"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AnalysisResult } from "@/lib/analyze"
import {RecommendationResult} from "@/lib/utils";

interface AnalysisContextType {
  analysisResult: AnalysisResult[] | null
  setAnalysisResult: (result: AnalysisResult[]) => void
  recommendations: any[] | null
  setRecommendations: (recommendations: any[]) => void
  fileId: string | null
    setFileId: (id: string | null) => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult[] | null>(null)
  const [recommendations, setRecommendations] = useState<any[] | null>(null)
  const [fileId, setFileId] = useState<string | null>(null)
  // const [recommendations, setRecommendations] = useState<RecommendationResult[] | null>(null)

  return (
    <AnalysisContext.Provider
      value={{
        analysisResult,
        setAnalysisResult,
        recommendations,
        setRecommendations,
        fileId,
        setFileId,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider")
  }
  return context
}
