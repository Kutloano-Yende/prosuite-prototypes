// Application Routes
export const ROUTES = {
  // Home
  HOME: '/',
  
  // Governance
  GOVERNANCE: {
    DASHBOARD: '/governance',
    POLICIES: '/governance/policies',
    FRAMEWORKS: '/governance/frameworks',
    REVIEWS: '/governance/reviews',
    REPORTS: '/governance/reports',
    ADD_POLICY: '/governance/add-policy'
  },
  
  // Compliance
  COMPLIANCE: {
    DASHBOARD: '/compliance',
    OBLIGATIONS: '/compliance/obligations',
    ASSESSMENTS: '/compliance/assessments',
    ACTION_PLANS: '/compliance/action-plans',
    REPORTS: '/compliance/reports',
    ADD_OBLIGATION: '/compliance/add-obligation'
  }
} as const

// Navigation Menu Items
export const NAVIGATION_ITEMS = {
  PRIMARY: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: ROUTES.HOME,
      icon: 'dashboard'
    },
    {
      id: 'governance',
      label: 'Governance',
      href: ROUTES.GOVERNANCE.DASHBOARD,
      icon: 'governance'
    },
    {
      id: 'compliance',
      label: 'Compliance',
      href: ROUTES.COMPLIANCE.DASHBOARD,
      icon: 'compliance'
    }
  ],
  
  GOVERNANCE: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: ROUTES.GOVERNANCE.DASHBOARD,
      icon: 'dashboard'
    },
    {
      id: 'policies',
      label: 'Policies',
      href: ROUTES.GOVERNANCE.POLICIES,
      icon: 'policies'
    },
    {
      id: 'frameworks',
      label: 'Frameworks',
      href: ROUTES.GOVERNANCE.FRAMEWORKS,
      icon: 'frameworks'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      href: ROUTES.GOVERNANCE.REVIEWS,
      icon: 'reviews'
    },
    {
      id: 'reports',
      label: 'Reports',
      href: ROUTES.GOVERNANCE.REPORTS,
      icon: 'reports'
    }
  ],
  
  COMPLIANCE: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: ROUTES.COMPLIANCE.DASHBOARD,
      icon: 'dashboard'
    },
    {
      id: 'obligations',
      label: 'Obligations',
      href: ROUTES.COMPLIANCE.OBLIGATIONS,
      icon: 'obligations'
    },
    {
      id: 'assessments',
      label: 'Assessments',
      href: ROUTES.COMPLIANCE.ASSESSMENTS,
      icon: 'assessments'
    },
    {
      id: 'action-plans',
      label: 'Action Plans',
      href: ROUTES.COMPLIANCE.ACTION_PLANS,
      icon: 'action-plans'
    },
    {
      id: 'reports',
      label: 'Reports',
      href: ROUTES.COMPLIANCE.REPORTS,
      icon: 'reports'
    }
  ]
} as const
