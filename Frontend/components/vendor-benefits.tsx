import { Store, Users, TrendingUp, Shield } from 'lucide-react';

const benefits = [
  {
    icon: <Store className="h-6 w-6" />,
    title: 'Digital Storefront',
    description:
      'Get your own customizable store page to showcase your products',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Wide Reach',
    description: 'Access to millions of customers across India',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Growth Tools',
    description: 'Analytics and marketing tools to grow your business',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Payments',
    description: 'Reliable payment processing and fraud protection',
  },
];

export function VendorBenefits() {
  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-red-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">Why Join Us?</h2>
        <div className="space-y-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
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

      <div className="rounded-lg bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">Requirements</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
          <li>Valid business registration</li>
          <li>Quality product photographs</li>
          <li>Minimum inventory capacity</li>
          <li>Commitment to customer service</li>
        </ul>
      </div>
    </div>
  );
}
