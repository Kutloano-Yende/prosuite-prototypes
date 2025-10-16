'use client'

import { useState } from 'react'

interface Framework {
  id: string
  name: string
  type: string
  status: 'Active' | 'Inactive' | 'Under Review'
  complianceLevel: number
  lastUpdated: string
  description: string
  applicablePolicies: number
}

export default function FrameworksPage() {
  const [frameworks] = useState<Framework[]>([
    {
      id: '1',
      name: 'ISO 27001',
      type: 'Information Security',
      status: 'Active',
      complianceLevel: 85,
      lastUpdated: '2024-01-15',
      description: 'Information security management system standard',
      applicablePolicies: 12
    },
    {
      id: '2',
      name: 'GDPR',
      type: 'Data Protection',
      status: 'Active',
      complianceLevel: 92,
      lastUpdated: '2024-02-01',
      description: 'General Data Protection Regulation compliance framework',
      applicablePolicies: 8
    },
    {
      id: '3',
      name: 'SOX',
      type: 'Financial Controls',
      status: 'Under Review',
      complianceLevel: 78,
      lastUpdated: '2023-12-10',
      description: 'Sarbanes-Oxley Act compliance framework',
      applicablePolicies: 15
    },
    {
      id: '4',
      name: 'COBIT',
      type: 'IT Governance',
      status: 'Active',
      complianceLevel: 88,
      lastUpdated: '2024-01-20',
      description: 'Control Objectives for Information and Related Technologies',
      applicablePolicies: 20
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplianceColor = (level: number) => {
    if (level >= 90) return 'text-green-600'
    if (level >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Governance Frameworks</h1>
            <p className="text-gray-600 mt-1">Manage compliance frameworks and standards</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Framework
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Frameworks</p>
              <p className="text-3xl font-bold text-gray-900">{frameworks.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Active</p>
              <p className="text-3xl font-bold text-green-600">{frameworks.filter(f => f.status === 'Active').length}</p>
            </div>
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Avg Compliance</p>
              <p className="text-3xl font-bold text-blue-600">
                {Math.round(frameworks.reduce((acc, f) => acc + f.complianceLevel, 0) / frameworks.length)}%
              </p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Policies</p>
              <p className="text-3xl font-bold text-purple-600">
                {frameworks.reduce((acc, f) => acc + f.applicablePolicies, 0)}
              </p>
            </div>
            <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <div key={framework.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{framework.name}</h3>
                <p className="text-sm text-gray-500">{framework.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(framework.status)}`}>
                {framework.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Compliance Level</span>
                <span className={`text-sm font-semibold ${getComplianceColor(framework.complianceLevel)}`}>
                  {framework.complianceLevel}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    framework.complianceLevel >= 90 ? 'bg-green-500' :
                    framework.complianceLevel >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${framework.complianceLevel}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{framework.applicablePolicies} policies</span>
                <span>Updated {new Date(framework.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Overview Chart */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h2>
        <div className="space-y-4">
          {frameworks.map((framework) => (
            <div key={framework.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">{framework.name}</span>
                  <span className={`text-sm font-semibold ${getComplianceColor(framework.complianceLevel)}`}>
                    {framework.complianceLevel}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      framework.complianceLevel >= 90 ? 'bg-green-500' :
                      framework.complianceLevel >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${framework.complianceLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
