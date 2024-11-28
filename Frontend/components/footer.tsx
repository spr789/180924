import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">About Us</h3>
            <p className="text-sm">
              Discover our collection of handcrafted jewelry where tradition
              meets contemporary design.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping Info</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/necklaces">Necklaces</Link>
              </li>
              <li>
                <Link href="/earrings">Earrings</Link>
              </li>
              <li>
                <Link href="/rings">Rings</Link>
              </li>
              <li>
                <Link href="/bracelets">Bracelets</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@lumiere.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>
                Address: 123 Jewelry Lane,
                <br />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Lumière. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
