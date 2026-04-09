import { UserRole, ProblemStatus, HelpType, PaymentStatus, ExpertStatus } from "@prisma/client"

export type { UserRole, ProblemStatus, HelpType, PaymentStatus, ExpertStatus }

export interface ProblemWithAuthor {
  id: string
  problemNumber: number
  slug: string
  title: string
  description: string
  helpType: HelpType
  status: ProblemStatus
  tags: string[]
  budget: number | null
  views: number
  createdAt: Date
  author: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    responses: number
  }
}

export interface ExpertWithUser {
  id: string
  userId: string
  github: string | null
  bio: string
  expertise: string[]
  yearsExp: number
  hourlyRate: number
  status: ExpertStatus
  isAvailable: boolean
  earnings: number
  walletAddress: string | null
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    reputation: number
  }
}

export interface PaymentIntent {
  problemId: string
  amount: number
}
