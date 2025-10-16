// Currency formatting
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

// Policy/Obligation code formatting
export const formatCode = (type: 'policy' | 'obligation' | 'assessment' | 'action-plan', id: string): string => {
  const prefixes = {
    'policy': 'POL',
    'obligation': 'OBL',
    'assessment': 'ASS',
    'action-plan': 'AP'
  }
  
  return `${prefixes[type]}-${id.padStart(3, '0')}`
}

// Status formatting
export const formatStatus = (status: string): string => {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Priority formatting
export const formatPriority = (priority: string): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()
}

// Department formatting
export const formatDepartment = (department: string): string => {
  return department
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Time ago formatting
export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

// Progress percentage formatting
export const formatProgress = (completed: number, total: number): string => {
  if (total === 0) return '0%'
  const percentage = (completed / total) * 100
  return `${Math.round(percentage)}%`
}

// Compliance score formatting
export const formatComplianceScore = (score: number): string => {
  if (score >= 90) return `${score}% (Excellent)`
  if (score >= 75) return `${score}% (Good)`
  if (score >= 60) return `${score}% (Fair)`
  return `${score}% (Needs Improvement)`
}

// Risk level formatting
export const formatRiskLevel = (level: string): string => {
  const levels: Record<string, string> = {
    'low': 'Low Risk',
    'medium': 'Medium Risk',
    'high': 'High Risk',
    'critical': 'Critical Risk'
  }
  return levels[level.toLowerCase()] || level
}
