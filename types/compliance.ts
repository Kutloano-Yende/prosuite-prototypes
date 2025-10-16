// Compliance Management Types

export interface ComplianceObligation {
  id: number
  obligationCode: string
  title: string
  regulation: string
  regulationId: number
  regulationCategory: RegulationCategory
  description: string
  frequency: ObligationFrequency
  status: ComplianceStatus
  owner: string
  ownerId: number
  department: string
  departmentId: number
  dueDate: string
  lastAssessmentDate?: string
  nextAssessmentDate?: string
  complianceScore?: number
  priority: Priority
  evidenceRequired: string[]
  evidenceAttached?: string[]
  jurisdiction: string
  effectiveDate: string
  createdAt: string
  updatedAt: string
}

export type ObligationFrequency =
  | 'one_time'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'semi_annually'
  | 'annually'
  | 'event_driven'

export type ComplianceStatus =
  | 'compliant'
  | 'non_compliant'
  | 'partially_compliant'
  | 'under_review'
  | 'not_assessed'
  | 'not_applicable'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export interface Regulation {
  id: number
  name: string
  code: string
  category: RegulationCategory
  jurisdiction: string
  description: string
  authority: string
  effectiveDate: string
  lastUpdated: string
  applicability: string
  obligationCount: number
  complianceRate: number
  status: 'active' | 'pending' | 'superseded' | 'repealed'
  relatedRegulations?: number[]
  createdAt: string
  updatedAt: string
}

export type RegulationCategory =
  | 'Data Privacy'
  | 'Financial'
  | 'Environmental'
  | 'Health & Safety'
  | 'Industry Specific'
  | 'Employment'
  | 'Trade'
  | 'Security'
  | 'Consumer Protection'
  | 'Anti-Corruption'

export interface ComplianceAssessment {
  id: number
  assessmentNumber: string
  title: string
  obligationId?: number
  obligation?: string
  regulationId?: number
  regulation?: string
  assessmentType: AssessmentType
  assessor: string
  assessorId: number
  assessmentDate: string
  scheduledDate: string
  completedDate?: string
  status: AssessmentStatus
  methodology: string
  scope: string
  findings: AssessmentFinding[]
  overallScore: number
  complianceLevel: ComplianceStatus
  recommendations: string[]
  actionPlans: number[]
  evidenceCollected: string[]
  createdAt: string
  updatedAt: string
}

export type AssessmentType =
  | 'self_assessment'
  | 'internal_audit'
  | 'external_audit'
  | 'regulatory_inspection'
  | 'due_diligence'
  | 'gap_analysis'

export type AssessmentStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'deferred'
  | 'cancelled'

export interface AssessmentFinding {
  id: number
  category: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  evidence: string
  recommendation: string
  isCompliant: boolean
}

export interface ComplianceActionPlan {
  id: number
  actionPlanNumber: string
  title: string
  obligationId?: number
  obligation?: string
  assessmentId?: number
  assessment?: string
  description: string
  rootCause: string
  correctiveAction: string
  preventiveAction: string
  owner: string
  ownerId: number
  assignee: string
  assigneeId: number
  priority: Priority
  status: ActionPlanStatus
  startDate: string
  dueDate: string
  completionDate?: string
  progress: number
  tasks: ActionPlanTask[]
  cost?: number
  createdAt: string
  updatedAt: string
}

export type ActionPlanStatus =
  | 'draft'
  | 'open'
  | 'in_progress'
  | 'pending_verification'
  | 'completed'
  | 'overdue'
  | 'cancelled'

export interface ActionPlanTask {
  id: number
  description: string
  assignee: string
  dueDate: string
  status: 'pending' | 'in_progress' | 'completed'
  completionDate?: string
}

export interface NonConformance {
  id: number
  ncNumber: string
  title: string
  obligationId: number
  obligation: string
  regulationId: number
  regulation: string
  description: string
  identifiedDate: string
  identifiedBy: string
  severity: 'minor' | 'major' | 'critical'
  impact: string
  status: 'open' | 'under_investigation' | 'action_plan_created' | 'resolved' | 'closed'
  resolutionDate?: string
  actionPlanId?: number
  createdAt: string
  updatedAt: string
}

export interface EvidenceDocument {
  id: number
  fileName: string
  fileType: string
  fileSize: number
  uploadDate: string
  uploadedBy: string
  obligationId?: number
  assessmentId?: number
  description: string
  expiryDate?: string
  status: 'current' | 'expired' | 'pending_renewal'
  tags: string[]
}

// Dashboard specific types
export interface ComplianceKPIs {
  totalObligations: number
  complianceRate: number
  overdueObligations: number
  upcomingDeadlines: number
  activeRegulations: number
  openNonConformances: number
  monthlyChanges: {
    total: number
    compliant: number
    overdue: number
    assessments: number
  }
}

export interface ObligationsByStatus {
  name: string
  value: number
  color?: string
}

export interface ObligationsByFrequency {
  name: string
  value: number
}

export interface ComplianceTrend {
  period: string
  compliant: number
  nonCompliant: number
  partiallyCompliant: number
  rate: number
}

export interface ObligationsByRegulation {
  name: string
  total: number
  compliant: number
  nonCompliant: number
  partiallyCompliant: number
  complianceRate: number
}

export interface ComplianceHeatmapData {
  department: string
  regulations: {
    [regulationName: string]: ComplianceStatus
  }
}

