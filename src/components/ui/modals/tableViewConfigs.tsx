import { TableViewConfig } from './TableViewModal'

export const policyViewConfig: TableViewConfig = {
  title: 'Policy Details',
  subtitle: 'View and manage policy information',
  type: 'policy',
  fields: [
    {
      label: 'POLICY ID',
      value: 'policyNumber',
      type: 'text'
    },
    {
      label: 'VERSION',
      value: 'version',
      type: 'text'
    },
    {
      label: 'STATUS',
      value: 'status',
      type: 'badge',
      badgeColor: 'green'
    },
    {
      label: 'OWNER',
      value: 'owner',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'APPROVER',
      value: 'approver',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'EFFECTIVE DATE',
      value: 'effectiveDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'NEXT REVIEW',
      value: 'nextReviewDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ],
  sections: [
    {
      title: 'Policy Description',
      content: 'description',
      type: 'default'
    }
  ],
  actions: [
    {
      label: 'Edit',
      onClick: () => console.log('Edit policy'),
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ]
}

export const obligationViewConfig: TableViewConfig = {
  title: 'Compliance Obligation',
  subtitle: 'View and manage compliance obligations',
  type: 'obligation',
  fields: [
    {
      label: 'OBLIGATION ID',
      value: 'obligationCode',
      type: 'text'
    },
    {
      label: 'STATUS',
      value: 'status',
      type: 'badge',
      badgeColor: 'green'
    },
    {
      label: 'PRIORITY',
      value: 'priority',
      type: 'badge',
      badgeColor: 'red'
    },
    {
      label: 'REGULATION',
      value: 'regulation',
      type: 'badge',
      badgeColor: 'blue'
    },
    {
      label: 'OWNER',
      value: 'owner',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'DUE DATE',
      value: 'dueDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'NEXT ASSESSMENT',
      value: 'nextAssessmentDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ],
  sections: [
    {
      title: 'Compliance Requirements',
      content: 'description',
      type: 'default'
    },
    {
      title: 'Evidence Required',
      content: 'Evidence items required for compliance',
      type: 'info',
      items: 'evidenceRequired'
    },
    {
      title: 'Consequences of Non-Compliance',
      content: 'consequencesOfNonCompliance',
      type: 'warning'
    }
  ],
  actions: [
    {
      label: 'Edit',
      onClick: () => console.log('Edit obligation'),
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ]
}

export const assessmentViewConfig: TableViewConfig = {
  title: 'Compliance Assessment',
  subtitle: 'View and manage compliance assessments',
  type: 'assessment',
  fields: [
    {
      label: 'ASSESSMENT ID',
      value: 'assessmentCode',
      type: 'text'
    },
    {
      label: 'STATUS',
      value: 'status',
      type: 'badge',
      badgeColor: 'blue'
    },
    {
      label: 'ASSESSOR',
      value: 'assessor',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'ASSESSMENT DATE',
      value: 'assessmentDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'NEXT ASSESSMENT',
      value: 'nextAssessmentDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ],
  sections: [
    {
      title: 'Assessment Details',
      content: 'description',
      type: 'default'
    },
    {
      title: 'Findings',
      content: 'Assessment findings and observations',
      type: 'info',
      items: 'findings'
    }
  ],
  actions: [
    {
      label: 'Edit',
      onClick: () => console.log('Edit assessment'),
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ]
}

export const actionPlanViewConfig: TableViewConfig = {
  title: 'Action Plan',
  subtitle: 'View and manage remediation action plans',
  type: 'action-plan',
  fields: [
    {
      label: 'ACTION PLAN ID',
      value: 'actionPlanCode',
      type: 'text'
    },
    {
      label: 'STATUS',
      value: 'status',
      type: 'badge',
      badgeColor: 'green'
    },
    {
      label: 'PRIORITY',
      value: 'priority',
      type: 'badge',
      badgeColor: 'red'
    },
    {
      label: 'OWNER',
      value: 'owner',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'DUE DATE',
      value: 'dueDate',
      type: 'date',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ],
  sections: [
    {
      title: 'Action Plan Description',
      content: 'description',
      type: 'default'
    },
    {
      title: 'Action Items',
      content: 'Detailed action items for remediation',
      type: 'info',
      items: 'actionItems'
    }
  ],
  actions: [
    {
      label: 'Edit',
      onClick: () => console.log('Edit action plan'),
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ]
}

export const controlViewConfig: TableViewConfig = {
  title: 'Control Details',
  subtitle: 'View and manage compliance control information',
  type: 'control',
  fields: [
    {
      label: 'CONTROL NAME',
      value: 'name',
      type: 'text'
    },
    {
      label: 'CONTROL TYPE',
      value: 'controlType',
      type: 'badge',
      badgeColor: 'blue'
    },
    {
      label: 'FAMILY',
      value: 'family',
      type: 'text'
    },
    {
      label: 'STATUS',
      value: 'implementationStatus',
      type: 'badge',
      badgeColor: 'green'
    },
    {
      label: 'PRIORITY',
      value: 'priority',
      type: 'badge',
      badgeColor: 'red'
    },
    {
      label: 'RISK LEVEL',
      value: 'riskLevel',
      type: 'badge',
      badgeColor: 'orange'
    },
    {
      label: 'OWNER',
      value: 'owner',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'EFFECTIVENESS',
      value: 'effectivenessRating',
      type: 'badge',
      badgeColor: 'purple'
    },
    {
      label: 'AUTOMATION',
      value: 'automationLevel',
      type: 'text'
    },
    {
      label: 'FREQUENCY',
      value: 'frequency',
      type: 'text'
    },
    {
      label: 'LAST REVIEW',
      value: 'lastReviewDate',
      type: 'date'
    },
    {
      label: 'NEXT REVIEW',
      value: 'nextReviewDate',
      type: 'date'
    }
  ],
  sections: [
    {
      title: 'Control Description',
      content: 'description',
      type: 'default'
    },
    {
      title: 'Related Regulations',
      content: 'relatedRegulations',
      type: 'list'
    },
    {
      title: 'Evidence of Effectiveness',
      content: 'evidence',
      type: 'list'
    },
    {
      title: 'Financial Consequences of Failure',
      content: 'consequencesOfFailure.financial',
      type: 'default'
    },
    {
      title: 'Operational Consequences of Failure',
      content: 'consequencesOfFailure.operational',
      type: 'default'
    },
    {
      title: 'Reputational Consequences of Failure',
      content: 'consequencesOfFailure.reputational',
      type: 'default'
    },
    {
      title: 'Legal/Regulatory Consequences of Failure',
      content: 'consequencesOfFailure.legal',
      type: 'default'
    },
    {
      title: 'Compensating Controls',
      content: 'compensatingControls',
      type: 'list'
    },
    {
      title: 'Additional Notes',
      content: 'notes',
      type: 'default'
    }
  ],
  actions: [
    {
      label: 'Edit Control',
      onClick: () => console.log('Edit control'),
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      label: 'Test Control',
      onClick: () => console.log('Test control'),
      variant: 'secondary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'View Evidence',
      onClick: () => console.log('View evidence'),
      variant: 'secondary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ]
}

export const regulationViewConfig: TableViewConfig = {
  title: 'Regulation Details',
  subtitle: 'View and manage regulation information',
  type: 'regulation',
  fields: [
    {
      label: 'REGULATION TITLE',
      value: 'title',
      type: 'text'
    },
    {
      label: 'CATEGORY',
      value: 'category',
      type: 'badge',
      badgeColor: 'blue'
    },
    {
      label: 'STATUS',
      value: 'status',
      type: 'badge',
      badgeColor: 'green'
    },
    {
      label: 'VERSION',
      value: 'version',
      type: 'text'
    },
    {
      label: 'EFFECTIVE DATE',
      value: 'effectiveDate',
      type: 'date'
    },
    {
      label: 'SOURCE AUTHORITY',
      value: 'sourceAuthority',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      label: 'JURISDICTION',
      value: 'jurisdiction',
      type: 'text'
    },
    {
      label: 'RESPONSIBLE OFFICER',
      value: 'responsibleOfficer',
      type: 'text',
      icon: (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'REVIEW FREQUENCY',
      value: 'reviewFrequency',
      type: 'text'
    },
    {
      label: 'NEXT REVIEW',
      value: 'nextReviewDate',
      type: 'date'
    },
    {
      label: 'APPROVAL STATUS',
      value: 'approvalStatus',
      type: 'badge',
      badgeColor: 'purple'
    },
    {
      label: 'MONITORING FREQUENCY',
      value: 'monitoringFrequency',
      type: 'text'
    }
  ],
  sections: [
    {
      title: 'Regulation Description',
      content: 'description',
      type: 'default'
    },
    {
      title: 'Compliance Requirements',
      content: 'complianceRequirements',
      type: 'list'
    },
    {
      title: 'Evidence Field',
      content: 'evidenceField',
      type: 'default'
    },
    {
      title: 'Penalties',
      content: 'penalties',
      type: 'default'
    },
    {
      title: 'Applicable Departments',
      content: 'applicableDepartments',
      type: 'list'
    },
    {
      title: 'Training Required',
      content: 'trainingRequired',
      type: 'list'
    },
    {
      title: 'Related Obligations',
      content: 'relatedObligations',
      type: 'list'
    },
    {
      title: 'Related Controls',
      content: 'relatedControls',
      type: 'list'
    },
    {
      title: 'Additional Notes',
      content: 'notes',
      type: 'default'
    }
  ],
  actions: [
    {
      label: 'Edit Regulation',
      onClick: () => console.log('Edit regulation'),
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      label: 'View Obligations',
      onClick: () => console.log('View related obligations'),
      variant: 'secondary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      label: 'View Controls',
      onClick: () => console.log('View related controls'),
      variant: 'secondary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ]
}

// Helper function to get config by type
export const getViewConfig = (type: string): TableViewConfig => {
  switch (type) {
    case 'policy':
      return policyViewConfig
    case 'obligation':
      return obligationViewConfig
    case 'assessment':
      return assessmentViewConfig
    case 'action-plan':
      return actionPlanViewConfig
    case 'control':
      return controlViewConfig
    case 'regulation':
      return regulationViewConfig
    default:
      return policyViewConfig
  }
}
