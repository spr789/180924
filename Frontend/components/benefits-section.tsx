import { Truck, ShieldCheck, Clock } from "lucide-react"

const benefits = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Free Shipping",
    description: "On orders above ₹499",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Easy Returns",
    description: "15-day return policy",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-lg border bg-white"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}