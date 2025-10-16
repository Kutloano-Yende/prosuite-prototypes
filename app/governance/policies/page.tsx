'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableViewModal, useTableViewModal } from '@/components/ui'

interface Policy {
  id: string
  policyNumber: string
  title: string
  category: string
  status: 'Draft' | 'Active' | 'Under Review' | 'Expired'
  version: string
  owner: string
  department: string
  effectiveDate: string
  nextReviewDate: string
  description: string
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { isOpen, selectedItem, config, openModal, closeModal } = useTableViewModal()

  // Mock data
  const mockPolicies: Policy[] = [
    {
      id: '1',
      policyNumber: 'POL-001',
      title: 'Information Security Policy',
      category: 'Security',
      status: 'Active',
      version: '2.1',
      owner: 'John Smith',
      department: 'IT',
      effectiveDate: '2024-01-15',
      nextReviewDate: '2024-07-15',
      description: 'Comprehensive information security guidelines and procedures'
    },
    {
      id: '2',
      policyNumber: 'POL-002',
      title: 'Data Protection Policy',
      category: 'Privacy',
      status: 'Under Review',
      version: '1.3',
      owner: 'Sarah Johnson',
      department: 'Legal',
      effectiveDate: '2023-11-01',
      nextReviewDate: '2024-05-01',
      description: 'GDPR compliance and data protection measures'
    },
    {
      id: '3',
      policyNumber: 'POL-003',
      title: 'Code of Conduct',
      category: 'Ethics',
      status: 'Active',
      version: '3.0',
      owner: 'Mike Davis',
      department: 'HR',
      effectiveDate: '2024-02-01',
      nextReviewDate: '2024-08-01',
      description: 'Employee behavior and ethical standards'
    },
    {
      id: '4',
      policyNumber: 'POL-004',
      title: 'Risk Management Policy',
      category: 'Risk',
      status: 'Draft',
      version: '1.0',
      owner: 'Lisa Wilson',
      department: 'Risk Management',
      effectiveDate: '2024-04-01',
      nextReviewDate: '2024-10-01',
      description: 'Enterprise risk management framework and procedures'
    }
  ]

  useEffect(() => {
    // Load captured policies from localStorage
    const stored = localStorage.getItem('capturedPolicies')
    const capturedPolicies = stored ? JSON.parse(stored) : []
    
    // Combine with mock data
    setPolicies([...capturedPolicies, ...mockPolicies])
  }, [])

  useEffect(() => {
    let filtered = policies

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(policy =>
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(policy => policy.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(policy => policy.category === categoryFilter)
    }

    setFilteredPolicies(filtered)
  }, [policies, searchTerm, statusFilter, categoryFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const categories = [...new Set(policies.map(p => p.category))]
  const statuses = ['Active', 'Under Review', 'Draft', 'Expired']

  const handleViewPolicy = (policy: Policy) => {
    openModal(policy, 'policy')
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Policies Management</h1>
            <p className="text-gray-600 mt-1">Manage and track all organizational policies</p>
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setCategoryFilter('all')
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
              <p className="text-sm text-gray-500 uppercase">Total Policies</p>
              <p className="text-3xl font-bold text-gray-900">{policies.length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Active</p>
              <p className="text-3xl font-bold text-green-600">{policies.filter(p => p.status === 'Active').length}</p>
            </div>
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Under Review</p>
              <p className="text-3xl font-bold text-blue-600">{policies.filter(p => p.status === 'Under Review').length}</p>
            </div>
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase">Due for Review</p>
              <p className="text-3xl font-bold text-orange-600">{policies.filter(p => new Date(p.nextReviewDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}</p>
            </div>
            <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Policies Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Policies ({filteredPolicies.length})</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {policy.policyNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{policy.title}</div>
                      <div className="text-sm text-gray-500">{policy.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {policy.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(policy.nextReviewDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewPolicy(policy)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No policies found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Policy View Modal */}
      <TableViewModal
        isOpen={isOpen}
        onClose={closeModal}
        data={selectedItem}
        config={config}
      />
    </div>
  )
}
