'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddRegulation() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Required Fields
    title: '',
    description: '',
    effectiveDate: '',
    sourceAuthority: '',
    evidenceField: '',
    
    // Optional Fields
    category: 'Data Privacy',
    complianceRequirements: '',
    status: 'Active',
    
    // Additional Fields
    version: '',
    jurisdiction: '',
    lastUpdated: '',
    relatedObligations: '',
    relatedControls: '',
    penalties: '',
    reviewDate: '',
    tags: '',
    notes: '',
    
    // Governance Fields
    applicableDepartments: '',
    responsibleOfficer: '',
    reviewFrequency: 'Annually',
    nextReviewDate: '',
    approvalStatus: 'Draft',
    approvedBy: '',
    approvalDate: '',
    implementationDate: '',
    trainingRequired: '',
    monitoringFrequency: 'Quarterly'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new regulation object
    const newRegulation = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      effectiveDate: formData.effectiveDate,
      sourceAuthority: formData.sourceAuthority,
      complianceRequirements: formData.complianceRequirements.split(',').map(r => r.trim()).filter(r => r),
      status: formData.status,
      evidenceField: formData.evidenceField,
      version: formData.version,
      jurisdiction: formData.jurisdiction,
      lastUpdated: formData.lastUpdated || new Date().toISOString().split('T')[0],
      relatedObligations: formData.relatedObligations.split(',').map(o => o.trim()).filter(o => o),
      relatedControls: formData.relatedControls.split(',').map(c => c.trim()).filter(c => c),
      penalties: formData.penalties,
      reviewDate: formData.reviewDate,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      notes: formData.notes,
      
      // Governance fields
      applicableDepartments: formData.applicableDepartments.split(',').map(d => d.trim()).filter(d => d),
      responsibleOfficer: formData.responsibleOfficer,
      reviewFrequency: formData.reviewFrequency,
      nextReviewDate: formData.nextReviewDate,
      approvalStatus: formData.approvalStatus,
      approvedBy: formData.approvedBy,
      approvalDate: formData.approvalDate,
      implementationDate: formData.implementationDate,
      trainingRequired: formData.trainingRequired.split(',').map(t => t.trim()).filter(t => t),
      monitoringFrequency: formData.monitoringFrequency,
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Get existing regulations from localStorage
    const existingRegulations = JSON.parse(localStorage.getItem('capturedRegulations') || '[]')
    
    // Add new regulation
    existingRegulations.push(newRegulation)
    
    // Save back to localStorage
    localStorage.setItem('capturedRegulations', JSON.stringify(existingRegulations))
    
    const message = `✅ Regulation Created Successfully!

Regulation Details:
━━━━━━━━━━━━━━━━━━━━
📋 Title: ${formData.title}
📄 Category: ${formData.category}
⚖️ Authority: ${formData.sourceAuthority}
🔔 Status: ${formData.status}
📊 Version: ${formData.version}
🌍 Jurisdiction: ${formData.jurisdiction}

Timeline:
━━━━━━━━━━━━━━━━━━━━
📅 Effective Date: ${formData.effectiveDate}
📅 Review Date: ${formData.reviewDate}
📅 Next Review: ${formData.nextReviewDate}

Governance:
━━━━━━━━━━━━━━━━━━━━
👤 Responsible Officer: ${formData.responsibleOfficer}
📋 Approval Status: ${formData.approvalStatus}
🏢 Departments: ${formData.applicableDepartments}

📝 Description: ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}

━━━━━━━━━━━━━━━━━━━━
✅ This regulation will now appear in your regulations library!`

    alert(message)
    router.push('/compliance/regulations')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/compliance/regulations" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Regulations Library
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Add New Regulation</h1>
          <p className="text-gray-600 mt-2">Create a new compliance regulation or standard with detailed specifications</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., General Data Protection Regulation (GDPR)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="A summary of what the regulation mandates..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Data Privacy">Data Privacy</option>
                  <option value="Financial">Financial</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Health & Safety">Health & Safety</option>
                  <option value="Information Security">Information Security</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Employment">Employment</option>
                  <option value="Anti-Corruption">Anti-Corruption</option>
                  <option value="Consumer Protection">Consumer Protection</option>
                  <option value="Internal Policy">Internal Policy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Repealed">Repealed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="effectiveDate"
                  required
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source/Authority <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sourceAuthority"
                  required
                  value={formData.sourceAuthority}
                  onChange={handleChange}
                  placeholder="e.g., European Union, US Department of Health"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                  placeholder="e.g., 1.0, 2022, 4.0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jurisdiction
                </label>
                <input
                  type="text"
                  name="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={handleChange}
                  placeholder="e.g., European Union, United States, Global"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Compliance Requirements Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Compliance Requirements
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compliance Requirements
                </label>
                <textarea
                  name="complianceRequirements"
                  value={formData.complianceRequirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="e.g., Article 32 - Security of Processing, Administrative Safeguards, Technical Safeguards"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Specific articles, rules, or clauses that must be followed (comma-separated)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence Field <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="evidenceField"
                  required
                  value={formData.evidenceField}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Data Protection Impact Assessments, Audit reports, Training records, Compliance certificates"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Dedicated field to link or describe required proof of compliance</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penalties
                </label>
                <textarea
                  name="penalties"
                  value={formData.penalties}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Up to €20M or 4% of annual turnover, Criminal prosecution, License revocation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Governance Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Governance & Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsible Officer
                </label>
                <input
                  type="text"
                  name="responsibleOfficer"
                  value={formData.responsibleOfficer}
                  onChange={handleChange}
                  placeholder="e.g., Chief Compliance Officer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicable Departments
                </label>
                <input
                  type="text"
                  name="applicableDepartments"
                  value={formData.applicableDepartments}
                  onChange={handleChange}
                  placeholder="e.g., IT, Legal, HR, Finance"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated list of departments</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Frequency
                </label>
                <select
                  name="reviewFrequency"
                  value={formData.reviewFrequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                  <option value="Every 2 Years">Every 2 Years</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Review Date
                </label>
                <input
                  type="date"
                  name="nextReviewDate"
                  value={formData.nextReviewDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Status
                </label>
                <select
                  name="approvalStatus"
                  value={formData.approvalStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Draft">Draft</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved By
                </label>
                <input
                  type="text"
                  name="approvedBy"
                  value={formData.approvedBy}
                  onChange={handleChange}
                  placeholder="e.g., Board of Directors, Legal Team"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Date
                </label>
                <input
                  type="date"
                  name="approvalDate"
                  value={formData.approvalDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Implementation Date
                </label>
                <input
                  type="date"
                  name="implementationDate"
                  value={formData.implementationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monitoring Frequency
                </label>
                <select
                  name="monitoringFrequency"
                  value={formData.monitoringFrequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          {/* Training & Awareness Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Training & Awareness
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Required
                </label>
                <textarea
                  name="trainingRequired"
                  value={formData.trainingRequired}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Data Privacy Training, Security Awareness, Compliance Training"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated list of required training programs</p>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Integration & Relationships
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Obligations
                </label>
                <input
                  type="text"
                  name="relatedObligations"
                  value={formData.relatedObligations}
                  onChange={handleChange}
                  placeholder="e.g., Data Breach Notification, Privacy Impact Assessment"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Compliance obligations that relate to this regulation</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Controls
                </label>
                <input
                  type="text"
                  name="relatedControls"
                  value={formData.relatedControls}
                  onChange={handleChange}
                  placeholder="e.g., Data Encryption Policy, Access Control Policy, Incident Response Plan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Controls that help meet this regulation's requirements</p>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Date
                </label>
                <input
                  type="date"
                  name="reviewDate"
                  value={formData.reviewDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., critical, privacy, financial, EU, US"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated tags for categorization</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Additional notes, implementation details, or special considerations..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/compliance/regulations"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Create Regulation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
