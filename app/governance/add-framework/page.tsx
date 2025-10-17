'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddFramework() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    frameworkCode: '',
    frameworkName: '',
    fullName: '',
    version: '',
    status: 'Active',
    category: 'Information Security',
    description: '',
    scope: '',
    purpose: '',
    issuingOrganization: '',
    industryFocus: [] as string[],
    implementationDate: '',
    certificationRequired: false,
    certificationBody: '',
    certificationDate: '',
    nextCertificationDate: '',
    reviewFrequency: 'Annually',
    nextReviewDate: '',
    lastReviewDate: '',
    frameworkOwner: '',
    department: '',
    relatedPolicies: '',
    relatedControls: '',
    applicableRegulations: '',
    keyRequirements: '',
    complianceLevel: 'In Progress',
    numberOfControls: '',
    maturityLevel: 'Defined',
    officialWebsite: '',
    internalDocumentation: '',
    trainingRequired: false,
    trainingMaterials: '',
    riskLevel: 'Medium',
    businessImpact: [] as string[],
    priority: 'High',
    implementationNotes: '',
    exceptions: '',
    tags: [] as string[],
  })

  const industries = ['Finance', 'Healthcare', 'Technology', 'Government', 'Manufacturing', 'Retail', 'All Industries']
  const impacts = ['Financial', 'Operational', 'Reputational', 'Legal', 'Strategic']
  const commonTags = ['Security', 'Compliance', 'Risk Management', 'Data Protection', 'Financial', 'Operational']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newFramework = {
      id: Date.now(),
      frameworkCode: formData.frameworkCode,
      frameworkName: formData.frameworkName,
      fullName: formData.fullName,
      version: formData.version,
      status: formData.status,
      category: formData.category,
      description: formData.description,
      scope: formData.scope,
      purpose: formData.purpose,
      issuingOrganization: formData.issuingOrganization,
      industryFocus: formData.industryFocus,
      implementationDate: formData.implementationDate,
      certificationRequired: formData.certificationRequired,
      certificationBody: formData.certificationBody,
      certificationDate: formData.certificationDate,
      nextCertificationDate: formData.nextCertificationDate,
      reviewFrequency: formData.reviewFrequency,
      nextReviewDate: formData.nextReviewDate,
      lastReviewDate: formData.lastReviewDate,
      frameworkOwner: formData.frameworkOwner,
      department: formData.department,
      relatedPolicies: formData.relatedPolicies ? formData.relatedPolicies.split(',').map(s => s.trim()) : [],
      relatedControls: formData.relatedControls ? formData.relatedControls.split(',').map(s => s.trim()) : [],
      applicableRegulations: formData.applicableRegulations ? formData.applicableRegulations.split(',').map(s => s.trim()) : [],
      keyRequirements: formData.keyRequirements ? formData.keyRequirements.split(',').map(s => s.trim()) : [],
      complianceLevel: formData.complianceLevel,
      numberOfControls: formData.numberOfControls ? parseInt(formData.numberOfControls) : 0,
      maturityLevel: formData.maturityLevel,
      officialWebsite: formData.officialWebsite,
      internalDocumentation: formData.internalDocumentation,
      trainingRequired: formData.trainingRequired,
      trainingMaterials: formData.trainingMaterials,
      riskLevel: formData.riskLevel,
      businessImpact: formData.businessImpact,
      priority: formData.priority,
      implementationNotes: formData.implementationNotes,
      exceptions: formData.exceptions,
      tags: formData.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const existingFrameworks = JSON.parse(localStorage.getItem('capturedFrameworks') || '[]')
    existingFrameworks.push(newFramework)
    localStorage.setItem('capturedFrameworks', JSON.stringify(existingFrameworks))
    
    alert(`✅ Framework Created Successfully!\n\n${formData.frameworkName} (${formData.version})\nStatus: ${formData.status}\nOwner: ${formData.frameworkOwner}`)
    router.push('/governance/frameworks')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleMultiSelect = (item: string, field: 'industryFocus' | 'businessImpact' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/governance/frameworks" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Frameworks
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Add New Framework</h1>
          <p className="text-gray-600 mt-2">Register a new governance or compliance framework</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Framework Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="frameworkCode"
                  required
                  value={formData.frameworkCode}
                  onChange={handleChange}
                  placeholder="e.g., FW-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Framework Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="frameworkName"
                  required
                  value={formData.frameworkName}
                  onChange={handleChange}
                  placeholder="e.g., ISO 27001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Information Security Management System"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="version"
                  required
                  value={formData.version}
                  onChange={handleChange}
                  placeholder="e.g., 2013, 2022"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Deprecated">Deprecated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Information Security">Information Security</option>
                  <option value="Risk Management">Risk Management</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Quality Management">Quality Management</option>
                  <option value="Financial Controls">Financial Controls</option>
                  <option value="Governance">Governance</option>
                  <option value="Data Privacy">Data Privacy</option>
                  <option value="Operational">Operational</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuing Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="issuingOrganization"
                  required
                  value={formData.issuingOrganization}
                  onChange={handleChange}
                  placeholder="e.g., ISO, NIST, COBIT"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Framework Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Framework Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter a comprehensive description of the framework..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="scope"
                  required
                  value={formData.scope}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Define which areas, departments, or processes this framework applies to..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose/Objectives <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Explain why this framework is being used and what it aims to achieve..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Industry Focus */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Industry Focus
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.industryFocus.includes(industry)}
                    onChange={() => handleMultiSelect(industry, 'industryFocus')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{industry}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Implementation */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Implementation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Implementation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="implementationDate"
                  required
                  value={formData.implementationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="certificationRequired"
                    checked={formData.certificationRequired}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Certification Required</span>
                </label>
              </div>

              {formData.certificationRequired && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification Body
                    </label>
                    <input
                      type="text"
                      name="certificationBody"
                      value={formData.certificationBody}
                      onChange={handleChange}
                      placeholder="e.g., BSI, ANSI"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification Date
                    </label>
                    <input
                      type="date"
                      name="certificationDate"
                      value={formData.certificationDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Certification Date
                    </label>
                    <input
                      type="date"
                      name="nextCertificationDate"
                      value={formData.nextCertificationDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Review & Maintenance */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Review & Maintenance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  name="reviewFrequency"
                  required
                  value={formData.reviewFrequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Quarterly">Quarterly</option>
                  <option value="Bi-Annually">Bi-Annually</option>
                  <option value="Annually">Annually</option>
                  <option value="Every 2 Years">Every 2 Years</option>
                  <option value="Every 3 Years">Every 3 Years</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Review Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="nextReviewDate"
                  required
                  value={formData.nextReviewDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Review Date
                </label>
                <input
                  type="date"
                  name="lastReviewDate"
                  value={formData.lastReviewDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Framework Owner <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="frameworkOwner"
                  required
                  value={formData.frameworkOwner}
                  onChange={handleChange}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., IT Department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Associations */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Associated Items
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Policies
                </label>
                <input
                  type="text"
                  name="relatedPolicies"
                  value={formData.relatedPolicies}
                  onChange={handleChange}
                  placeholder="e.g., Information Security Policy, Data Privacy Policy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated list of policies that comply with this framework</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Controls
                </label>
                <textarea
                  name="relatedControls"
                  value={formData.relatedControls}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Access Control, Encryption, Incident Response"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Controls that implement this framework</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicable Regulations
                </label>
                <input
                  type="text"
                  name="applicableRegulations"
                  value={formData.applicableRegulations}
                  onChange={handleChange}
                  placeholder="e.g., GDPR, HIPAA, SOX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Regulations this framework helps comply with</p>
              </div>
            </div>
          </div>

          {/* Compliance & Maturity */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Compliance & Maturity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Requirements
                </label>
                <textarea
                  name="keyRequirements"
                  value={formData.keyRequirements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List main requirements (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compliance Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="complianceLevel"
                    required
                    value={formData.complianceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Partial Compliance">Partial Compliance</option>
                    <option value="Full Compliance">Full Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Controls
                  </label>
                  <input
                    type="number"
                    name="numberOfControls"
                    value={formData.numberOfControls}
                    onChange={handleChange}
                    placeholder="e.g., 114"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maturity Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="maturityLevel"
                  required
                  value={formData.maturityLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Initial">Initial</option>
                  <option value="Managed">Managed</option>
                  <option value="Defined">Defined</option>
                  <option value="Quantitatively Managed">Quantitatively Managed</option>
                  <option value="Optimizing">Optimizing</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Current maturity level of framework implementation</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  required
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Risk & Impact */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Risk & Impact Assessment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level if Non-Compliant
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Impact Areas
                </label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {impacts.map((impact) => (
                    <label key={impact} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.businessImpact.includes(impact)}
                        onChange={() => handleMultiSelect(impact, 'businessImpact')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{impact}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documentation & Resources */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Documentation & Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Official Website
                </label>
                <input
                  type="url"
                  name="officialWebsite"
                  value={formData.officialWebsite}
                  onChange={handleChange}
                  placeholder="https://www.iso.org/iso-27001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internal Documentation
                </label>
                <input
                  type="text"
                  name="internalDocumentation"
                  value={formData.internalDocumentation}
                  onChange={handleChange}
                  placeholder="Link or reference to internal docs"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="trainingRequired"
                    checked={formData.trainingRequired}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Training Required</span>
                </label>
              </div>

              {formData.trainingRequired && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Training Materials
                  </label>
                  <input
                    type="text"
                    name="trainingMaterials"
                    value={formData.trainingMaterials}
                    onChange={handleChange}
                    placeholder="Link to training resources"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Tags & Classification
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {commonTags.map((tag) => (
                <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleMultiSelect(tag, 'tags')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Implementation Notes
                </label>
                <textarea
                  name="implementationNotes"
                  value={formData.implementationNotes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Challenges, successes, lessons learned during implementation..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exceptions
                </label>
                <textarea
                  name="exceptions"
                  value={formData.exceptions}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any exceptions or deviations from the standard framework..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/governance/frameworks"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Create Framework
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

