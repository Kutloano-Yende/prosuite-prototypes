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
    default:
      return policyViewConfig
  }
}
