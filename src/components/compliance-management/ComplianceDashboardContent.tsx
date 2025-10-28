'use client'

// This component is deprecated. Use the one in components/compliance-management/ComplianceDashboardContent.tsx instead.

import React from 'react'

const ComplianceDashboardContent: React.FC = () => {
    return <div>Deprecated - see components/compliance-management/ComplianceDashboardContent.tsx</div>
}

/*
const _ComplianceDashboardContent: React.FC = () => {
    const [isLoading] = useState(false)
    const error = null

    // KPI Data
    const kpis = mockComplianceKPIs
    const obligationsByStatus = mockObligationsByStatus
    const obligationsByFrequency = mockObligationsByFrequency
    const complianceTrend = mockComplianceTrend
    const obligationsByRegulation = mockObligationsByRegulation
    const criticalObligations = mockCriticalObligations
    const recentAssessments = mockRecentAssessments

    // Define table columns for Critical Obligations
    const criticalObligationsColumns = [
        {
            key: 'obligationCode',
            header: 'Obligation ID',
            type: 'text',
            width: '140',
        },
        {
            key: 'title',
            header: 'Obligation Title',
            type: 'text',
            width: '300',
        },
        {
            key: 'regulation',
            header: 'Regulation',
            type: 'text',
            width: '120',
        },
        {
            key: 'priority',
            header: 'Priority',
            type: 'badge',
            width: '100',
            render: (value: string) => {
                const getPriorityColor = (priority: string) => {
                    switch (priority) {
                        case 'critical':
                            return 'bg-red-600 text-white'
                        case 'high':
                            return 'bg-orange-500 text-white'
                        case 'medium':
                            return 'bg-yellow-500 text-white'
                        case 'low':
                            return 'bg-green-500 text-white'
                        default:
                            return 'bg-gray-400 text-white'
                    }
                }
                return (
                    <Badge className={getPriorityColor(value)}>
                        {value.toUpperCase()}
                    </Badge>
                )
            },
        },
        {
            key: 'status',
            header: 'Status',
            type: 'badge',
            width: '150',
            render: (value: string) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'compliant':
                            return 'bg-green-500 text-white'
                        case 'non_compliant':
                            return 'bg-red-500 text-white'
                        case 'partially_compliant':
                            return 'bg-orange-500 text-white'
                        case 'under_review':
                            return 'bg-blue-500 text-white'
                        default:
                            return 'bg-gray-400 text-white'
                    }
                }
                const displayStatus = value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                    <Badge className={getStatusColor(value)}>
                        {displayStatus}
                    </Badge>
                )
            },
        },
        {
            key: 'dueDate',
            header: 'Due Date',
            type: 'date',
            width: '120',
            render: (value: string) => {
                const isOverdue = value && new Date(value) < new Date()
                return (
                    <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                        {value || 'N/A'}
                    </span>
                )
            },
        },
        {
            key: 'owner',
            header: 'Owner',
            type: 'text',
            width: '150',
        },
    ]

    // Define table columns for Recent Assessments
    const recentAssessmentsColumns = [
        {
            key: 'assessmentNumber',
            header: 'Assessment ID',
            type: 'text',
            width: '140',
        },
        {
            key: 'title',
            header: 'Assessment Title',
            type: 'text',
            width: '300',
        },
        {
            key: 'regulation',
            header: 'Regulation',
            type: 'text',
            width: '120',
        },
        {
            key: 'assessmentDate',
            header: 'Assessment Date',
            type: 'date',
            width: '140',
            render: (value: string) => value || 'N/A',
        },
        {
            key: 'overallScore',
            header: 'Score',
            type: 'text',
            width: '80',
            render: (value: number) => {
                const color = value >= 90 ? 'text-green-600' : value >= 70 ? 'text-orange-500' : 'text-red-600'
                return <span className={`font-semibold ${color}`}>{value}%</span>
            },
        },
        {
            key: 'complianceLevel',
            header: 'Compliance Level',
            type: 'badge',
            width: '150',
            render: (value: string) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'compliant':
                            return 'bg-green-500 text-white'
                        case 'non_compliant':
                            return 'bg-red-500 text-white'
                        case 'partially_compliant':
                            return 'bg-orange-500 text-white'
                        case 'under_review':
                            return 'bg-blue-500 text-white'
                        default:
                            return 'bg-gray-400 text-white'
                    }
                }
                const displayStatus = value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                    <Badge className={getStatusColor(value)}>
                        {displayStatus}
                    </Badge>
                )
            },
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Compliance Management Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of compliance management metrics and activities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Total Obligations</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.totalObligations}</p>
                                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.total}% vs last month</p>
                            </div>
                            <FileCheck className="h-12 w-12 text-blue-500" />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Compliance Rate</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.complianceRate}%</p>
                                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.compliant}% vs last month</p>
                            </div>
                            <Shield className="h-12 w-12 text-green-500" />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Overdue Obligations</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.overdueObligations}</p>
                                <p className="text-sm text-green-600 mt-2">↗ {Math.abs(kpis.monthlyChanges.overdue)}% improvement</p>
                            </div>
                            <AlertCircle className="h-12 w-12 text-red-500" />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Upcoming Deadlines</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.upcomingDeadlines}</p>
                                <p className="text-sm text-orange-600 mt-2">Next 7 days</p>
                            </div>
                            <Clock className="h-12 w-12 text-orange-500" />
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <LucidePieChart className="mr-2" size={20} />
                        Compliance Status Overview
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {obligationsByStatus.map((item) => (
                            <div key={item.name} className="text-center p-4 rounded-lg" style={{backgroundColor: item.color + '20'}}>
                                <div className="text-3xl font-bold" style={{color: item.color}}>{item.value}</div>
                                <div className="text-sm text-gray-600 mt-2">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <AlertCircle className="mr-2" size={20} />
                        Critical Obligations
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Obligation ID</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Regulation</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Priority</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Owner</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {criticalObligations.slice(0, 5).map((obligation) => (
                                    <tr key={obligation.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{obligation.obligationCode}</td>
                                        <td className="px-4 py-2">{obligation.title}</td>
                                        <td className="px-4 py-2">{obligation.regulation}</td>
                                        <td className="px-4 py-2">
                                            <Badge className={
                                                obligation.priority === 'critical' ? 'bg-red-100 text-red-800' :
                                                obligation.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }>
                                                {obligation.priority.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-2">
                                            <Badge className={
                                                obligation.status === 'compliant' ? 'bg-green-100 text-green-800' :
                                                obligation.status === 'non_compliant' ? 'bg-red-100 text-red-800' :
                                                'bg-orange-100 text-orange-800'
                                            }>
                                                {obligation.status.replace(/_/g, ' ').toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-2">{obligation.owner}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ComplianceDashboardContent

/*
export default _ComplianceDashboardContent
*/
