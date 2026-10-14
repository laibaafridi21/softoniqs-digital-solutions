export default function About() {
    return (
      <main className="bg-slate-950 min-h-screen py-20 px-4 sm:px-6 lg:px-8 text-slate-100 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
        
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase block">
                Our Agency
              </span>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
                About Softoniqs <span className="text-indigo-400">Digital Solutions</span>
              </h1>
              
              <p className="text-lg leading-relaxed text-slate-400 max-w-xl">
                We are a digital solutions company focused on building modern websites and software applications.
              </p>
  
              
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Our Focus</h3>
                  <p className="text-xs text-slate-400 mt-1">High Performance & Scalability</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Our Tech</h3>
                  <p className="text-xs text-slate-400 mt-1">Modern JavaScript Stack</p>
                </div>
              </div>
            </div>
  
            
            <div className="relative group w-full">
            
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl transition duration-500 group-hover:opacity-30"></div>
              
            
              <div className="relative aspect-video lg:aspect-square w-full rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950 flex flex-col items-center justify-center p-8 text-center transition duration-500 group-hover:border-slate-700">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-300">Visual Graphic Slot</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">This area is ready for your image component whenever you want to insert it.</p>
              </div>
            </div>
  
          </div>
  
        </div>
      </main>
    );
  }