// Date utilities
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date()
}

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Number utilities
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num)
}

export const formatPercentage = (value: number, total: number): string => {
  const percentage = (value / total) * 100
  return `${percentage.toFixed(1)}%`
}

// Color utilities
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800',
    'Draft': 'bg-yellow-100 text-yellow-800',
    'Under Review': 'bg-blue-100 text-blue-800',
    'Expired': 'bg-red-100 text-red-800',
    'Compliant': 'bg-green-100 text-green-800',
    'Non-Compliant': 'bg-red-100 text-red-800',
    'Partially Compliant': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Overdue': 'bg-red-100 text-red-800'
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    'Critical': 'bg-red-100 text-red-800',
    'High': 'bg-orange-100 text-orange-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  }
  return priorityColors[priority] || 'bg-gray-100 text-gray-800'
}

// Array utilities
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

// Local storage utilities
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}
