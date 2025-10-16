'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableViewModal, useTableViewModal } from '@/components/ui'

interface Obligation {
  id: string
  obligationCode: string
  title: string
  regulation: string
  category: string
  jurisdiction: string
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually' | 'One-time'
  status: 'Compliant' | 'Non-Compliant' | 'Partially Compliant' | 'Under Review'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  owner: string
  department: string
  responsibleParty: string
  dueDate: string
  nextAssessmentDate: string
  description: string
  evidenceRequired: string[]
  consequencesOfNonCompliance: string
}

export default function ObligationsPage() {
  const [obligations, setObligations] = useState<Obligation[]>([])
  const [filteredObligations, setFilteredObligations] = useState<Obligation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [regulationFilter, setRegulationFilter] = useState('all')
  const { isOpen, selectedItem, config, openModal, closeModal } = useTableViewModal()

  // Mock data
  const mockObligations: Obligation[] = [
    {
      id: '1',
      obligationCode: 'OBL-001',
      title: 'Data Breach Notification',
      regulation: 'GDPR',
      category: 'Data Protection',
      jurisdiction: 'EU',
      frequency: 'One-time',
      status: 'Compliant',
      priority: 'Critical',
      owner: 'Sarah Johnson',
      department: 'Legal',
      responsibleParty: 'Data Protection Officer',
      dueDate: '2024-03-15',
      nextAssessmentDate: '2024-06-15',
      description: 'Notify relevant authorities within 72 hours of data breach',
      evidenceRequired: ['Breach notification form', 'Impact assessment', 'Remediation plan'],
      consequencesOfNonCompliance: 'Fines up to 4% of annual turnover or €20M'
    },
    {
      id: '2',
      obligationCode: 'OBL-002',
      title: 'Financial Reporting',
      regulation: 'SOX',
      category: 'Financial Controls',
      jurisdiction: 'US',
      frequency: 'Quarterly',
      status: 'Under Review',
      priority: 'High',
      owner: 'Mike Davis',
      department: 'Finance',
      responsibleParty: 'CFO',
      dueDate: '2024-04-30',
      nextAssessmentDate: '2024-07-30',
      description: 'Quarterly financial statements and internal controls assessment',
      evidenceRequired: ['Financial statements', 'Control testing results', 'Management certification'],
      consequencesOfNonCompliance: 'Criminal penalties and delisting from stock exchange'
    },
    {
      id: '3',
      obligationCode: 'OBL-003',
      title: 'Information Security Assessment',
      regulation: 'ISO 27001',
      category: 'Information Security',
      jurisdiction: 'Global',
      frequency: 'Annually',
      status: 'Partially Compliant',
      priority: 'Medium',
      owner: 'John Smith',
      department: 'IT',
      responsibleParty: 'CISO',
      dueDate: '2024-05-15',
      nextAssessmentDate: '2024-08-15',
      description: 'Annual information security management system review',
      evidenceRequired: ['Risk assessment', 'Control implementation', 'Audit results'],
      consequencesOfNonCompliance: 'Loss of certification and competitive disadvantage'
    }
  ]

  useEffect(() => {
    // Load captured obligations from localStorage
    const stored = localStorage.getItem('capturedObligations')
    const capturedObligations = stored ? JSON.parse(stored) : []
    
    // Combine with mock data
    setObligations([...capturedObligations, ...mockObligations])
  }, [])

  useEffect(() => {
    let filtered = obligations

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(obligation =>
        obligation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obligation.obligationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obligation.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(obligation => obligation.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(obligation => obligation.priority === priorityFilter)
    }

    // Regulation filter
    if (regulationFilter !== 'all') {
      filtered = filtered.filter(obligation => obligation.regulation === regulationFilter)
    }

    setFilteredObligations(filtered)
  }, [obligations, searchTerm, statusFilter, priorityFilter, regulationFilter])

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

  const regulations = [...new Set(obligations.map(o => o.regulation))]
  const statuses = ['Compliant', 'Non-Compliant', 'Partially Compliant', 'Under Review']
  const priorities = ['Critical', 'High', 'Medium', 'Low']

  const handleViewObligation = (obligation: Obligation) => {
    openModal(obligation, 'obligation')
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Obligations</h1>
            <p className="text-gray-600 mt-1">Manage and track regulatory compliance obligations</p>
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search obligations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
            <select
              value={regulationFilter}
              onChange={(e) => setRegulationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Regulations</option>
              {regulations.map(regulation => (
                <option key={regulation} value={regulation}>{regulation}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setPriorityFilter('all')
                setRegulationFilter('all')
              }}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Obligations</p>
              <p className="text-3xl font-bold text-gray-900">{obligations.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Compliant</p>
              <p className="text-3xl font-bold text-green-600">{obligations.filter(o => o.status === 'Compliant').length}</p>
            </div>
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Non-Compliant</p>
              <p className="text-3xl font-bold text-red-600">{obligations.filter(o => o.status === 'Non-Compliant').length}</p>
            </div>
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Critical</p>
              <p className="text-3xl font-bold text-red-600">{obligations.filter(o => o.priority === 'Critical').length}</p>
            </div>
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Obligations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Obligations ({filteredObligations.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obligation ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Regulation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredObligations.map((obligation) => (
                <tr key={obligation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {obligation.obligationCode}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{obligation.title}</div>
                      <div className="text-sm text-gray-500">{obligation.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {obligation.regulation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(obligation.status)}`}>
                      {obligation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(obligation.priority)}`}>
                      {obligation.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obligation.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(obligation.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewObligation(obligation)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-purple-600 hover:text-purple-900">Assess</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredObligations.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No obligations found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Obligation View Modal */}
      <TableViewModal
        isOpen={isOpen}
        onClose={closeModal}
        data={selectedItem}
        config={config}
      />
    </div>
  )
}
