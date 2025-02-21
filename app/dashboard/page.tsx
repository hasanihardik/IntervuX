import type React from "react"
import { Card } from "@/components/ui/card"
import { Calendar, Code2, Users, Clock, TrendingUp, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Upcoming Interviews"
            value="5"
            icon={<Calendar className="h-6 w-6" />}
            description="Scheduled for this week"
          />
          <StatsCard
            title="Completed Interviews"
            value="12"
            icon={<CheckCircle className="h-6 w-6" />}
            description="In the last 30 days"
          />
          <StatsCard
            title="Average Duration"
            value="45m"
            icon={<Clock className="h-6 w-6" />}
            description="Per interview"
          />
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="grid gap-4">
            <ActivityItem
              icon={<Code2 className="h-5 w-5" />}
              title="Technical Interview with John Doe"
              time="2 hours ago"
              description="Frontend Developer position"
            />
            <ActivityItem
              icon={<Users className="h-5 w-5" />}
              title="System Design Discussion with Jane Smith"
              time="Yesterday"
              description="Senior Backend Engineer role"
            />
            <ActivityItem
              icon={<TrendingUp className="h-5 w-5" />}
              title="Performance Review Meeting"
              time="2 days ago"
              description="Quarterly team assessment"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-muted-foreground">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

function ActivityItem({
  icon,
  title,
  time,
  description,
}: {
  icon: React.ReactNode
  title: string
  time: string
  description: string
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <div className="flex-1 space-y-1">
          <p className="font-medium">{title}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{time}</span>
            <span className="mx-2">•</span>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

