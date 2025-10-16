export const mockComplianceKPIs = {
  totalObligations: 28,
  compliant: 22,
  nonCompliant: 3,
  partiallyCompliant: 2,
  underReview: 1,
  complianceScore: 89,
  monthlyChanges: {
    total: 8,
    compliant: 12,
    nonCompliant: -3,
    partiallyCompliant: -1,
    underReview: 0,
    score: 7
  }
}

export const mockObligationsByStatus = [
  { status: 'Compliant', count: 22, percentage: 79 },
  { status: 'Non-Compliant', count: 3, percentage: 11 },
  { status: 'Partially Compliant', count: 2, percentage: 7 },
  { status: 'Under Review', count: 1, percentage: 3 }
]

export const mockCriticalObligations = [
  {
    id: '1',
    title: 'GDPR Data Breach Notification',
    regulation: 'GDPR',
    dueDate: '2024-02-15',
    status: 'Compliant',
    priority: 'Critical'
  },
  {
    id: '2',
    title: 'SOX Financial Reporting',
    regulation: 'SOX',
    dueDate: '2024-02-28',
    status: 'Under Review',
    priority: 'Critical'
  },
  {
    id: '3',
    title: 'ISO 27001 Security Assessment',
    regulation: 'ISO 27001',
    dueDate: '2024-03-10',
    status: 'Partially Compliant',
    priority: 'High'
  }
]

export const mockComplianceTrends = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 87 },
  { month: 'Mar', score: 89 },
  { month: 'Apr', score: 91 },
  { month: 'May', score: 89 },
  { month: 'Jun', score: 92 }
]
