"use client";
 
import { useEffect, useState } from "react";
import CaseStudyCard from "./CaseStudyCard";

type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[] | string;
};

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/case-studies")
      .then((res) => res.json())
      .then((data) => setCaseStudies(data))
      .catch((error) =>
        console.log("Error fetching case studies:", error)
      );
  }, []);

  return (
    <section className="bg-slate-950 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
      
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Our Case Studies
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Explore our latest engineered platforms, applications, and modern digital solutions.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.slug || caseStudy.id}
              title={caseStudy.title}
              slug={caseStudy.slug}
              description={caseStudy.description}
              category={caseStudy.category}
              technologies={
                typeof caseStudy.technologies === "string"
                  ? JSON.parse(caseStudy.technologies)
                  : caseStudy.technologies
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}