'use client'

import { useState } from 'react'

interface Review {
  id: string
  policyId: string
  policyTitle: string
  reviewType: 'Scheduled' | 'Ad-hoc' | 'Emergency'
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue'
  assignedTo: string
  dueDate: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  lastReviewDate: string
  nextReviewDate: string
  comments: string
}

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      policyId: 'POL-001',
      policyTitle: 'Information Security Policy',
      reviewType: 'Scheduled',
      status: 'In Progress',
      assignedTo: 'John Smith',
      dueDate: '2024-03-15',
      priority: 'High',
      lastReviewDate: '2023-09-15',
      nextReviewDate: '2024-09-15',
      comments: 'Annual review of security controls and procedures'
    },
    {
      id: '2',
      policyId: 'POL-002',
      policyTitle: 'Data Protection Policy',
      reviewType: 'Scheduled',
      status: 'Pending',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-04-01',
      priority: 'Critical',
      lastReviewDate: '2023-10-01',
      nextReviewDate: '2024-10-01',
      comments: 'GDPR compliance review and updates'
    },
    {
      id: '3',
      policyId: 'POL-003',
      policyTitle: 'Code of Conduct',
      reviewType: 'Ad-hoc',
      status: 'Completed',
      assignedTo: 'Mike Davis',
      dueDate: '2024-02-15',
      priority: 'Medium',
      lastReviewDate: '2024-02-15',
      nextReviewDate: '2024-08-15',
      comments: 'Updated to reflect new remote work policies'
    },
    {
      id: '4',
      policyId: 'POL-004',
      policyTitle: 'Risk Management Policy',
      reviewType: 'Emergency',
      status: 'Overdue',
      assignedTo: 'Lisa Wilson',
      dueDate: '2024-01-30',
      priority: 'Critical',
      lastReviewDate: '2023-07-30',
      nextReviewDate: '2024-07-30',
      comments: 'Urgent review required due to regulatory changes'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
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

  const getReviewTypeColor = (type: string) => {
    switch (type) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800'
      case 'Ad-hoc': return 'bg-purple-100 text-purple-800'
      case 'Emergency': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Policy Reviews</h1>
            <p className="text-gray-600 mt-1">Manage and track policy review processes</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Schedule Review
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{reviews.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{reviews.filter(r => r.status === 'In Progress').length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{reviews.filter(r => r.status === 'Pending').length}</p>
            </div>
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{reviews.filter(r => r.status === 'Overdue').length}</p>
            </div>
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Reviews</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr key={review.id} className={`hover:bg-gray-50 ${isOverdue(review.dueDate) && review.status !== 'Completed' ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{review.policyTitle}</div>
                      <div className="text-sm text-gray-500">{review.policyId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getReviewTypeColor(review.reviewType)}`}>
                      {review.reviewType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(review.priority)}`}>
                      {review.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(review.dueDate).toLocaleDateString()}
                      {isOverdue(review.dueDate) && review.status !== 'Completed' && (
                        <span className="ml-2 text-xs text-red-600 font-medium">OVERDUE</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-purple-600 hover:text-purple-900">Complete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Timeline */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Timeline</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                review.status === 'Completed' ? 'bg-green-500' :
                review.status === 'In Progress' ? 'bg-blue-500' :
                review.status === 'Overdue' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{review.policyTitle}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{review.comments}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span>Assigned to: {review.assignedTo}</span>
                  <span>Due: {new Date(review.dueDate).toLocaleDateString()}</span>
                  <span>Priority: {review.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
