import { Truck, ShieldCheck, Clock } from 'lucide-react';

const benefits = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Free Shipping',
    description: 'On orders above ₹499',
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Secure Payment',
    description: '100% secure transactions',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'Easy Returns',
    description: '15-day return policy',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-lg border bg-white p-6 text-center"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                {benefit.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
