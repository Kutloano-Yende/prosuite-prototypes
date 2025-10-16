'use client'

import React, { useState } from 'react'
import PageSectionHeader from '@/components/common/layout/PageSectionHeader'
import { StatsGrid } from '@/components/common/layout/StatsCard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UniversalChart } from '@/components/eCharts/UniversalChart'
import CardContentSkeleton from '@/components/common/layout/CardContentSkeleton'
import {
    FileText,
    Shield,
    CheckCircle2,
    Clock,
    PieChart as LucidePieChart,
    BarChart2,
    TrendingUp,
    Activity
} from 'lucide-react'
import CustomDataTable from '@/components/common/tables/CustomDataTable'
import { Badge } from '@/components/ui/badge'
import DateService from '@/services/DateService'
import { Policy } from '@/types/governance'
import {
    mockGovernanceKPIs,
    mockPolicyDistribution,
    mockPolicyByCategory,
    mockFrameworkCompliance,
    mockRecentPolicyUpdates,
    mockUpcomingReviews,
} from '@/utils/mockData/governanceMockData'

const GovernanceDashboardContent: React.FC = () => {
    const [isLoading] = useState(false)
    const error = null

    // KPI Data
    const kpis = mockGovernanceKPIs
    const policyDistribution = mockPolicyDistribution
    const policyByCategory = mockPolicyByCategory
    const frameworkCompliance = mockFrameworkCompliance
    const recentPolicies = mockRecentPolicyUpdates
    const upcomingReviews = mockUpcomingReviews

    // Define table columns for Recent Policy Updates
    const recentPoliciesColumns = [
        {
            key: 'policyNumber',
            header: 'Policy ID',
            type: 'text',
            width: '120',
        },
        {
            key: 'title',
            header: 'Policy Title',
            type: 'text',
            width: '300',
        },
        {
            key: 'category',
            header: 'Category',
            type: 'badge',
            width: '120',
            render: (value: string) => {
                const getCategoryColor = (category: string) => {
                    switch (category) {
                        case 'IT':
                            return 'bg-blue-500 text-white'
                        case 'HR':
                            return 'bg-purple-500 text-white'
                        case 'Finance':
                            return 'bg-green-500 text-white'
                        case 'Operations':
                            return 'bg-orange-500 text-white'
                        case 'Compliance':
                            return 'bg-indigo-500 text-white'
                        case 'Security':
                            return 'bg-red-500 text-white'
                        case 'Legal':
                            return 'bg-gray-600 text-white'
                        default:
                            return 'bg-gray-400 text-white'
                    }
                }
                return (
                    <Badge className={getCategoryColor(value)}>
                        {value}
                    </Badge>
                )
            },
        },
        {
            key: 'status',
            header: 'Status',
            type: 'badge',
            width: '130',
            render: (value: string) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'active':
                            return 'bg-green-500 text-white'
                        case 'under_review':
                            return 'bg-blue-500 text-white'
                        case 'expired':
                            return 'bg-red-500 text-white'
                        case 'draft':
                            return 'bg-gray-500 text-white'
                        case 'archived':
                            return 'bg-gray-400 text-white'
                        default:
                            return 'bg-gray-400 text-white'
                    }
                }
                const displayStatus = value.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                    <Badge className={getStatusColor(value)}>
                        {displayStatus}
                    </Badge>
                )
            },
        },
        {
            key: 'version',
            header: 'Version',
            type: 'text',
            width: '80',
        },
        {
            key: 'owner',
            header: 'Owner',
            type: 'text',
            width: '150',
        },
        {
            key: 'effectiveDate',
            header: 'Effective Date',
            type: 'date',
            width: '140',
            render: (value: string) => value ? DateService.formatForDisplay(value) : 'N/A',
        },
        {
            key: 'nextReviewDate',
            header: 'Next Review',
            type: 'date',
            width: '140',
            render: (value: string) => value ? DateService.formatForDisplay(value) : 'N/A',
        },
    ]

    // Define table columns for Upcoming Reviews
    const upcomingReviewsColumns = [
        {
            key: 'policyNumber',
            header: 'Policy ID',
            type: 'text',
            width: '120',
        },
        {
            key: 'title',
            header: 'Policy Title',
            type: 'text',
            width: '300',
        },
        {
            key: 'status',
            header: 'Status',
            type: 'badge',
            width: '130',
            render: (value: string) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'under_review':
                            return 'bg-blue-500 text-white'
                        case 'expired':
                            return 'bg-red-500 text-white'
                        default:
                            return 'bg-yellow-500 text-white'
                    }
                }
                const displayStatus = value.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                    <Badge className={getStatusColor(value)}>
                        {displayStatus}
                    </Badge>
                )
            },
        },
        {
            key: 'nextReviewDate',
            header: 'Review Due Date',
            type: 'date',
            width: '140',
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
        {
            key: 'department',
            header: 'Department',
            type: 'text',
            width: '150',
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
                title="Governance Management Dashboard"
                subTitle="Overview of governance framework and activities"
            />

            <StatsGrid
                stats={[
                    {
                        title: 'Total Policies',
                        number: kpis.totalPolicies,
                        statColor: 'text-blue-600',
                        lastMonthDifference: kpis.monthlyChanges.policies,
                        icon: <FileText size={20} />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                    {
                        title: 'Policies Due for Review',
                        number: kpis.policiesDueForReview,
                        statColor: 'text-orange-500',
                        lastMonthDifference: kpis.monthlyChanges.reviews,
                        icon: <Clock className="h-5 w-5" />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                    {
                        title: 'Active Frameworks',
                        number: kpis.activeFrameworks,
                        statColor: 'text-purple-500',
                        lastMonthDifference: kpis.monthlyChanges.frameworks,
                        icon: <Shield className="h-5 w-5" />,
                        titleColor: 'text-gray-500/60',
                        trendTextColor: 'text-gray-500/60',
                        positiveTrendColor: 'text-green-600',
                        negativeTrendColor: 'text-red-500',
                        loading: isLoading,
                    },
                    {
                        title: 'Pending Approvals',
                        number: kpis.pendingApprovals,
                        statColor: 'text-yellow-600',
                        lastMonthDifference: kpis.monthlyChanges.approvals,
                        icon: <CheckCircle2 size={20} />,
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
                    title="Policy Status Distribution"
                    icon={<LucidePieChart className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={policyDistribution.length === 0}
                    emptyMessage="No policy status data available."
                    skeletonType="doughnut"
                    contentClassName="px-2 sm:p-6"
                >
                    <UniversalChart
                        type="donut"
                        data={policyDistribution}
                        config={{
                            nameKey: 'name',
                            valueKey: 'value',
                            colors: ['#10B981', '#3B82F6', '#EF4444', '#6B7280'],
                            loading: isLoading,
                        }}
                    />
                </ChartCard>

                <ChartCard
                    title="Policy Distribution by Category"
                    icon={<BarChart2 className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={policyByCategory.length === 0}
                    emptyMessage="No category data available."
                    skeletonType="bar"
                >
                    <UniversalChart
                        type="bar"
                        data={policyByCategory}
                        config={{
                            xAxisKey: 'name',
                            yAxisKeys: [{
                                dataKey: 'value',
                                name: 'Policies',
                                color: '#146EAD',
                            }],
                        }}
                    />
                </ChartCard>

                <ChartCard
                    title="Governance Compliance Score"
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
                                    strokeDasharray={`${kpis.complianceScore * 2.51327}, 251.327`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-4xl font-bold text-gray-900">
                                    {kpis.complianceScore.toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Overall Score
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Governance framework compliance across all policies
                            </p>
                        </div>
                    </div>
                </ChartCard>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-10">
                <ChartCard
                    title="Framework Compliance Levels"
                    icon={<TrendingUp className="mr-1" size={20} />}
                    isLoading={isLoading}
                    error={error}
                    isEmpty={frameworkCompliance.length === 0}
                    emptyMessage="No framework data available."
                    skeletonType="bar"
                >
                    <UniversalChart
                        type="bar"
                        data={frameworkCompliance.map(f => ({
                            name: f.name,
                            value: f.percentage,
                        }))}
                        config={{
                            xAxisKey: 'name',
                            yAxisKeys: [{
                                dataKey: 'value',
                                name: 'Compliance %',
                                color: '#91BC4D',
                            }],
                            horizontal: true,
                        }}
                    />
                </ChartCard>
            </section>

            {/* Recent Policy Updates Table */}
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center">
                            <FileText className="mr-1" size={20} />
                            Recent Policy Updates
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <CustomDataTable
                            columns={recentPoliciesColumns}
                            data={recentPolicies}
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

            {/* Upcoming Reviews Table */}
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center">
                            <Clock className="mr-1" size={20} />
                            Upcoming Policy Reviews
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <CustomDataTable
                            columns={upcomingReviewsColumns}
                            data={upcomingReviews}
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

export default GovernanceDashboardContent
