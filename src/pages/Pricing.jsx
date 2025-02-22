import { Link } from "react-router-dom"

function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: ["Up to 5 interviews per month", "Basic coding editor", "Limited AI insights"],
    },
    {
      name: "Pro",
      price: "$29.99",
      features: [
        "Unlimited interviews",
        "Advanced coding editor",
        "Full AI-powered insights",
        "Interactive whiteboard",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["All Pro features", "Dedicated support", "Custom integrations", "Team management"],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white p-6 rounded-lg shadow-md ${plan.highlighted ? "border-2 border-indigo-600" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold text-indigo-600 mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/signup"
              className={`w-full text-center block py-2 px-4 rounded font-semibold ${
                plan.highlighted
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition duration-300`}
            >
              {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing

