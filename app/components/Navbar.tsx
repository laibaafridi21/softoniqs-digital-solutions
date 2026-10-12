import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4">
        
        
        <div className="flex-shrink-0">
          <Link href="/">
            <h1 className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors duration-200">
              Softoniqs Digital Solutions<span className="text-blue-500">.</span>
            </h1>
          </Link>
        </div>

    
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
            Services
          </Link>
          <Link href="/case-studies" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
            Case Studies
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
            Contact
          </Link>
          

        </div>

    
        <div className="flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-500 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-600/10 whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  )
};