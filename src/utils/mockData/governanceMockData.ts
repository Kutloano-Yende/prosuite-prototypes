export const mockGovernanceKPIs = {
  totalPolicies: 45,
  activePolicies: 38,
  underReview: 5,
  expired: 2,
  complianceScore: 87,
  monthlyChanges: {
    policies: 12,
    active: 8,
    review: -2,
    expired: 1,
    score: 5
  }
}

export const mockPolicyDistribution = [
  { category: 'Information Security', count: 12, percentage: 27 },
  { category: 'Data Protection', count: 8, percentage: 18 },
  { category: 'Risk Management', count: 10, percentage: 22 },
  { category: 'Human Resources', count: 6, percentage: 13 },
  { category: 'Financial Controls', count: 9, percentage: 20 }
]

export const mockRecentPolicyUpdates = [
  {
    id: '1',
    title: 'Data Protection Policy v2.1',
    updatedBy: 'Sarah Johnson',
    updatedAt: '2024-01-15',
    status: 'Active'
  },
  {
    id: '2',
    title: 'IT Security Guidelines',
    updatedBy: 'Mike Davis',
    updatedAt: '2024-01-12',
    status: 'Under Review'
  },
  {
    id: '3',
    title: 'Risk Management Framework',
    updatedBy: 'John Smith',
    updatedAt: '2024-01-10',
    status: 'Active'
  }
]

export const mockUpcomingReviews = [
  {
    id: '1',
    title: 'Information Security Policy',
    dueDate: '2024-02-15',
    owner: 'IT Department',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Data Protection Guidelines',
    dueDate: '2024-02-20',
    owner: 'Legal Team',
    priority: 'Critical'
  }
]
