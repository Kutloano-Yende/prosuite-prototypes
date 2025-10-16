'use client'

import React from 'react'
import Modal from './Modal'
import { Policy } from '@/types'

interface PolicyViewModalProps {
  isOpen: boolean
  onClose: () => void
  policy: Policy | null
}

const PolicyViewModal: React.FC<PolicyViewModalProps> = ({
  isOpen,
  onClose,
  policy
}) => {
  if (!policy) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Policy: ${policy.policyNumber}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{policy.title}</h3>
              <p className="text-gray-600">{policy.description}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(policy.status)}`}>
              {policy.status}
            </span>
          </div>
        </div>

        {/* Policy Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Policy Number</label>
                <p className="text-gray-900">{policy.policyNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Version</label>
                <p className="text-gray-900">{policy.version}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {policy.category}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-gray-900">{policy.department}</p>
              </div>
            </div>
          </div>

          {/* Responsibility & Timeline */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Responsibility & Timeline
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Owner</label>
                <p className="text-gray-900">{policy.owner}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Approver</label>
                <p className="text-gray-900">{policy.approver}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Effective Date</label>
                <p className="text-gray-900">{new Date(policy.effectiveDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Review Date</label>
                <p className="text-gray-900">{new Date(policy.reviewDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Next Review Date</label>
                <p className="text-gray-900">{new Date(policy.nextReviewDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Frameworks */}
        {policy.frameworks && policy.frameworks.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Applicable Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {policy.frameworks.map((framework, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full"
                >
                  {framework}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {policy.attachments && policy.attachments.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Attachments
            </h4>
            <div className="space-y-2">
              {policy.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-sm text-gray-900">{attachment}</span>
                  <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Policy
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PolicyViewModal
