"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, Clock, CheckCircle2, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const stats = [
  {
    title: "Total Requests",
    value: 12,
    icon: BarChart3,
    gradient: "from-sky-400 to-cyan-500",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Pending Approvals",
    value: 8,
    icon: Clock,
    gradient: "from-amber-400 to-orange-500",
    trend: "-5%",
    trendUp: false,
  },
  {
    title: "Payments Made",
    value: 15,
    icon: CheckCircle2,
    gradient: "from-emerald-400 to-teal-500",
    trend: "+23%",
    trendUp: true,
  },
  {
    title: "Total Amount",
    value: "₹45.2K",
    icon: TrendingUp,
    gradient: "from-violet-400 to-purple-500",
    trend: "+18%",
    trendUp: true,
  },
]

const transactionTrendData = [
  { date: "Mon", value: 2400, approved: 2000, pending: 400 },
  { date: "Tue", value: 3200, approved: 2600, pending: 600 },
  { date: "Wed", value: 2800, approved: 2200, pending: 600 },
  { date: "Thu", value: 3900, approved: 3200, pending: 700 },
  { date: "Fri", value: 4200, approved: 3600, pending: 600 },
  { date: "Sat", value: 2900, approved: 2400, pending: 500 },
  { date: "Sun", value: 3400, approved: 2800, pending: 600 },
]

const paymentStatusData = [
  { name: "Approved", value: 45, fill: "#10b981" },
  { name: "Pending", value: 30, fill: "#f59e0b" },
  { name: "Processing", value: 15, fill: "#0ea5e9" },
  { name: "Rejected", value: 10, fill: "#ef4444" },
]

const monthlyRevenueData = [
  { month: "Jan", revenue: 12000, target: 15000 },
  { month: "Feb", revenue: 14500, target: 15000 },
  { month: "Mar", revenue: 13200, target: 15000 },
  { month: "Apr", revenue: 16800, target: 15000 },
  { month: "May", revenue: 18200, target: 15000 },
  { month: "Jun", revenue: 17500, target: 15000 },
]

const recentActivity = [
  {
    id: 1,
    description: "Payment approved for Invoice #2024-001",
    amount: "₹2,500",
    timestamp: "2 hours ago",
    status: "approved",
  },
  {
    id: 2,
    description: "New request submitted by John Doe",
    amount: "₹1,200",
    timestamp: "4 hours ago",
    status: "pending",
  },
  {
    id: 3,
    description: "Payment processed for Invoice #2024-002",
    amount: "₹3,800",
    timestamp: "6 hours ago",
    status: "processing",
  },
  {
    id: 4,
    description: "Request rejected - Missing documentation",
    amount: "₹950",
    timestamp: "1 day ago",
    status: "rejected",
  },
  {
    id: 5,
    description: "Payment completed for Invoice #2024-003",
    amount: "₹2,100",
    timestamp: "1 day ago",
    status: "approved",
  },
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500">Welcome back! Here's your payment workflow overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6 bg-white hover:-translate-y-1 cursor-default">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trendUp ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                        <ArrowUp size={14} />
                        <span className="text-xs font-semibold">{stat.trend}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded-full">
                        <ArrowDown size={14} />
                        <span className="text-xs font-semibold">{stat.trend}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Trend Chart */}
        <Card className="lg:col-span-2 p-6 bg-white">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Transaction Trends</h2>
            <p className="text-gray-500 text-sm">Weekly transaction overview</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Status Pie Chart */}
        <Card className="p-6 bg-white">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Payment Status</h2>
            <p className="text-gray-500 text-sm">Distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
          <p className="text-gray-500 text-sm">Revenue vs Target</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "white", 
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            <Bar dataKey="target" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <p className="text-gray-500 text-sm">Latest transactions and requests</p>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-sky-50 hover:border-sky-100 transition-all duration-200"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">{activity.amount}</span>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    activity.status === "approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : activity.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : activity.status === "processing"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-red-100 text-red-700"
                  }`}
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
