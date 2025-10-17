'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableViewModal, useTableViewModal } from '@/components/ui'

interface Regulation {
  id: string
  title: string
  description: string
  category: string
  effectiveDate: string
  sourceAuthority: string
  complianceRequirements: string[]
  status: 'Active' | 'Upcoming' | 'Repealed' | 'Draft' | 'Archived'
  evidenceField: string
  version: string
  jurisdiction: string
  lastUpdated: string
  relatedObligations: string[]
  relatedControls: string[]
  penalties: string
  reviewDate: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export default function RegulationsPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([])
  const [filterStatus, setFilterStatus] = useState('All Statuses')
  const { isOpen, selectedItem, config, openModal, closeModal } = useTableViewModal()

  // Mock data for regulations
  const mockRegulations: Regulation[] = [
    {
      id: '1',
      title: 'GDPR',
      description: 'General Data Protection Regulation for EU citizens.',
      category: 'Data Privacy',
      effectiveDate: '2018-05-25',
      sourceAuthority: 'European Union',
      complianceRequirements: [
        'Article 32 - Security of Processing',
        'Article 33 - Breach Notification',
        'Article 25 - Data Protection by Design',
        'Article 35 - Data Protection Impact Assessment'
      ],
      status: 'Active',
      evidenceField: 'Data Protection Impact Assessments, Breach notification logs, Privacy by design documentation',
      version: '1.1',
      jurisdiction: 'European Union',
      lastUpdated: '2024-01-15',
      relatedObligations: ['Data Breach Notification', 'Privacy Impact Assessment'],
      relatedControls: ['Data Encryption Policy', 'Access Control Policy'],
      penalties: 'Up to €20M or 4% of annual global turnover',
      reviewDate: '2024-12-31',
      tags: ['privacy', 'data protection', 'EU', 'critical'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act for US healthcare organizations.',
      category: 'Healthcare',
      effectiveDate: '1996-08-21',
      sourceAuthority: 'US Department of Health and Human Services',
      complianceRequirements: [
        'Administrative Safeguards',
        'Physical Safeguards',
        'Technical Safeguards',
        'Breach Notification Rule'
      ],
      status: 'Active',
      evidenceField: 'Risk assessments, Access controls documentation, Breach response procedures',
      version: '1.3',
      jurisdiction: 'United States',
      lastUpdated: '2024-02-01',
      relatedObligations: ['Healthcare Data Protection', 'Breach Notification'],
      relatedControls: ['Healthcare Data Encryption', 'Access Logging'],
      penalties: 'Up to $1.5M per violation per year',
      reviewDate: '2024-06-30',
      tags: ['healthcare', 'privacy', 'US', 'health data'],
      createdAt: '2024-01-01',
      updatedAt: '2024-02-01'
    },
    {
      id: '3',
      title: 'ISO 27001',
      description: 'International Standard for Information Security Management Systems.',
      category: 'Information Security',
      effectiveDate: '2022-10-25',
      sourceAuthority: 'International Organization for Standardization',
      complianceRequirements: [
        'Information Security Policies',
        'Risk Assessment and Treatment',
        'Access Control Management',
        'Incident Management'
      ],
      status: 'Draft',
      evidenceField: 'ISMS documentation, Risk assessments, Audit reports, Training records',
      version: '2022',
      jurisdiction: 'International',
      lastUpdated: '2024-01-20',
      relatedObligations: ['Information Security Management', 'Risk Assessment'],
      relatedControls: ['Security Policy Framework', 'Risk Management Process'],
      penalties: 'Certification revocation, Loss of competitive advantage',
      reviewDate: '2024-10-25',
      tags: ['security', 'ISO', 'international', 'certification'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20'
    },
    {
      id: '4',
      title: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard.',
      category: 'Financial',
      effectiveDate: '2022-03-31',
      sourceAuthority: 'PCI Security Standards Council',
      complianceRequirements: [
        'Build and Maintain Secure Networks',
        'Protect Cardholder Data',
        'Maintain Vulnerability Management',
        'Implement Strong Access Control'
      ],
      status: 'Active',
      evidenceField: 'Network security scans, Access control logs, Vulnerability assessments',
      version: '4.0',
      jurisdiction: 'Global',
      lastUpdated: '2024-01-10',
      relatedObligations: ['Payment Card Security', 'Data Protection'],
      relatedControls: ['Network Security', 'Data Encryption', 'Access Controls'],
      penalties: 'Fines up to $500,000, Loss of card processing privileges',
      reviewDate: '2024-03-31',
      tags: ['payment', 'security', 'financial', 'card data'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    {
      id: '5',
      title: 'CCPA',
      description: 'California Consumer Privacy Act.',
      category: 'Data Privacy',
      effectiveDate: '2020-01-01',
      sourceAuthority: 'California Attorney General',
      complianceRequirements: [
        'Consumer Rights Disclosure',
        'Data Collection Transparency',
        'Opt-out Mechanisms',
        'Data Deletion Rights'
      ],
      status: 'Archived',
      evidenceField: 'Privacy notices, Consumer request logs, Data inventory',
      version: '2.0',
      jurisdiction: 'California, USA',
      lastUpdated: '2023-12-01',
      relatedObligations: ['Consumer Privacy Rights', 'Data Transparency'],
      relatedControls: ['Privacy Notice Management', 'Data Subject Rights'],
      penalties: 'Up to $7,500 per intentional violation',
      reviewDate: '2024-01-01',
      tags: ['privacy', 'California', 'consumer rights', 'archived'],
      createdAt: '2024-01-01',
      updatedAt: '2023-12-01'
    },
    {
      id: '6',
      title: 'SOX',
      description: 'Sarbanes-Oxley Act for public company financial reporting.',
      category: 'Financial',
      effectiveDate: '2002-07-30',
      sourceAuthority: 'US Securities and Exchange Commission',
      complianceRequirements: [
        'Internal Controls over Financial Reporting',
        'Management Assessment',
        'Auditor Attestation',
        'Disclosure Controls'
      ],
      status: 'Active',
      evidenceField: 'Internal control documentation, Audit reports, Management certifications',
      version: '2002',
      jurisdiction: 'United States',
      lastUpdated: '2024-01-05',
      relatedObligations: ['Financial Reporting Controls', 'Internal Audit'],
      relatedControls: ['Financial Controls', 'Change Management', 'Access Controls'],
      penalties: 'Up to $5M and 20 years imprisonment for executives',
      reviewDate: '2024-12-31',
      tags: ['financial', 'reporting', 'US', 'public companies'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-05'
    },
    {
      id: '7',
      title: 'Internal Data Policy',
      description: 'Company-specific data handling and protection requirements.',
      category: 'Internal Policy',
      effectiveDate: '2024-01-01',
      sourceAuthority: 'Company Board of Directors',
      complianceRequirements: [
        'Data Classification Standards',
        'Data Retention Policies',
        'Employee Training Requirements',
        'Incident Response Procedures'
      ],
      status: 'Draft',
      evidenceField: 'Policy acknowledgments, Training completion records, Incident reports',
      version: '0.9',
      jurisdiction: 'Company-wide',
      lastUpdated: '2024-01-25',
      relatedObligations: ['Data Classification', 'Employee Training'],
      relatedControls: ['Data Classification System', 'Security Awareness Training'],
      penalties: 'Disciplinary action, Employment termination',
      reviewDate: '2024-06-30',
      tags: ['internal', 'policy', 'data handling', 'draft'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-25'
    }
  ]

  useEffect(() => {
    // Load captured regulations from localStorage
    const stored = localStorage.getItem('capturedRegulations')
    const capturedRegulations = stored ? JSON.parse(stored) : []
    setRegulations([...capturedRegulations, ...mockRegulations])
  }, [])

  const handleViewRegulation = (regulation: Regulation) => {
    openModal(regulation, 'regulation')
  }

  const filteredRegulations = regulations.filter(regulation => {
    const statusMatch = filterStatus === 'All Statuses' || regulation.status === filterStatus
    return statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Upcoming': return 'bg-blue-100 text-blue-800'
      case 'Repealed': return 'bg-red-100 text-red-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
        <p className="text-gray-600">Regulations & Standards</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Regulations & Standards Library</h2>
              <p className="text-sm text-gray-600">Manage and review all compliance regulations and standards</p>
            </div>
            <Link
              href="/compliance/add-regulation"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New
            </Link>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Repealed">Repealed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Name
                    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Description
                    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Version
                    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Status
                    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegulations.map((regulation) => (
                <tr key={regulation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{regulation.title}</div>
                    <div className="text-sm text-gray-500">{regulation.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{regulation.description}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Authority: {regulation.sourceAuthority}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{regulation.version}</div>
                    <div className="text-sm text-gray-500">Effective: {regulation.effectiveDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(regulation.status)}`}>
                      {regulation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewRegulation(regulation)}
                        className="text-blue-600 hover:text-blue-900"
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
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
