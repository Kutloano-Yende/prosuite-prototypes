'use client'

// This component is deprecated. Use the one in components/governance-management/GovernanceDashboardContent.tsx instead.

import React from 'react'

const GovernanceDashboardContent: React.FC = () => {
    return <div>Deprecated - see components/governance-management/GovernanceDashboardContent.tsx</div>
}

/*
const _GovernanceDashboardContent: React.FC = () => {
    const [isLoading] = useState(false)

    // KPI Data
    const kpis = mockGovernanceKPIs
    const policyDistribution = mockPolicyDistribution
    const recentPolicies = mockRecentPolicyUpdates

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Governance Management Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of governance framework and activities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Total Policies</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.totalPolicies}</p>
                                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.policies}% vs last month</p>
                            </div>
                            <FileText className="h-12 w-12 text-blue-500" />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Due for Review</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.underReview}</p>
                                <p className="text-sm text-red-600 mt-2">↘ {Math.abs(kpis.monthlyChanges.review)}% vs last month</p>
                            </div>
                            <Clock className="h-12 w-12 text-orange-500" />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Active Policies</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.activePolicies}</p>
                                <p className="text-sm text-gray-600 mt-2">↗ {kpis.monthlyChanges.active}% vs last month</p>
                            </div>
                            <CheckCircle2 className="h-12 w-12 text-purple-500" />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase">Expired Policies</p>
                                <p className="text-3xl font-bold text-gray-900">{kpis.expired}</p>
                                <p className="text-sm text-green-600 mt-2">↗ {kpis.monthlyChanges.expired}% vs last month</p>
                            </div>
                            <Shield className="h-12 w-12 text-yellow-500" />
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <Activity className="mr-2" size={20} />
                        Governance Compliance Score
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="100"
                                    fill="none"
                                    stroke="#E5E7EB"
                                    strokeWidth="20"
                                />
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="100"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="20"
                                    strokeDasharray={`${kpis.complianceScore * 6.28}, 628`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-5xl font-bold text-gray-900">{kpis.complianceScore.toFixed(1)}%</div>
                                <div className="text-sm text-gray-500 mt-2">Overall Score</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <LucidePieChart className="mr-2" size={20} />
                        Policy Status Distribution
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {policyDistribution.map((item) => (
                            <div key={item.category} className="text-center p-4 rounded-lg" style={{backgroundColor: '#3B82F6' + '20'}}>
                                <div className="text-3xl font-bold" style={{color: '#3B82F6'}}>{item.count}</div>
                                <div className="text-sm text-gray-600 mt-2">{item.category}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <FileText className="mr-2" size={20} />
                        Recent Policy Updates
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Policy ID</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Updated By</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Updated At</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentPolicies.slice(0, 5).map((policy) => (
                                    <tr key={policy.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{policy.id}</td>
                                        <td className="px-4 py-2">{policy.title}</td>
                                        <td className="px-4 py-2">{policy.updatedBy}</td>
                                        <td className="px-4 py-2">{policy.updatedAt}</td>
                                        <td className="px-4 py-2">
                                            <Badge className={
                                                policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                policy.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }>
                                                {policy.status}
                                            </Badge>
                                        </td>
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

export default GovernanceDashboardContent

/*
export default _GovernanceDashboardContent
*/
