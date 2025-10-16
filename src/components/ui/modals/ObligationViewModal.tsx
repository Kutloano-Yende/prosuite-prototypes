'use client'

import React from 'react'
import Modal from './Modal'
import { ComplianceObligation } from '@/types'

interface ObligationViewModalProps {
  isOpen: boolean
  onClose: () => void
  obligation: ComplianceObligation | null
}

const ObligationViewModal: React.FC<ObligationViewModalProps> = ({
  isOpen,
  onClose,
  obligation
}) => {
  if (!obligation) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800'
      case 'Non-Compliant': return 'bg-red-100 text-red-800'
      case 'Partially Compliant': return 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compliance Obligation"
      size="xl"
    >
      <div className="flex h-[70vh]">
        {/* Main Content Area */}
        <div className="flex-1 pr-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{obligation.title}</h2>
                <p className="text-gray-600">{obligation.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                  Compliance Obligation
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance Requirements</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {obligation.description}
              </p>
            </div>
          </div>

          {/* Evidence Required */}
          {obligation.evidenceRequired && obligation.evidenceRequired.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Evidence Required</h3>
              <div className="space-y-2">
                {obligation.evidenceRequired.map((evidence, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-900">{evidence}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consequences */}
          {obligation.consequencesOfNonCompliance && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Consequences of Non-Compliance</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{obligation.consequencesOfNonCompliance}</p>
              </div>
            </div>
          )}

          {/* Attachments */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Attachments (0)</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <p className="text-gray-600 mb-2">Upload files</p>
              <p className="text-sm text-gray-500">Drag & drop or click to browse</p>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT<br />
                Max 10 files • Up to 100 MB
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 pl-6">
          {/* Obligation Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Obligation Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">OBLIGATION ID</label>
                <div className="mt-1 p-2 bg-gray-50 rounded border text-sm text-gray-900">
                  {obligation.obligationCode}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">CREATED BY</label>
                <div className="mt-1 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm text-gray-900">{obligation.owner}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">DUE DATE</label>
                <div className="mt-1 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-900">{new Date(obligation.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">NEXT ASSESSMENT</label>
                <div className="mt-1 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-sm text-gray-900">{new Date(obligation.nextAssessmentDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Priority */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Priority</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">STATUS</label>
                <div className="mt-1">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(obligation.status)}`}>
                    {obligation.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">PRIORITY</label>
                <div className="mt-1">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(obligation.priority)}`}>
                    {obligation.priority}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">REGULATION</label>
                <div className="mt-1">
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    {obligation.regulation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                {obligation.category}
              </span>
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                {obligation.jurisdiction}
              </span>
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                {obligation.frequency}
              </span>
            </div>
          </div>

          {/* Related Obligations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Related Obligations
            </h3>
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">No related obligations</p>
              <p className="text-gray-400 text-xs mt-1">Check back later for updates</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ObligationViewModal
