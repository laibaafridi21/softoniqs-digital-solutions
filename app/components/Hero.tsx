   import Link from "next/link"
   export default function Hero(){
    return(
        <section className ="relative overflow-hidden bg-slate-950 px-6 py-28 md:py-36 text-center" >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%">
 
            <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center">

                <div  className="space-y-6"   >
<h1 className =" bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">Build Better Digital Solutions</h1>
<p className = "mx-auto max-w-xl text-lg text-slate-400 md:text-xl leading-relaxed" >We build modern software solutions for growing businesses</p>
<div className = "flex flex-wrap justify-center gap-4 pt-4">

<Link
href="/contact"
className = "rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-600/30 hover:-translate-y-0.5"   >Contact Us </Link>
<Link
href="/services"
 className = " rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3 font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:-translate-y-0.5">  View Services  </Link>
</div>

     </div>
<div  className="flex justify-center items-center"  >

</div>

     </div>
     </div>
        </section>
    )
}