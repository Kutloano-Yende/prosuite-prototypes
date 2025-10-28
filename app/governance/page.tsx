'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockGovernanceKPIs, mockPolicyDistribution, mockRecentPolicyUpdates } from '@/utils'

export default function GovernanceDashboard() {
  const [capturedPolicies, setCapturedPolicies] = useState<any[]>([])
  
  // Load captured policies from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('capturedPolicies')
    if (stored) {
      setCapturedPolicies(JSON.parse(stored))
    }
  }, [])
  
  const kpis = {
    ...mockGovernanceKPIs,
    totalPolicies: mockGovernanceKPIs.totalPolicies + capturedPolicies.length
  }
  const policyDistribution = mockPolicyDistribution
  
  // Combine captured policies with mock data, showing captured ones first
  const recentPolicies = [...capturedPolicies.slice().reverse(), ...mockRecentPolicyUpdates].slice(0, 5)

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Governance Management</h1>
            <p className="text-gray-600 mt-1">Overview of governance framework and activities</p>
          </div>
          <Link
            href="/governance/add-policy"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Policy
          </Link>
        </div>
      </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Total Policies</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.totalPolicies}</p>
                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.policies}% vs last month</p>
              </div>
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Due for Review</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.underReview}</p>
                <p className="text-sm text-red-600 mt-2">↘ {Math.abs(kpis.monthlyChanges.review)}% vs last month</p>
              </div>
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Active Policies</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.activePolicies}</p>
                <p className="text-sm text-gray-600 mt-2">↗ {kpis.monthlyChanges.active}% vs last month</p>
              </div>
              <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Expired Policies</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.expired}</p>
                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.expired}% vs last month</p>
              </div>
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Compliance Score */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Governance Compliance Score</h2>
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
                <div className="text-5xl font-bold text-gray-900">{kpis.complianceScore.toFixed(1)}%</div>
                <div className="text-sm text-gray-500 mt-2">Overall Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Status Distribution */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Status Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {policyDistribution.map((item) => (
              <div key={item.category} className="text-center p-4 rounded-lg" style={{backgroundColor: '#3B82F6' + '20'}}>
                <div className="text-3xl font-bold" style={{color: '#3B82F6'}}>{item.count}</div>
                <div className="text-sm text-gray-600 mt-2">{item.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Policy Updates Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Policy Updates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPolicies.map((policy, index) => {
                  const isNewlyCreated = index < capturedPolicies.length
                  return (
                    <tr key={policy.id} className={`hover:bg-gray-50 ${isNewlyCreated ? 'bg-green-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {policy.policyNumber}
                        {isNewlyCreated && <span className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded-full">NEW</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{policy.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {policy.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          policy.status === 'active' ? 'bg-green-100 text-green-800' :
                          policy.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          policy.status === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {policy.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.version}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.owner}</td>
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

