export default function Home() {
  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-blue-600 rounded-lg p-8 mb-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Good morning James</h1>
          <p className="text-blue-100 text-lg">
            Welcome to your <span className="font-semibold">ProSuite</span> activity feed
          </p>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 opacity-10">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-lg font-semibold text-green-600">Activity</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Recent ProSuite events, actions, and incidents</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Subscriptions Viewed</p>
                  <p className="text-sm text-gray-500">Retrieved all tenants with their subscription details</p>
                  <p className="text-xs text-gray-400 mt-1">0 seconds ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Successfully logged in</p>
                  <p className="text-sm text-gray-500">has logged in.</p>
                  <p className="text-xs text-gray-400 mt-1">2 seconds ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Knowledge Base Solutions Viewed</p>
                  <p className="text-sm text-gray-500">Successfully retrieved list of knowledge base solutions</p>
                  <p className="text-xs text-gray-400 mt-1">19 hours ago</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                ✓ Show 5 More
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-lg font-semibold text-green-600">Tasks</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Outstanding ProSuite tasks and todos</p>
          </div>
          <div className="p-6">
            <div className="flex space-x-1 mb-6">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                New Tasks
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                In Progress
              </button>
              <button className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Completed
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500">No new tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

