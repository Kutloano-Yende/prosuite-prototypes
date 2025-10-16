'use client'

import React, { useState } from 'react'
import PageSectionHeader from '@/components/common/layout/PageSectionHeader'
import { StatsGrid } from '@/components/common/layout/StatsCard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UniversalChart } from '@/components/eCharts/UniversalChart'
import CardContentSkeleton from '@/components/common/layout/CardContentSkeleton'
import { 
    FileCheck, 
    AlertCircle, 
    Clock, 
    TrendingUp,
    PieChart as LucidePieChart, 
    BarChart2,
    Activity,
    Shield
} from 'lucide-react'
import CustomDataTable from '@/components/common/tables/CustomDataTable'
import { Badge } from '@/components/ui/badge'
import DateService from '@/services/DateService'
import {
    mockComplianceKPIs,
    mockObligationsByStatus,
    mockObligationsByFrequency,
    mockComplianceTrend,
    mockObligationsByRegulation,
    mockCriticalObligations,
    mockRecentAssessments,
} from '@/utils/mockData/complianceMockData'

const ComplianceDashboardContent: React.FC = () => {
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
                const date = value ? DateService.formatForDisplay(value) : 'N/A'
                const isOverdue = value && new Date(value) < new Date()
                return (
                    <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                        {date}
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
            render: (value: string) => value ? DateService.formatForDisplay(value) : 'N/A',
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

    const ChartCard: React.FC<{
        title: string
        icon: React.ReactNode
        isLoading: boolean
        error: string | null
        isEmpty: boolean
        emptyMessage: string
        skeletonType: 'doughnut' | 'bar' | 'line' | 'gauge'
        children: React.ReactNode
        contentClassName?: string
    }> = ({ title, icon, isLoading, error, isEmpty, emptyMessage, skeletonType, children, contentClassName }) => (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    {icon}
                    {title}
                </div>
            </CardHeader>
            <CardContent className={contentClassName}>
                {isLoading ? (
                    <CardContentSkeleton type={skeletonType} />
                ) : error ? (
                    <div className="flex justify-center items-center min-h-[350px] w-full">
                        <div className="text-red-500">{error}</div>
                    </div>
                ) : isEmpty ? (
                    <div className="flex justify-center items-center min-h-[350px] w-full">
                        <div className="text-gray-500">{emptyMessage}</div>
                    </div>
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    )

    return (
        <div className="space-y-6">
            <PageSectionHeader
                title="Compliance Management Dashboard"
                subTitle="Overview of compliance management metrics and activities"
            />

            <StatsGrid
                stats={[
                    {
                        title: 'Total Obligations',
                        number: kpis.totalObligations,
                        statColor: 'text-blue-600',
                        lastMonthDifference: kpis.monthlyChanges.total,
                        icon: <FileCheck size={20} />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                    {
                        title: 'Compliance Rate',
                        number: `${kpis.complianceRate}%`,
                        statColor: 'text-green-600',
                        lastMonthDifference: kpis.monthlyChanges.compliant,
                        icon: <Shield className="h-5 w-5" />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                    {
                        title: 'Overdue Obligations',
                        number: kpis.overdueObligations,
                        statColor: 'text-red-600',
                        lastMonthDifference: kpis.monthlyChanges.overdue,
                        icon: <AlertCircle className="h-5 w-5" />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                    {
                        title: 'Upcoming Deadlines',
                        number: kpis.upcomingDeadlines,
                        statColor: 'text-orange-500',
                        lastMonthDifference: kpis.monthlyChanges.assessments,
                        icon: <Clock size={20} />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                ]}
            />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 my-6 sm:my-8 lg:my-10">
                <ChartCard
                    title="Compliance Status Overview"
                    icon={<LucidePieChart className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={obligationsByStatus.length === 0}
                    emptyMessage="No status data available."
                    skeletonType="doughnut"
                    contentClassName="px-2 sm:p-6"
                >
                    <UniversalChart
                        type="donut"
                        data={obligationsByStatus}
                        config={{
                            nameKey: 'name',
                            valueKey: 'value',
                            colors: ['#10B981', '#EF4444', '#F59E0B', '#3B82F6'],
                            loading: isLoading,
                        }}
                    />
                </ChartCard>

                <ChartCard
                    title="Obligations by Frequency"
                    icon={<BarChart2 className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={obligationsByFrequency.length === 0}
                    emptyMessage="No frequency data available."
                    skeletonType="bar"
                >
                    <UniversalChart
                        type="bar"
                        data={obligationsByFrequency}
                        config={{
                            xAxisKey: 'name',
                            yAxisKeys: [{
                                dataKey: 'value',
                                name: 'Obligations',
                                color: '#146EAD',
                            }],
                        }}
                    />
                </ChartCard>

                <ChartCard
                    title="Compliance Rate"
                    icon={<Activity className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={false}
                    emptyMessage=""
                    skeletonType="gauge"
                    contentClassName="px-2 sm:p-6"
                >
                    <div className="flex flex-col items-center justify-center min-h-[350px]">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#E5E7EB"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="8"
                                    strokeDasharray={`${kpis.complianceRate * 2.51327}, 251.327`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-4xl font-bold text-gray-900">
                                    {kpis.complianceRate.toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Compliant
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Overall compliance rate across all obligations
                            </p>
                        </div>
                    </div>
                </ChartCard>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-10">
                <ChartCard
                    title="Compliance Trend (Last 12 Months)"
                    icon={<TrendingUp className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={complianceTrend.length === 0}
                    emptyMessage="No trend data available."
                    skeletonType="line"
                >
                    <UniversalChart
                        type="line"
                        data={complianceTrend}
                        config={{
                            xAxisKey: 'period',
                            yAxisKeys: [
                                {
                                    dataKey: 'rate',
                                    name: 'Compliance Rate %',
                                    color: '#10B981',
                                },
                            ],
                        }}
                    />
                </ChartCard>

                <ChartCard
                    title="Obligations by Regulation"
                    icon={<BarChart2 className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={obligationsByRegulation.length === 0}
                    emptyMessage="No regulation data available."
                    skeletonType="bar"
                >
                    <UniversalChart
                        type="bar"
                        data={obligationsByRegulation.map(reg => ({
                            name: reg.name,
                            compliant: reg.compliant,
                            'non-compliant': reg.nonCompliant,
                            'partially compliant': reg.partiallyCompliant,
                        }))}
                        config={{
                            xAxisKey: 'name',
                            yAxisKeys: [
                                {
                                    dataKey: 'compliant',
                                    name: 'Compliant',
                                    color: '#10B981',
                                },
                                {
                                    dataKey: 'non-compliant',
                                    name: 'Non-Compliant',
                                    color: '#EF4444',
                                },
                                {
                                    dataKey: 'partially compliant',
                                    name: 'Partially Compliant',
                                    color: '#F59E0B',
                                },
                            ],
                            stacked: true,
                        }}
                    />
                </ChartCard>
            </section>

            {/* Critical Obligations Table */}
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center">
                            <AlertCircle className="mr-1" size={20} />
                            Critical Obligations
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <CustomDataTable
                            columns={criticalObligationsColumns}
                            data={criticalObligations}
                            loading={isLoading}
                            showViewAction={false}
                            showEditAction={false}
                            showDeleteAction={false}
                            showActions={false}
                            itemsPerPage={5}
                            className="w-full"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Recent Assessments Table */}
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center">
                            <FileCheck className="mr-1" size={20} />
                            Recent Assessments
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <CustomDataTable
                            columns={recentAssessmentsColumns}
                            data={recentAssessments}
                            loading={isLoading}
                            showViewAction={false}
                            showEditAction={false}
                            showDeleteAction={false}
                            showActions={false}
                            itemsPerPage={5}
                            className="w-full"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ComplianceDashboardContent

