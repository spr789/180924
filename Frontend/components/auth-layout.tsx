interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  gradientSide: "left" | "right"
}

export function AuthLayout({
  children,
  title,
  subtitle,
  gradientSide,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Gradient Side */}
        <div
          className={`relative hidden md:block ${
            gradientSide === "left" ? "order-first" : "order-last"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
            <div className="absolute inset-0 bg-[url('/auth-pattern.svg')] opacity-20" />
            <div className="relative h-full flex flex-col items-center justify-center text-white p-12">
              <div className="w-24 h-24 bg-white/20 rounded-full mb-8" />
              <h2 className="text-3xl font-bold text-center mb-4">
                Welcome to Kushals
              </h2>
              <p className="text-center text-white/80">
                Discover our exquisite collection of handcrafted jewelry where tradition meets contemporary design.
              </p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}