export default function Navbar() {
    return (
        <nav className="flex items-center  justify-between p-6 border-b">
            <div>
                <h1 className="text 2x1 font-bold">Softoniqs Digital Solutions</h1>
            </div>


            <div className="flex gap-6" >
                <a className="hover: text-blue-600 " href="/">Home</a>
                <a className="hover: text-blue-600" href="/services">Services</a>
                <a className="hover: text-blue-600" href="/case-studies"> Case Studies</a>
                <a className="hover: text-blue-600" href="/pricing">Pricing</a>
                <a className="hover: text-blue-600" href="/about"> About</a>
                <a className="hover: text-blue-600" href="/contact">Contact</a>
            </div>


            <div>
                <button className = "bg-blue-600 text-white px-5 px-2 rounded-lg hover: bg-blue-700"               >Get Started</button>
            </div>
        </nav>
    )
};