'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddObligation() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    obligationCode: '',
    title: '',
    regulation: 'GDPR',
    regulationCategory: 'Data Privacy',
    description: '',
    frequency: 'monthly',
    status: 'not_assessed',
    owner: '',
    department: '',
    priority: 'medium',
    dueDate: '',
    nextAssessmentDate: '',
    jurisdiction: '',
    evidenceRequired: '',
    consequencesOfNonCompliance: '',
    responsibleParty: '',
    relatedControls: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new obligation object
    const newObligation = {
      id: Date.now(),
      obligationCode: formData.obligationCode,
      title: formData.title,
      regulation: formData.regulation,
      regulationId: Math.floor(Math.random() * 10),
      regulationCategory: formData.regulationCategory,
      description: formData.description,
      frequency: formData.frequency,
      status: formData.status,
      owner: formData.owner,
      ownerId: Math.floor(Math.random() * 1000),
      department: formData.department,
      departmentId: Math.floor(Math.random() * 10),
      priority: formData.priority,
      dueDate: formData.dueDate,
      nextAssessmentDate: formData.nextAssessmentDate,
      lastAssessmentDate: null,
      complianceScore: null,
      jurisdiction: formData.jurisdiction,
      evidenceRequired: formData.evidenceRequired.split(',').map(e => e.trim()).filter(e => e),
      evidenceAttached: [],
      effectiveDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Get existing obligations from localStorage
    const existingObligations = JSON.parse(localStorage.getItem('capturedObligations') || '[]')
    
    // Add new obligation
    existingObligations.push(newObligation)
    
    // Save back to localStorage
    localStorage.setItem('capturedObligations', JSON.stringify(existingObligations))
    
    const message = `✅ Compliance Obligation Created Successfully!

Obligation Details:
━━━━━━━━━━━━━━━━━━━━
📋 Code: ${formData.obligationCode}
📄 Title: ${formData.title}
⚖️ Regulation: ${formData.regulation}
📂 Category: ${formData.regulationCategory}
🔔 Frequency: ${formData.frequency}
🚨 Priority: ${formData.priority.toUpperCase()}
🔖 Status: ${formData.status.replace(/_/g, ' ').toUpperCase()}

Responsibility:
━━━━━━━━━━━━━━━━━━━━
👤 Owner: ${formData.owner}
🏢 Department: ${formData.department}
👥 Responsible Party: ${formData.responsibleParty}
🌍 Jurisdiction: ${formData.jurisdiction}

Timeline:
━━━━━━━━━━━━━━━━━━━━
📅 Due Date: ${formData.dueDate}
🔍 Next Assessment: ${formData.nextAssessmentDate}

${formData.evidenceRequired ? `📎 Evidence: ${formData.evidenceRequired}` : ''}

📝 Description: ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}

━━━━━━━━━━━━━━━━━━━━
✅ This obligation will now appear in your dashboard table!`

    alert(message)
    router.push('/compliance')
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
          <Link href="/compliance" className="text-green-600 hover:text-green-800 mb-4 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Capture New Compliance Obligation</h1>
          <p className="text-gray-600 mt-2">Create a new compliance obligation with all regulatory details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Obligation Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="obligationCode"
                  required
                  value={formData.obligationCode}
                  onChange={handleChange}
                  placeholder="e.g., OBL-GDPR-002"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Obligation Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Data Breach Notification within 72 hours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Regulatory Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Regulatory Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regulation <span className="text-red-500">*</span>
                </label>
                <select
                  name="regulation"
                  required
                  value={formData.regulation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="GDPR">GDPR</option>
                  <option value="SOX">Sarbanes-Oxley Act</option>
                  <option value="POPIA">POPIA</option>
                  <option value="ISO 27001">ISO 27001</option>
                  <option value="OSHA">OSHA</option>
                  <option value="PCI DSS">PCI DSS</option>
                  <option value="HIPAA">HIPAA</option>
                  <option value="AML">Anti-Money Laundering</option>
                  <option value="EPA">Environmental Protection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regulation Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="regulationCategory"
                  required
                  value={formData.regulationCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Data Privacy">Data Privacy</option>
                  <option value="Financial">Financial</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Health & Safety">Health & Safety</option>
                  <option value="Industry Specific">Industry Specific</option>
                  <option value="Employment">Employment</option>
                  <option value="Security">Security</option>
                  <option value="Anti-Corruption">Anti-Corruption</option>
                  <option value="Consumer Protection">Consumer Protection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jurisdiction <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jurisdiction"
                  required
                  value={formData.jurisdiction}
                  onChange={handleChange}
                  placeholder="e.g., European Union, South Africa, United States"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  name="frequency"
                  required
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="one_time">One Time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi_annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                  <option value="event_driven">Event Driven</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Compliance Status & Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="compliant">Compliant</option>
                  <option value="non_compliant">Non-Compliant</option>
                  <option value="partially_compliant">Partially Compliant</option>
                  <option value="under_review">Under Review</option>
                  <option value="not_assessed">Not Assessed</option>
                  <option value="not_applicable">Not Applicable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  required
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Assessment Date
                </label>
                <input
                  type="date"
                  name="nextAssessmentDate"
                  value={formData.nextAssessmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Responsibility Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Responsibility & Ownership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="owner"
                  required
                  value={formData.owner}
                  onChange={handleChange}
                  placeholder="e.g., Sarah Johnson"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., Legal Department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsible Party
                </label>
                <input
                  type="text"
                  name="responsibleParty"
                  value={formData.responsibleParty}
                  onChange={handleChange}
                  placeholder="e.g., Data Protection Officer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Detailed Information
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
                  placeholder="Enter detailed description of the compliance obligation, what is required, and how it should be fulfilled..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence Required
                </label>
                <textarea
                  name="evidenceRequired"
                  value={formData.evidenceRequired}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Audit logs, Training records, Certification documents, Process documentation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consequences of Non-Compliance
                </label>
                <textarea
                  name="consequencesOfNonCompliance"
                  value={formData.consequencesOfNonCompliance}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Fines up to €20M or 4% of annual turnover, Criminal prosecution, License revocation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Controls
                </label>
                <input
                  type="text"
                  name="relatedControls"
                  value={formData.relatedControls || ''}
                  onChange={handleChange}
                  placeholder="e.g., Access Control Policy, Data Encryption, Incident Response Plan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Controls that help meet this obligation (comma-separated)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/compliance"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
            >
              Create Obligation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
