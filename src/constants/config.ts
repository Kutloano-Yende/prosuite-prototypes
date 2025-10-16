// Application Configuration
export const APP_CONFIG = {
  name: 'ProSuite Prototypes',
  version: '1.0.0',
  description: 'Governance and Compliance Management Prototypes',
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    retries: 3
  },
  
  // Local Storage Keys
  storage: {
    capturedPolicies: 'capturedPolicies',
    capturedObligations: 'capturedObligations',
    userPreferences: 'userPreferences',
    theme: 'theme'
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  },
  
  // Date Formats
  dateFormats: {
    display: 'MMM dd, yyyy',
    input: 'yyyy-MM-dd',
    datetime: 'MMM dd, yyyy HH:mm'
  },
  
  // File Upload
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  }
} as const

// Status Options
export const STATUS_OPTIONS = {
  POLICY: [
    { value: 'Draft', label: 'Draft', color: 'yellow' },
    { value: 'Active', label: 'Active', color: 'green' },
    { value: 'Under Review', label: 'Under Review', color: 'blue' },
    { value: 'Expired', label: 'Expired', color: 'red' }
  ],
  
  OBLIGATION: [
    { value: 'Compliant', label: 'Compliant', color: 'green' },
    { value: 'Non-Compliant', label: 'Non-Compliant', color: 'red' },
    { value: 'Partially Compliant', label: 'Partially Compliant', color: 'yellow' },
    { value: 'Under Review', label: 'Under Review', color: 'blue' }
  ],
  
  ASSESSMENT: [
    { value: 'Planned', label: 'Planned', color: 'yellow' },
    { value: 'In Progress', label: 'In Progress', color: 'blue' },
    { value: 'Completed', label: 'Completed', color: 'green' },
    { value: 'Overdue', label: 'Overdue', color: 'red' }
  ],
  
  ACTION_PLAN: [
    { value: 'Draft', label: 'Draft', color: 'gray' },
    { value: 'Active', label: 'Active', color: 'green' },
    { value: 'In Progress', label: 'In Progress', color: 'blue' },
    { value: 'Completed', label: 'Completed', color: 'green' },
    { value: 'Overdue', label: 'Overdue', color: 'red' }
  ]
} as const

// Priority Options
export const PRIORITY_OPTIONS = [
  { value: 'Low', label: 'Low', color: 'green', level: 1 },
  { value: 'Medium', label: 'Medium', color: 'yellow', level: 2 },
  { value: 'High', label: 'High', color: 'orange', level: 3 },
  { value: 'Critical', label: 'Critical', color: 'red', level: 4 }
] as const

// Category Options
export const CATEGORY_OPTIONS = {
  POLICY: [
    'Information Security',
    'Data Protection',
    'Risk Management',
    'Human Resources',
    'Financial Controls',
    'IT Governance',
    'Business Continuity',
    'Quality Management'
  ],
  
  OBLIGATION: [
    'Data Protection',
    'Financial Controls',
    'Information Security',
    'Health & Safety',
    'Environmental',
    'Labor Law',
    'Anti-Corruption',
    'Privacy'
  ]
} as const

// Frequency Options
export const FREQUENCY_OPTIONS = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Quarterly', label: 'Quarterly' },
  { value: 'Annually', label: 'Annually' },
  { value: 'One-time', label: 'One-time' }
] as const

// Department Options
export const DEPARTMENT_OPTIONS = [
  'IT',
  'Legal',
  'Finance',
  'HR',
  'Risk Management',
  'Compliance',
  'Operations',
  'Executive',
  'Audit',
  'Security'
] as const
