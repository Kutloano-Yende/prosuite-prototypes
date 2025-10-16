'use client'

import React from 'react'
import Modal from './Modal'

export interface TableViewConfig {
  title: string
  subtitle?: string
  type: 'policy' | 'obligation' | 'assessment' | 'action-plan' | 'framework' | 'review'
  fields: ViewField[]
  sections?: ViewSection[]
  actions?: ViewAction[]
}

export interface ViewField {
  label: string
  value: string | string[]
  type?: 'text' | 'badge' | 'date' | 'list' | 'tags'
  badgeColor?: 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray' | 'orange'
  icon?: React.ReactNode
}

export interface ViewSection {
  title: string
  content: string
  type?: 'default' | 'warning' | 'info' | 'success'
  items?: string | string[]
}

export interface ViewAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: React.ReactNode
}

interface TableViewModalProps {
  isOpen: boolean
  onClose: () => void
  data: any
  config: TableViewConfig
}

const TableViewModal: React.FC<TableViewModalProps> = ({
  isOpen,
  onClose,
  data,
  config
}) => {
  if (!data) return null

  const getBadgeColor = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800',
      orange: 'bg-orange-100 text-orange-800'
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const getSectionColor = (type: string) => {
    const colors = {
      default: 'bg-gray-50 border-gray-200',
      warning: 'bg-red-50 border-red-200',
      info: 'bg-blue-50 border-blue-200',
      success: 'bg-green-50 border-green-200'
    }
    return colors[type as keyof typeof colors] || colors.default
  }

  const getSectionTextColor = (type: string) => {
    const colors = {
      default: 'text-gray-700',
      warning: 'text-red-800',
      info: 'text-blue-800',
      success: 'text-green-800'
    }
    return colors[type as keyof typeof colors] || colors.default
  }

  const renderFieldValue = (field: ViewField) => {
    const value = field.value

    switch (field.type) {
      case 'badge':
        return (
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getBadgeColor(field.badgeColor || 'gray')}`}>
            {Array.isArray(value) ? value[0] : value}
          </span>
        )
      
      case 'date':
        return (
          <span className="text-gray-900">
            {new Date(value as string).toLocaleDateString()}
          </span>
        )
      
      case 'list':
        return (
          <div className="space-y-2">
            {(value as string[]).map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900">{item}</span>
              </div>
            ))}
          </div>
        )
      
      case 'tags':
        return (
          <div className="flex flex-wrap gap-2">
            {(value as string[]).map((tag, index) => (
              <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )
      
      default:
        return <span className="text-gray-900">{value}</span>
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      size="xl"
    >
      <div className="flex h-[70vh]">
        {/* Main Content Area */}
        <div className="flex-1 pr-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {data.title || data.name || `${config.type.charAt(0).toUpperCase() + config.type.slice(1)} Details`}
                </h2>
                {data.description && (
                  <p className="text-gray-600">{data.description}</p>
                )}
                {config.subtitle && (
                  <p className="text-gray-500 text-sm mt-1">{config.subtitle}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {config.actions?.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      action.variant === 'primary' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : action.variant === 'danger'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
                <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                  {config.type.charAt(0).toUpperCase() + config.type.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Sections */}
          {config.sections?.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
              <div className={`rounded-lg p-4 border ${getSectionColor(section.type || 'default')}`}>
                <p className={`leading-relaxed ${getSectionTextColor(section.type || 'default')}`}>
                  {section.content}
                </p>
                {section.items && section.items.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-900">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

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
          {/* Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {config.type.charAt(0).toUpperCase() + config.type.slice(1)} Details
            </h3>
            <div className="space-y-4">
              {config.fields.map((field, index) => (
                <div key={index}>
                  <label className="text-sm font-medium text-gray-500">{field.label}</label>
                  <div className="mt-1">
                    {field.icon && (
                      <div className="flex items-center space-x-2">
                        {field.icon}
                        {renderFieldValue(field)}
                      </div>
                    )}
                    {!field.icon && renderFieldValue(field)}
                  </div>
                </div>
              ))}
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
              {data.category && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {data.category}
                </span>
              )}
              {data.department && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {data.department}
                </span>
              )}
              {data.jurisdiction && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {data.jurisdiction}
                </span>
              )}
              {data.frequency && (
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {data.frequency}
                </span>
              )}
            </div>
          </div>

          {/* Related Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Related {config.type === 'policy' ? 'Policies' : config.type === 'obligation' ? 'Obligations' : 'Items'}
            </h3>
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">No related items</p>
              <p className="text-gray-400 text-xs mt-1">Check back later for updates</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TableViewModal
