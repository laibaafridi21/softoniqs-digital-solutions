  
  
  import Link  from "next/link";
  export default function Navbar() {
    return (
        <nav className="flex items-center  justify-between p-6 border-b">
            <div>
                <h1 className="text 2xl font-bold">Softoniqs Digital Solutions</h1>
            </div>


            <div className="flex gap-6" >
                <a className="hover:text-blue-600 " href="/">Home</a>
                <a className="hover:text-blue-600" href="/services">Services</a>
                <a className="hover:text-blue-600" href="/case-studies"> Case Studies</a>
                <a className="hover:text-blue-600" href="/pricing">Pricing</a>
                <a className="hover:text-blue-600" href="/about"> About</a>
                <a className="hover:text-blue-600" href="/contact">Contact</a>
            </div>


            <div>
                <Link
                href="/contact"
                 className = "bg-blue-600 text-white px-5 py-2 rounded-lg hover: bg-blue-700"  >Get Started</Link>
            </div>
        </nav>
    )
};