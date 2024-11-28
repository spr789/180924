interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  gradientSide: 'left' | 'right';
}

export function AuthLayout({
  children,
  title,
  subtitle,
  gradientSide,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
        {/* Gradient Side */}
        <div
          className={`relative hidden md:block ${
            gradientSide === 'left' ? 'order-first' : 'order-last'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
            <div className="absolute inset-0 bg-[url('/auth-pattern.svg')] opacity-20" />
            <div className="relative flex h-full flex-col items-center justify-center p-12 text-white">
              <div className="mb-8 h-24 w-24 rounded-full bg-white/20" />
              <h2 className="mb-4 text-center text-3xl font-bold">
                Welcome to Kushals
              </h2>
              <p className="text-center text-white/80">
                Discover our exquisite collection of handcrafted jewelry where
                tradition meets contemporary design.
              </p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12">
          <div className="mx-auto max-w-sm">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
