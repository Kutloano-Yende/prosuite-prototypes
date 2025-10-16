// Governance Types
export * from './governance'

// Compliance Types
export * from './compliance'

// Common Types
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
}

export interface Department {
  id: string
  name: string
  description: string
  head: string
}

export interface Status {
  id: string
  name: string
  color: string
  description: string
}

export interface Priority {
  id: string
  name: string
  level: number
  color: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams {
  search?: string
  status?: string
  category?: string
  priority?: string
  dateFrom?: string
  dateTo?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
