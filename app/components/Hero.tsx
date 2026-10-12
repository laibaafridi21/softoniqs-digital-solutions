   import Link from "next/link"
   export default function Hero(){
    return(
        <section className ="relative bg-slate-950 py-24 text-center px-6" >
            <div className="mx-auto max-w-4xl flex flex-col item-center justify-center " >
                <div>
<h1 className ="  text-4xl md:text-5;//xl  font-bold "  >Build Better Digital Solutions</h1>
<p className = "text-lg mb-4 max-w-xl mx-auto" >We build modern software solutions for growing businesses</p>
<div className = "flex justify-center gap-4">

<Link
href="/contact"
className = "bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"     >Contact Us </Link>
<Link
href="/services"
 className = "  px-5 py-2 rounded-lg   border border-blue-600 text-blue-600 hover:bg-blue-50">  View Services  </Link>
</div>

     </div>
<div  className="flex justify-center items-center"  >

</div>

     </div>
        </section>
    )
}