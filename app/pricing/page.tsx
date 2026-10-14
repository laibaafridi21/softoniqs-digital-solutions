export default function Pricing() {
    return (
      <main  className="bg-slate-950 px-6 py-24 text-center min-h-screen text-white">
      <div className="mx-auto max-w-7xl">
        <h1    className="mb-16 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
         Pricing</h1>
        
  </div>
        <section  className="flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-900/40 p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900/60">                       

        <div>
          <h2    className="text-xl font-bold text-white mb-2"  >Basic Plan</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6" >For small projects and simple websites.</p>
          </div>

          <p  className="text-3xl font-extrabold text-blue-500 mt-4 border-t border-white/5 pt-4"  >$299</p>
        </section>
  
        <section  className="flex flex-col justify-between rounded-2xl border-2 border-blue-600 bg-slate-900/80 p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-blue-500/5 relative" >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </span>

          <div>
          <h2 className="text-xl font-bold text-white mb-2 "  >Professional Plan</h2>
          <p  className="text-sm text-slate-400 leading-relaxed mb-6" >For growing businesses and advanced websites.</p>
          </div>
          <p   className="text-3xl font-extrabold text-blue-400 mt-4 border-t border-white/5 pt-4"  >$599</p>
        </section>
  
        <section  className="flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-900/40 p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900/60"  >

          <div>
          <h2 className="text-xl font-bold text-white mb-2"  >Enterprise Plan</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6" >For larger businesses and custom software solutions.</p>
          </div>
          <p className="text-xl font-bold text-slate-300 mt-4 border-t border-white/5 pt-4 " >Contact us for pricing.</p>
        </section>
      </main>
    );
  }