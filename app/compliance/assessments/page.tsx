'use client'

import { useState } from 'react'

interface Assessment {
  id: string
  assessmentCode: string
  title: string
  obligationId: string
  obligationTitle: string
  assessmentType: 'Initial' | 'Periodic' | 'Ad-hoc' | 'Follow-up'
  status: 'Planned' | 'In Progress' | 'Completed' | 'Overdue'
  assessor: string
  startDate: string
  dueDate: string
  completionDate: string
  score: number
  maxScore: number
  findings: number
  recommendations: number
  description: string
}

export default function AssessmentsPage() {
  const [assessments] = useState<Assessment[]>([
    {
      id: '1',
      assessmentCode: 'ASS-001',
      title: 'GDPR Data Protection Assessment',
      obligationId: 'OBL-001',
      obligationTitle: 'Data Breach Notification',
      assessmentType: 'Periodic',
      status: 'Completed',
      assessor: 'Sarah Johnson',
      startDate: '2024-01-15',
      dueDate: '2024-02-15',
      completionDate: '2024-02-10',
      score: 85,
      maxScore: 100,
      findings: 3,
      recommendations: 5,
      description: 'Quarterly assessment of GDPR compliance measures'
    },
    {
      id: '2',
      assessmentCode: 'ASS-002',
      title: 'SOX Financial Controls Review',
      obligationId: 'OBL-002',
      obligationTitle: 'Financial Reporting',
      assessmentType: 'Initial',
      status: 'In Progress',
      assessor: 'Mike Davis',
      startDate: '2024-02-01',
      dueDate: '2024-03-01',
      completionDate: '',
      score: 0,
      maxScore: 100,
      findings: 0,
      recommendations: 0,
      description: 'Initial assessment of SOX compliance controls'
    },
    {
      id: '3',
      assessmentCode: 'ASS-003',
      title: 'ISO 27001 Security Assessment',
      obligationId: 'OBL-003',
      obligationTitle: 'Information Security Assessment',
      assessmentType: 'Follow-up',
      status: 'Planned',
      assessor: 'John Smith',
      startDate: '2024-03-01',
      dueDate: '2024-04-01',
      completionDate: '',
      score: 0,
      maxScore: 100,
      findings: 0,
      recommendations: 0,
      description: 'Follow-up assessment for ISO 27001 certification'
    },
    {
      id: '4',
      assessmentCode: 'ASS-004',
      title: 'HIPAA Privacy Assessment',
      obligationId: 'OBL-004',
      obligationTitle: 'Patient Data Protection',
      assessmentType: 'Ad-hoc',
      status: 'Overdue',
      assessor: 'Lisa Wilson',
      startDate: '2024-01-01',
      dueDate: '2024-01-31',
      completionDate: '',
      score: 0,
      maxScore: 100,
      findings: 0,
      recommendations: 0,
      description: 'Ad-hoc assessment triggered by regulatory changes'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Planned': return 'bg-yellow-100 text-yellow-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case 'Initial': return 'bg-blue-100 text-blue-800'
      case 'Periodic': return 'bg-green-100 text-green-800'
      case 'Ad-hoc': return 'bg-purple-100 text-purple-800'
      case 'Follow-up': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Assessments</h1>
            <p className="text-gray-600 mt-1">Manage and track compliance assessment activities</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Schedule Assessment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Assessments</p>
              <p className="text-3xl font-bold text-gray-900">{assessments.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Completed</p>
              <p className="text-3xl font-bold text-green-600">{assessments.filter(a => a.status === 'Completed').length}</p>
            </div>
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{assessments.filter(a => a.status === 'In Progress').length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{assessments.filter(a => a.status === 'Overdue').length}</p>
            </div>
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Assessment Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment Progress Overview</h2>
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{assessment.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{assessment.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Assessor: {assessment.assessor}</span>
                  <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                  <span>Type: {assessment.assessmentType}</span>
                </div>
              </div>
              <div className="ml-4 text-right">
                {assessment.status === 'Completed' ? (
                  <div>
                    <div className={`text-2xl font-bold ${getScoreColor(assessment.score, assessment.maxScore)}`}>
                      {assessment.score}/{assessment.maxScore}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Pending</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Assessments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obligation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessments.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {assessment.assessmentCode}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                      <div className="text-sm text-gray-500">{assessment.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{assessment.obligationTitle}</div>
                      <div className="text-sm text-gray-500">{assessment.obligationId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAssessmentTypeColor(assessment.assessmentType)}`}>
                      {assessment.assessmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.assessor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(assessment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assessment.status === 'Completed' ? (
                      <div className="text-sm">
                        <div className={`font-semibold ${getScoreColor(assessment.score, assessment.maxScore)}`}>
                          {assessment.score}/{assessment.maxScore}
                        </div>
                        <div className="text-xs text-gray-500">
                          {assessment.findings} findings, {assessment.recommendations} recommendations
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      {assessment.status === 'In Progress' && (
                        <button className="text-purple-600 hover:text-purple-900">Continue</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assessment Calendar */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assessments</h2>
        <div className="space-y-3">
          {assessments
            .filter(a => a.status === 'Planned' || a.status === 'In Progress')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    assessment.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{assessment.title}</h3>
                    <p className="text-xs text-gray-500">Due: {new Date(assessment.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
