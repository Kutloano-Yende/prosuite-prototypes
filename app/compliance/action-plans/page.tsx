'use client'

import { useState } from 'react'

interface ActionPlan {
  id: string
  planCode: string
  title: string
  obligationId: string
  obligationTitle: string
  assessmentId: string
  status: 'Draft' | 'Active' | 'In Progress' | 'Completed' | 'Overdue'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  owner: string
  assignedTo: string
  startDate: string
  dueDate: string
  completionDate: string
  progress: number
  totalActions: number
  completedActions: number
  description: string
  actions: Action[]
}

interface Action {
  id: string
  title: string
  description: string
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue'
  assignedTo: string
  dueDate: string
  completionDate: string
}

export default function ActionPlansPage() {
  const [actionPlans] = useState<ActionPlan[]>([
    {
      id: '1',
      planCode: 'AP-001',
      title: 'GDPR Compliance Remediation',
      obligationId: 'OBL-001',
      obligationTitle: 'Data Breach Notification',
      assessmentId: 'ASS-001',
      status: 'In Progress',
      priority: 'Critical',
      owner: 'Sarah Johnson',
      assignedTo: 'IT Security Team',
      startDate: '2024-02-10',
      dueDate: '2024-04-10',
      completionDate: '',
      progress: 65,
      totalActions: 8,
      completedActions: 5,
      description: 'Remediation plan for GDPR compliance gaps identified in assessment',
      actions: [
        {
          id: '1',
          title: 'Implement data encryption',
          description: 'Encrypt all sensitive data at rest and in transit',
          status: 'Completed',
          assignedTo: 'IT Security Team',
          dueDate: '2024-02-28',
          completionDate: '2024-02-25'
        },
        {
          id: '2',
          title: 'Update privacy notices',
          description: 'Review and update all privacy notices for GDPR compliance',
          status: 'In Progress',
          assignedTo: 'Legal Team',
          dueDate: '2024-03-15',
          completionDate: ''
        },
        {
          id: '3',
          title: 'Conduct staff training',
          description: 'Train all staff on GDPR requirements and data handling',
          status: 'Not Started',
          assignedTo: 'HR Team',
          dueDate: '2024-03-30',
          completionDate: ''
        }
      ]
    },
    {
      id: '2',
      planCode: 'AP-002',
      title: 'SOX Controls Implementation',
      obligationId: 'OBL-002',
      obligationTitle: 'Financial Reporting',
      assessmentId: 'ASS-002',
      status: 'Active',
      priority: 'High',
      owner: 'Mike Davis',
      assignedTo: 'Finance Team',
      startDate: '2024-03-01',
      dueDate: '2024-05-01',
      completionDate: '',
      progress: 30,
      totalActions: 12,
      completedActions: 4,
      description: 'Implementation of SOX compliance controls and procedures',
      actions: [
        {
          id: '1',
          title: 'Document financial processes',
          description: 'Document all financial reporting processes and controls',
          status: 'Completed',
          assignedTo: 'Finance Team',
          dueDate: '2024-03-10',
          completionDate: '2024-03-08'
        },
        {
          id: '2',
          title: 'Implement access controls',
          description: 'Implement role-based access controls for financial systems',
          status: 'In Progress',
          assignedTo: 'IT Team',
          dueDate: '2024-03-25',
          completionDate: ''
        }
      ]
    },
    {
      id: '3',
      planCode: 'AP-003',
      title: 'ISO 27001 Gap Remediation',
      obligationId: 'OBL-003',
      obligationTitle: 'Information Security Assessment',
      assessmentId: 'ASS-003',
      status: 'Draft',
      priority: 'Medium',
      owner: 'John Smith',
      assignedTo: 'IT Security Team',
      startDate: '2024-04-01',
      dueDate: '2024-06-01',
      completionDate: '',
      progress: 0,
      totalActions: 6,
      completedActions: 0,
      description: 'Remediation plan for ISO 27001 certification gaps',
      actions: []
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-gray-100 text-gray-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Not Started': return 'bg-gray-100 text-gray-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Action Plans</h1>
            <p className="text-gray-600 mt-1">Manage compliance remediation and improvement plans</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Action Plan
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Plans</p>
              <p className="text-3xl font-bold text-gray-900">{actionPlans.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Active</p>
              <p className="text-3xl font-bold text-green-600">{actionPlans.filter(a => a.status === 'Active' || a.status === 'In Progress').length}</p>
            </div>
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Completed</p>
              <p className="text-3xl font-bold text-blue-600">{actionPlans.filter(a => a.status === 'Completed').length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Critical</p>
              <p className="text-3xl font-bold text-red-600">{actionPlans.filter(a => a.priority === 'Critical').length}</p>
            </div>
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {actionPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                <p className="text-sm text-gray-500">{plan.planCode}</p>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                  {plan.status}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(plan.priority)}`}>
                  {plan.priority}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-semibold text-gray-900">{plan.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    plan.progress >= 80 ? 'bg-green-500' :
                    plan.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{plan.completedActions}/{plan.totalActions} actions completed</span>
                <span>Due: {new Date(plan.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Owner: {plan.owner}</span>
                <span>Assigned to: {plan.assignedTo}</span>
              </div>
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

      {/* Action Plans Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Action Plans</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obligation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actionPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {plan.planCode}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{plan.title}</div>
                      <div className="text-sm text-gray-500">{plan.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{plan.obligationTitle}</div>
                      <div className="text-sm text-gray-500">{plan.obligationId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(plan.priority)}`}>
                      {plan.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            plan.progress >= 80 ? 'bg-green-500' :
                            plan.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{plan.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(plan.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-purple-600 hover:text-purple-900">Track</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
