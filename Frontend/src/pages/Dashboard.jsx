import { Link } from "react-router-dom"

function Dashboard() {
  // TODO: Fetch user data and role from API
  const userRole = "candidate" // or 'interviewer'

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      {userRole === "candidate" ? <CandidateDashboard /> : <InterviewerDashboard />}
    </div>
  )
}

function CandidateDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Upcoming Interviews" count={3} />
        <DashboardCard title="Completed Interviews" count={5} />
        <DashboardCard title="Practice Sessions" count={10} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <span>Completed interview with Acme Inc.</span>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
            <span>Scheduled interview with Tech Solutions Ltd.</span>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
            <span>Completed practice session on algorithms</span>
          </li>
        </ul>
      </div>
      <div className="text-center">
        <Link
          to="/interview"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block"
        >
          Join Interview
        </Link>
      </div>
    </div>
  )
}

function InterviewerDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Scheduled Interviews" count={5} />
        <DashboardCard title="Completed Interviews" count={15} />
        <DashboardCard title="Pending Feedback" count={2} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Interviews</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span>John Doe - Frontend Developer</span>
            <span className="text-gray-500">Today, 2:00 PM</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Jane Smith - UX Designer</span>
            <span className="text-gray-500">Tomorrow, 10:00 AM</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Mike Johnson - Backend Developer</span>
            <span className="text-gray-500">Mar 15, 11:30 AM</span>
          </li>
        </ul>
      </div>
      <div className="text-center">
        <Link
          to="/interview"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block"
        >
          Start Interview
        </Link>
      </div>
    </div>
  )
}

function DashboardCard({ title, count }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600">{count}</p>
    </div>
  )
}

export default Dashboard

