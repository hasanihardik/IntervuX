import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Users, Brain, Calendar } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">The Ultimate Interview Platform</h1>
          <p className="text-xl text-muted-foreground">
            Conduct seamless technical interviews with live coding, whiteboard collaboration, and AI-driven insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Code2 className="h-10 w-10" />}
              title="Live Coding"
              description="Real-time collaborative code editor with syntax highlighting and multiple language support."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Video Conferencing"
              description="Crystal clear video calls with screen sharing and virtual whiteboard."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10" />}
              title="AI Insights"
              description="Get intelligent feedback and analysis of interview performance."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Smart Scheduling"
              description="Effortlessly coordinate interviews across different time zones."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Transform Your Interview Process?</h2>
          <p className="text-lg opacity-90">
            Join thousands of companies that trust IntervuX for their technical interviews.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

