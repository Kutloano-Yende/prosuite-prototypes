'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockComplianceKPIs, mockObligationsByStatus, mockCriticalObligations } from '../../utils/mockData/complianceMockData'
import type { ObligationsByStatus } from '../../types/compliance'

export default function ComplianceDashboard() {
  const [capturedObligations, setCapturedObligations] = useState<any[]>([])
  
  // Load captured obligations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('capturedObligations')
    if (stored) {
      setCapturedObligations(JSON.parse(stored))
    }
  }, [])
  
  const kpis = {
    ...mockComplianceKPIs,
    totalObligations: mockComplianceKPIs.totalObligations + capturedObligations.length
  }
  const obligationsByStatus: ObligationsByStatus[] = mockObligationsByStatus
  
  // Combine captured obligations with mock data, showing captured ones first
  const criticalObligations = [...capturedObligations.slice().reverse(), ...mockCriticalObligations].slice(0, 5)

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
            <p className="text-gray-600 mt-1">Overview of compliance management metrics and activities</p>
          </div>
          <Link
            href="/compliance/add-obligation"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Obligation
          </Link>
        </div>
      </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Total Obligations</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.totalObligations}</p>
                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.total}% vs last month</p>
              </div>
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Compliance Rate</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.complianceScore}%</p>
                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.compliant}% vs last month</p>
              </div>
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Overdue Obligations</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.overdueObligations}</p>
                <p className="text-sm text-green-600 mt-2">↗ {Math.abs(kpis.monthlyChanges.overdue)}% improvement</p>
              </div>
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Upcoming Deadlines</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.upcomingDeadlines}</p>
                <p className="text-sm text-orange-600 mt-2">Next 7 days</p>
              </div>
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Compliance Rate Gauge */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Compliance Rate</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="20"
                  strokeDasharray={`${kpis.complianceScore * 6.28}, 628`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-gray-900">{kpis.complianceScore}%</div>
                <div className="text-sm text-gray-500 mt-2">Compliant</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Status Overview */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Status Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {obligationsByStatus.map((item) => (
              <div key={item.name} className="text-center p-4 rounded-lg" style={{backgroundColor: item.color + '20'}}>
                <div className="text-3xl font-bold" style={{color: item.color}}>{item.value}</div>
                <div className="text-sm text-gray-600 mt-2">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Obligations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Critical Obligations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obligation ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Regulation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {criticalObligations.map((obligation, index) => {
                  const isNewlyCreated = index < capturedObligations.length
                  return (
                    <tr key={obligation.id} className={`hover:bg-gray-50 ${isNewlyCreated ? 'bg-green-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {obligation.obligationCode}
                        {isNewlyCreated && <span className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded-full">NEW</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{obligation.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obligation.regulation}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          obligation.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          obligation.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          obligation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {obligation.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          obligation.status === 'compliant' ? 'bg-green-100 text-green-800' :
                          obligation.status === 'non_compliant' ? 'bg-red-100 text-red-800' :
                          obligation.status === 'partially_compliant' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {obligation.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obligation.owner}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

