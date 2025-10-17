'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableViewModal, useTableViewModal } from '@/components/ui'

interface Control {
  id: string
  name: string
  description: string
  relatedRegulations: string[]
  implementationStatus: 'Planned' | 'Implemented' | 'Not Implemented' | 'In Progress' | 'Requires Review'
  riskLevel: 'High' | 'Medium' | 'Low'
  owner: string
  lastReviewDate: string
  controlType: 'Preventive' | 'Detective' | 'Corrective'
  priority: 'High' | 'Medium' | 'Low'
  family: string
  consequencesOfFailure?: {
    financial: string
    operational: string
    reputational: string
    legal: string
  }
  nextReviewDate?: string
  effectivenessRating?: 'Effective' | 'Partially Effective' | 'Ineffective'
  automationLevel?: 'Manual' | 'Semi-Automated' | 'Automated'
  frequency?: string
  evidence?: string[]
  createdAt: string
  updatedAt: string
}

export default function ControlsPage() {
  const [controls, setControls] = useState<Control[]>([])
  const [filterStatus, setFilterStatus] = useState('All Statuses')
  const [filterPriority, setFilterPriority] = useState('All Priorities')
  const { isOpen, selectedItem, config, openModal, closeModal } = useTableViewModal()

  // Mock data for controls
  const mockControls: Control[] = [
    {
      id: '1',
      name: 'Quarterly Access Review',
      description: 'Perform quarterly reviews of user access to critical systems and applications to ensure appropriate access levels.',
      relatedRegulations: ['SOX', 'ISO 27001', 'GDPR'],
      implementationStatus: 'Implemented',
      riskLevel: 'High',
      owner: 'IT Security Team',
      lastReviewDate: '2024-01-15',
      controlType: 'Detective',
      priority: 'High',
      family: 'Access Control',
      consequencesOfFailure: {
        financial: 'Potential fines up to $5M for SOX violations',
        operational: 'Unauthorized access to critical systems',
        reputational: 'Loss of customer trust and regulatory scrutiny',
        legal: 'SOX compliance violations and audit findings'
      },
      nextReviewDate: '2024-04-15',
      effectivenessRating: 'Effective',
      automationLevel: 'Semi-Automated',
      frequency: 'Quarterly',
      evidence: ['Access review reports', 'User access matrices'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Data Encryption Policy',
      description: 'Ensure all sensitive data at rest and in transit is encrypted using approved encryption standards.',
      relatedRegulations: ['GDPR', 'HIPAA', 'PCI DSS'],
      implementationStatus: 'Implemented',
      riskLevel: 'High',
      owner: 'Data Protection Officer',
      lastReviewDate: '2024-02-01',
      controlType: 'Preventive',
      priority: 'High',
      family: 'Data Security',
      consequencesOfFailure: {
        financial: 'GDPR fines up to €20M or 4% of annual turnover',
        operational: 'Data breach and exposure of sensitive information',
        reputational: 'Major data breach headlines and customer loss',
        legal: 'GDPR violations and potential lawsuits'
      },
      nextReviewDate: '2024-05-01',
      effectivenessRating: 'Effective',
      automationLevel: 'Automated',
      frequency: 'Continuous',
      evidence: ['Encryption certificates', 'Data flow diagrams'],
      createdAt: '2024-01-01',
      updatedAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Security Awareness Training',
      description: 'Annual security awareness training for all employees covering phishing, social engineering, and data protection.',
      relatedRegulations: ['GDPR', 'ISO 27001'],
      implementationStatus: 'In Progress',
      riskLevel: 'Medium',
      owner: 'HR Department',
      lastReviewDate: '2023-12-01',
      controlType: 'Preventive',
      priority: 'Medium',
      family: 'Training & Awareness',
      consequencesOfFailure: {
        financial: 'Increased risk of successful phishing attacks',
        operational: 'Higher likelihood of security incidents',
        reputational: 'Employee-related security breaches',
        legal: 'Failure to meet training requirements'
      },
      nextReviewDate: '2024-12-01',
      effectivenessRating: 'Partially Effective',
      automationLevel: 'Semi-Automated',
      frequency: 'Annually',
      evidence: ['Training completion records', 'Assessment scores'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '4',
      name: 'Incident Response Plan Test',
      description: 'Quarterly testing of the incident response plan through tabletop exercises and simulated scenarios.',
      relatedRegulations: ['ISO 27001', 'NIST'],
      implementationStatus: 'Planned',
      riskLevel: 'High',
      owner: 'Security Operations Team',
      lastReviewDate: '2023-10-01',
      controlType: 'Detective',
      priority: 'High',
      family: 'Incident Response',
      consequencesOfFailure: {
        financial: 'Delayed response leading to extended downtime costs',
        operational: 'Ineffective incident response and recovery',
        reputational: 'Poor crisis management and communication',
        legal: 'Failure to meet incident reporting requirements'
      },
      nextReviewDate: '2024-03-01',
      effectivenessRating: 'Ineffective',
      automationLevel: 'Manual',
      frequency: 'Quarterly',
      evidence: ['Test results', 'Lessons learned reports'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '5',
      name: 'Vulnerability Scanning',
      description: 'Automated vulnerability scanning of all systems and applications on a monthly basis.',
      relatedRegulations: ['ISO 27001', 'PCI DSS'],
      implementationStatus: 'Implemented',
      riskLevel: 'Medium',
      owner: 'IT Security Team',
      lastReviewDate: '2024-02-15',
      controlType: 'Detective',
      priority: 'Medium',
      family: 'Vulnerability Management',
      consequencesOfFailure: {
        financial: 'Undetected vulnerabilities leading to breaches',
        operational: 'System compromises and data loss',
        reputational: 'Security incidents and customer impact',
        legal: 'Failure to maintain security standards'
      },
      nextReviewDate: '2024-03-15',
      effectivenessRating: 'Effective',
      automationLevel: 'Automated',
      frequency: 'Monthly',
      evidence: ['Scan reports', 'Remediation tracking'],
      createdAt: '2024-01-01',
      updatedAt: '2024-02-15'
    },
    {
      id: '6',
      name: 'Change Management Process',
      description: 'Formal process for managing changes to production systems with approval workflows and testing.',
      relatedRegulations: ['SOX', 'ISO 27001'],
      implementationStatus: 'Requires Review',
      riskLevel: 'Medium',
      owner: 'IT Operations',
      lastReviewDate: '2023-11-01',
      controlType: 'Preventive',
      priority: 'Medium',
      family: 'Change Management',
      consequencesOfFailure: {
        financial: 'System failures and business disruption',
        operational: 'Unauthorized changes and system instability',
        reputational: 'Service outages and customer complaints',
        legal: 'SOX compliance violations'
      },
      nextReviewDate: '2024-02-01',
      effectivenessRating: 'Partially Effective',
      automationLevel: 'Semi-Automated',
      frequency: 'As needed',
      evidence: ['Change logs', 'Approval records'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '7',
      name: 'Password Complexity Policy',
      description: 'Enforce strong password requirements including length, complexity, and regular rotation.',
      relatedRegulations: ['ISO 27001', 'NIST'],
      implementationStatus: 'Implemented',
      riskLevel: 'Low',
      owner: 'IT Security Team',
      lastReviewDate: '2024-01-01',
      controlType: 'Preventive',
      priority: 'Low',
      family: 'Access Control',
      consequencesOfFailure: {
        financial: 'Increased risk of account compromise',
        operational: 'Unauthorized access through weak passwords',
        reputational: 'Security incidents from compromised accounts',
        legal: 'Failure to meet security standards'
      },
      nextReviewDate: '2024-07-01',
      effectivenessRating: 'Effective',
      automationLevel: 'Automated',
      frequency: 'Continuous',
      evidence: ['Policy documentation', 'Enforcement logs'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]

  useEffect(() => {
    // Load captured controls from localStorage
    const stored = localStorage.getItem('capturedControls')
    const capturedControls = stored ? JSON.parse(stored) : []
    setControls([...capturedControls, ...mockControls])
  }, [])

  const handleViewControl = (control: Control) => {
    openModal(control, 'control')
  }

  const filteredControls = controls.filter(control => {
    const statusMatch = filterStatus === 'All Statuses' || control.implementationStatus === filterStatus
    const priorityMatch = filterPriority === 'All Priorities' || control.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Planned': return 'bg-yellow-100 text-yellow-800'
      case 'Requires Review': return 'bg-purple-100 text-purple-800'
      case 'Not Implemented': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-orange-100 text-orange-800'
      case 'Low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
        <p className="text-gray-600">Controls Management</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Controls Library</h2>
              <p className="text-sm text-gray-600">Manage and monitor all compliance controls</p>
            </div>
            <Link
              href="/compliance/add-control"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Control
            </Link>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Implemented">Implemented</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
                <option value="Requires Review">Requires Review</option>
                <option value="Not Implemented">Not Implemented</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Priority:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="All Priorities">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredControls.map((control) => (
                <tr key={control.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{control.name}</div>
                    <div className="text-sm text-gray-500">{control.controlType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{control.description}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Regulations: {control.relatedRegulations.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{control.family}</div>
                    <div className="text-sm text-gray-500">Owner: {control.owner}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(control.implementationStatus)}`}>
                      {control.implementationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(control.priority)}`}>
                      {control.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewControl(control)}
                        className="text-purple-600 hover:text-purple-900"
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TableViewModal
        isOpen={isOpen}
        onClose={closeModal}
        data={selectedItem}
        config={config}
      />
    </div>
  )
}
