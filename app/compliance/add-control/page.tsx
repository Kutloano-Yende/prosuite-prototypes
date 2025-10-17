'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddControl() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    relatedRegulations: '',
    implementationStatus: 'Planned',
    riskLevel: 'Medium',
    owner: '',
    lastReviewDate: '',
    controlType: 'Preventive',
    
    // Additional Fields
    priority: 'Medium',
    family: 'Access Control',
    nextReviewDate: '',
    effectivenessRating: 'Not Assessed',
    automationLevel: 'Manual',
    frequency: 'As needed',
    evidence: '',
    
    // Consequences of Control Failure
    financialConsequences: '',
    operationalConsequences: '',
    reputationalConsequences: '',
    legalConsequences: '',
    
    // Additional Information
    compensatingControls: '',
    notes: '',
    tags: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new control object
    const newControl = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      relatedRegulations: formData.relatedRegulations.split(',').map(r => r.trim()).filter(r => r),
      implementationStatus: formData.implementationStatus,
      riskLevel: formData.riskLevel,
      owner: formData.owner,
      lastReviewDate: formData.lastReviewDate,
      controlType: formData.controlType,
      priority: formData.priority,
      family: formData.family,
      nextReviewDate: formData.nextReviewDate,
      effectivenessRating: formData.effectivenessRating,
      automationLevel: formData.automationLevel,
      frequency: formData.frequency,
      evidence: formData.evidence.split(',').map(e => e.trim()).filter(e => e),
      consequencesOfFailure: {
        financial: formData.financialConsequences,
        operational: formData.operationalConsequences,
        reputational: formData.reputationalConsequences,
        legal: formData.legalConsequences
      },
      compensatingControls: formData.compensatingControls.split(',').map(c => c.trim()).filter(c => c),
      notes: formData.notes,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Get existing controls from localStorage
    const existingControls = JSON.parse(localStorage.getItem('capturedControls') || '[]')
    
    // Add new control
    existingControls.push(newControl)
    
    // Save back to localStorage
    localStorage.setItem('capturedControls', JSON.stringify(existingControls))
    
    const message = `✅ Control Created Successfully!

Control Details:
━━━━━━━━━━━━━━━━━━━━
📋 Name: ${formData.name}
📄 Type: ${formData.controlType}
🏷️ Family: ${formData.family}
⚖️ Regulations: ${formData.relatedRegulations}
🔔 Status: ${formData.implementationStatus}
🚨 Priority: ${formData.priority.toUpperCase()}
📊 Risk Level: ${formData.riskLevel.toUpperCase()}

Responsibility:
━━━━━━━━━━━━━━━━━━━━
👤 Owner: ${formData.owner}
🔍 Effectiveness: ${formData.effectivenessRating}
🤖 Automation: ${formData.automationLevel}
📅 Frequency: ${formData.frequency}

${formData.lastReviewDate ? `📅 Last Review: ${formData.lastReviewDate}` : ''}
${formData.nextReviewDate ? `📅 Next Review: ${formData.nextReviewDate}` : ''}

📝 Description: ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}

━━━━━━━━━━━━━━━━━━━━
✅ This control will now appear in your controls library!`

    alert(message)
    router.push('/compliance/controls')
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
          <Link href="/compliance/controls" className="text-purple-600 hover:text-purple-800 mb-4 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Controls Library
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Add New Control</h1>
          <p className="text-gray-600 mt-2">Create a new compliance control with detailed specifications and consequences</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Multi-Factor Authentication"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  placeholder="Details what the control does and how it works..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Regulations
                </label>
                <input
                  type="text"
                  name="relatedRegulations"
                  value={formData.relatedRegulations}
                  onChange={handleChange}
                  placeholder="e.g., GDPR, SOX, ISO 27001, HIPAA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated list of laws or standards</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Implementation Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="implementationStatus"
                  required
                  value={formData.implementationStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Planned">Planned</option>
                  <option value="Implemented">Implemented</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Not Implemented">Not Implemented</option>
                  <option value="Requires Review">Requires Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

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
                  placeholder="e.g., IT Security Team"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Control Type
                </label>
                <select
                  name="controlType"
                  value={formData.controlType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Preventive">Preventive</option>
                  <option value="Detective">Detective</option>
                  <option value="Corrective">Corrective</option>
                </select>
              </div>
            </div>
          </div>

          {/* Control Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">
              Control Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Control Family
                </label>
                <select
                  name="family"
                  value={formData.family}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Access Control">Access Control</option>
                  <option value="Data Security">Data Security</option>
                  <option value="Training & Awareness">Training & Awareness</option>
                  <option value="Incident Response">Incident Response</option>
                  <option value="Vulnerability Management">Vulnerability Management</option>
                  <option value="Change Management">Change Management</option>
                  <option value="Physical Security">Physical Security</option>
                  <option value="Network Security">Network Security</option>
                  <option value="Application Security">Application Security</option>
                  <option value="Business Continuity">Business Continuity</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effectiveness Rating
                </label>
                <select
                  name="effectivenessRating"
                  value={formData.effectivenessRating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Not Assessed">Not Assessed</option>
                  <option value="Effective">Effective</option>
                  <option value="Partially Effective">Partially Effective</option>
                  <option value="Ineffective">Ineffective</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Automation Level
                </label>
                <select
                  name="automationLevel"
                  value={formData.automationLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Manual">Manual</option>
                  <option value="Semi-Automated">Semi-Automated</option>
                  <option value="Automated">Automated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Continuous">Continuous</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                  <option value="As needed">As needed</option>
                  <option value="Event driven">Event driven</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consequences of Control Failure Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-500">
              Consequences of Control Failure
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Consequences
                </label>
                <textarea
                  name="financialConsequences"
                  value={formData.financialConsequences}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Potential fines up to €20M or 4% of annual turnover, Cost of breach investigation and remediation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operational Consequences
                </label>
                <textarea
                  name="operationalConsequences"
                  value={formData.operationalConsequences}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Unauthorized access to systems, Data breach and data loss, System downtime during incident response"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reputational Consequences
                </label>
                <textarea
                  name="reputationalConsequences"
                  value={formData.reputationalConsequences}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Loss of customer trust, Negative media coverage, Damage to brand reputation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal/Regulatory Consequences
                </label>
                <textarea
                  name="legalConsequences"
                  value={formData.legalConsequences}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., GDPR violations, Potential lawsuits from affected parties, Regulatory investigations"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Evidence & Documentation Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">
              Evidence & Documentation
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence of Effectiveness
                </label>
                <textarea
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Audit reports, Test results, Monitoring logs, Compliance certificates"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated list of evidence types</p>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compensating Controls
                </label>
                <textarea
                  name="compensatingControls"
                  value={formData.compensatingControls}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Backup authentication methods, Additional monitoring, Manual review processes"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Backup controls if this control fails</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Additional notes, implementation details, or special considerations..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  placeholder="e.g., critical, automated, regulatory, IT"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Comma-separated tags for categorization</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/compliance/controls"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg"
            >
              Create Control
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
