import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  )
}

function Hero() {
  return (
    <section className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
        Revolutionize Your Interview Process
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        IntervuX combines AI-powered insights with real-time collaboration to make your interviews more effective and
        efficient.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/pricing"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-300 transition duration-300"
        >
          View Pricing
        </Link>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { title: "AI-Powered Insights", description: "Get valuable feedback and analysis on candidate performance." },
    {
      title: "Real-Time Collaboration",
      description: "Work together seamlessly with integrated coding and whiteboard tools.",
    },
    { title: "Streamlined Scheduling", description: "Easily coordinate and manage interview schedules for your team." },
    { title: "Comprehensive Analytics", description: "Track and analyze your hiring process with detailed reports." },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="bg-indigo-600 text-white py-12 px-4 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Interviews?</h2>
      <p className="text-xl mb-8">Join thousands of companies already using IntervuX to hire the best talent.</p>
      <Link
        to="/signup"
        className="bg-white text-indigo-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
      >
        Start Your Free Trial
      </Link>
    </section>
  )
}

export default Home

