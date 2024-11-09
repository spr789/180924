import { Store, Users, TrendingUp, Shield } from "lucide-react"

const benefits = [
  {
    icon: <Store className="w-6 h-6" />,
    title: "Digital Storefront",
    description: "Get your own customizable store page to showcase your products",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Wide Reach",
    description: "Access to millions of customers across India",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Growth Tools",
    description: "Analytics and marketing tools to grow your business",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Reliable payment processing and fraud protection",
  },
]

export function VendorBenefits() {
  return (
    <div className="space-y-8">
      <div className="bg-red-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Why Join Us?</h2>
        <div className="space-y-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-medium">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          <li>Valid business registration</li>
          <li>Quality product photographs</li>
          <li>Minimum inventory capacity</li>
          <li>Commitment to customer service</li>
        </ul>
      </div>
    </div>
  )
}