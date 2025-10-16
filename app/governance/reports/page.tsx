'use client'

import { useState } from 'react'

interface Report {
  id: string
  name: string
  type: string
  description: string
  lastGenerated: string
  status: 'Available' | 'Generating' | 'Error'
  format: 'PDF' | 'Excel' | 'CSV'
  size: string
}

export default function ReportsPage() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Policy Compliance Report',
      type: 'Compliance',
      description: 'Comprehensive overview of policy compliance across all departments',
      lastGenerated: '2024-02-15',
      status: 'Available',
      format: 'PDF',
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'Framework Assessment',
      type: 'Assessment',
      description: 'Detailed assessment of governance framework implementation',
      lastGenerated: '2024-02-10',
      status: 'Available',
      format: 'Excel',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Review Schedule Report',
      type: 'Schedule',
      description: 'Upcoming and overdue policy reviews',
      lastGenerated: '2024-02-20',
      status: 'Available',
      format: 'CSV',
      size: '0.5 MB'
    },
    {
      id: '4',
      name: 'Risk Assessment Summary',
      type: 'Risk',
      description: 'Summary of identified risks and mitigation strategies',
      lastGenerated: '2024-02-18',
      status: 'Generating',
      format: 'PDF',
      size: '-'
    }
  ])

  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Generating': return 'bg-blue-100 text-blue-800'
      case 'Error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return '📄'
      case 'Excel': return '📊'
      case 'CSV': return '📋'
      default: return '📄'
    }
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Governance Reports</h1>
            <p className="text-gray-600 mt-1">Generate and manage governance reports</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Available</p>
              <p className="text-3xl font-bold text-green-600">{reports.filter(r => r.status === 'Available').length}</p>
            </div>
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Generating</p>
              <p className="text-3xl font-bold text-blue-600">{reports.filter(r => r.status === 'Generating').length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">This Month</p>
              <p className="text-3xl font-bold text-purple-600">
                {reports.filter(r => new Date(r.lastGenerated).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Compliance Report</h3>
                <p className="text-xs text-gray-500">Generate compliance overview</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Policy Audit</h3>
                <p className="text-xs text-gray-500">Audit policy effectiveness</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Review Schedule</h3>
                <p className="text-xs text-gray-500">Upcoming reviews report</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getFormatIcon(report.format)}</span>
                      <span className="text-sm text-gray-500">{report.format}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.lastGenerated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {report.status === 'Available' ? (
                        <>
                          <button className="text-blue-600 hover:text-blue-900">Download</button>
                          <button className="text-green-600 hover:text-green-900">View</button>
                        </>
                      ) : report.status === 'Generating' ? (
                        <span className="text-blue-600">Generating...</span>
                      ) : (
                        <button className="text-red-600 hover:text-red-900">Retry</button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900">Regenerate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Templates */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Executive Summary</h3>
            <p className="text-xs text-gray-500 mb-3">High-level governance overview for executives</p>
            <button className="text-xs text-blue-600 hover:text-blue-800">Use Template</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Detailed Analysis</h3>
            <p className="text-xs text-gray-500 mb-3">Comprehensive governance analysis with metrics</p>
            <button className="text-xs text-blue-600 hover:text-blue-800">Use Template</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Compliance Dashboard</h3>
            <p className="text-xs text-gray-500 mb-3">Visual compliance status and trends</p>
            <button className="text-xs text-blue-600 hover:text-blue-800">Use Template</button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Audit Report</h3>
            <p className="text-xs text-gray-500 mb-3">Detailed audit findings and recommendations</p>
            <button className="text-xs text-blue-600 hover:text-blue-800">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  )
}
