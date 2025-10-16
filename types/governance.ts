// Governance Management Types

export interface Policy {
  id: number
  policyNumber: string
  title: string
  category: PolicyCategory
  status: PolicyStatus
  version: string
  owner: string
  ownerId: number
  approver: string
  approverId: number
  department: string
  departmentId: number
  effectiveDate: string
  reviewDate: string
  nextReviewDate: string
  description: string
  frameworks?: GovernanceFramework[]
  attachments?: string[]
  createdAt: string
  updatedAt: string
}

export type PolicyCategory = 'HR' | 'IT' | 'Finance' | 'Operations' | 'Compliance' | 'Security' | 'Legal'

export type PolicyStatus = 'draft' | 'active' | 'under_review' | 'expired' | 'archived'

export interface GovernanceFramework {
  id: number
  name: string
  code: string
  version: string
  description: string
  category: FrameworkCategory
  status: 'active' | 'inactive'
  complianceScore: number
  lastAssessmentDate?: string
  nextAssessmentDate?: string
  applicablePolicies: number
  createdAt: string
  updatedAt: string
}

export type FrameworkCategory = 
  | 'ISO 31000' 
  | 'COSO' 
  | 'King IV' 
  | 'SOX' 
  | 'COBIT' 
  | 'NIST' 
  | 'Basel III'
  | 'Other'

export interface Procedure {
  id: number
  procedureNumber: string
  title: string
  policyId: number
  policy: string
  description: string
  owner: string
  ownerId: number
  department: string
  departmentId: number
  steps: ProcedureStep[]
  status: 'draft' | 'active' | 'under_review' | 'archived'
  version: string
  effectiveDate: string
  reviewDate: string
  createdAt: string
  updatedAt: string
}

export interface ProcedureStep {
  id: number
  stepNumber: number
  title: string
  description: string
  responsible: string
  estimatedDuration?: number
}

export interface GovernanceReview {
  id: number
  reviewNumber: string
  title: string
  reviewType: ReviewType
  frameworkId?: number
  framework?: string
  policyId?: number
  policy?: string
  reviewer: string
  reviewerId: number
  reviewDate: string
  dueDate: string
  status: ReviewStatus
  findings: string
  recommendations: string
  actionItems: ReviewActionItem[]
  score?: number
  createdAt: string
  updatedAt: string
}

export type ReviewType = 'framework_assessment' | 'policy_review' | 'internal_audit' | 'board_review' | 'compliance_check'

export type ReviewStatus = 'scheduled' | 'in_progress' | 'completed' | 'overdue'

export interface ReviewActionItem {
  id: number
  description: string
  assignee: string
  dueDate: string
  status: 'open' | 'in_progress' | 'completed'
}

export interface BoardMeeting {
  id: number
  meetingNumber: string
  title: string
  committee: Committee
  meetingDate: string
  location: string
  attendees: Attendee[]
  agenda: string[]
  minutes?: string
  decisions: Decision[]
  status: 'scheduled' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export type Committee = 
  | 'Board of Directors'
  | 'Audit Committee'
  | 'Risk Committee'
  | 'Compliance Committee'
  | 'Governance Committee'
  | 'Executive Committee'

export interface Attendee {
  id: number
  name: string
  role: string
  attended: boolean
}

export interface Decision {
  id: number
  description: string
  decisionMaker: string
  impact: 'low' | 'medium' | 'high'
  implementationDate?: string
}

// Dashboard specific types
export interface GovernanceKPIs {
  totalPolicies: number
  policiesDueForReview: number
  activeFrameworks: number
  pendingApprovals: number
  complianceScore: number
  monthlyChanges: {
    policies: number
    reviews: number
    frameworks: number
    approvals: number
  }
}

export interface PolicyDistribution {
  name: string
  value: number
  color?: string
}

export interface FrameworkCompliance {
  name: string
  value: number
  total: number
  percentage: number
}

