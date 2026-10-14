import Link from "next/link";

type CaseStudyCardProps = {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
};

export default function CaseStudyCard({
  title,
  slug,
  description,
  category,
  technologies,
}: CaseStudyCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-indigo-500/5">
      
      
      <div>
        <span className="inline-block text-xs font-semibold tracking-wider text-indigo-400 uppercase">
          {category || "Web Application"}
        </span>

        <Link href={`/case-studies/${slug}`}>
          <h3 className="mt-3 text-2xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>

      
      <div className="mt-8 pt-6 border-t border-slate-800/60">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Technologies
        </h4>
        
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies && technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/10"
            >
              {technology}
            </span>
          ))}
        </div>

        
        <Link 
          href={`/case-studies/${slug}`}
          className="inline-flex items-center text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors duration-200"
        >
          View Case Study
          <svg 
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          
        </Link>
      </div>
    </div>
  );
}