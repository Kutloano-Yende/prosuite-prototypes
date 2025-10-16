'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddPolicy() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    policyNumber: '',
    title: '',
    category: 'IT',
    status: 'draft',
    version: '1.0',
    owner: '',
    approver: '',
    department: '',
    effectiveDate: '',
    reviewDate: '',
    nextReviewDate: '',
    description: '',
    frameworks: [] as string[],
    attachments: '',
  })

  const frameworks = ['ISO 31000', 'COSO', 'King IV', 'SOX', 'COBIT', 'NIST', 'Basel III']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new policy object
    const newPolicy = {
      id: Date.now(), // Simple ID generation
      policyNumber: formData.policyNumber,
      title: formData.title,
      category: formData.category,
      status: formData.status,
      version: formData.version,
      owner: formData.owner,
      ownerId: Math.floor(Math.random() * 1000),
      approver: formData.approver,
      approverId: Math.floor(Math.random() * 1000),
      department: formData.department,
      departmentId: Math.floor(Math.random() * 10),
      effectiveDate: formData.effectiveDate,
      reviewDate: formData.reviewDate,
      nextReviewDate: formData.nextReviewDate,
      description: formData.description,
      frameworks: formData.frameworks,
      attachments: formData.attachments ? formData.attachments.split(',').map(s => s.trim()) : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Get existing policies from localStorage
    const existingPolicies = JSON.parse(localStorage.getItem('capturedPolicies') || '[]')
    
    // Add new policy
    existingPolicies.push(newPolicy)
    
    // Save back to localStorage
    localStorage.setItem('capturedPolicies', JSON.stringify(existingPolicies))
    
    // Show success message
    const message = `✅ Policy Created Successfully!

Policy Details:
━━━━━━━━━━━━━━━━━━━━
📋 Policy Number: ${formData.policyNumber}
📄 Title: ${formData.title}
📂 Category: ${formData.category}
🔖 Status: ${formData.status}
🔢 Version: ${formData.version}

People:
━━━━━━━━━━━━━━━━━━━━
👤 Owner: ${formData.owner}
✅ Approver: ${formData.approver}
🏢 Department: ${formData.department}

Dates:
━━━━━━━━━━━━━━━━━━━━
📅 Effective: ${formData.effectiveDate}
🔍 Review: ${formData.reviewDate}
📌 Next Review: ${formData.nextReviewDate}

${formData.frameworks.length > 0 ? `Frameworks: ${formData.frameworks.join(', ')}` : ''}

📝 Description: ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}

━━━━━━━━━━━━━━━━━━━━
✅ This policy will now appear in your dashboard table!`

    alert(message)
    router.push('/governance')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFrameworkChange = (framework: string) => {
    setFormData(prev => ({
      ...prev,
      frameworks: prev.frameworks.includes(framework)
        ? prev.frameworks.filter(f => f !== framework)
        : [...prev.frameworks, framework]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/governance" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Capture New Policy</h1>
          <p className="text-gray-600 mt-2">Create a new governance policy with all required details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="policyNumber"
                  required
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="e.g., POL-009"
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
                  placeholder="e.g., 1.0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Cloud Security Policy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Security">Security</option>
                  <option value="Legal">Legal</option>
                </select>
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
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="under_review">Under Review</option>
                  <option value="expired">Expired</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Responsibility Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Responsibility & Ownership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Owner <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="owner"
                  required
                  value={formData.owner}
                  onChange={handleChange}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approver <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="approver"
                  required
                  value={formData.approver}
                  onChange={handleChange}
                  placeholder="e.g., Jane Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="e.g., IT Department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Timeline & Review Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  Review Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="reviewDate"
                  required
                  value={formData.reviewDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
            </div>
          </div>

          {/* Frameworks Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Applicable Frameworks
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {frameworks.map((framework) => (
                <label key={framework} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.frameworks.includes(framework)}
                    onChange={() => handleFrameworkChange(framework)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{framework}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Policy Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Enter comprehensive policy description, objectives, scope, and key requirements..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Attachments */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Attachments (Optional)
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document References
              </label>
              <input
                type="text"
                name="attachments"
                value={formData.attachments}
                onChange={handleChange}
                placeholder="e.g., policy_document_v1.pdf, guidelines.docx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">Comma-separated list of document names</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/governance"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Create Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
