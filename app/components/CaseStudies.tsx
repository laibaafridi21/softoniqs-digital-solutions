 "use client";
 
 import {useEffect, useState}  from "react";
import CaseStudyCard from "./CaseStudyCard";

type CaseStudy= {
id: number;
title: string;
slug: string;
description: string;
category: string;
technologies: string [] | string;




}




export default function CaseStudies(){
const [caseStudies, setCaseStudies] =useState <CaseStudy[]> ([]);
useEffect(() => {
    fetch("http://localhost:5000/api/case-studies")
      .then((res) => res.json())
      .then((data) => setCaseStudies(data))
      .catch((error) =>
        console.log("Error fetching case studies:", error)
      );
  }, []);



return(
    <section className="py-20">
<h2 className="text-3xl font-bold mb-8 text-center"    >Our Case Studies</h2>
<div className ="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{caseStudies.map ((caseStudy) =>(
    <CaseStudyCard
    key={caseStudy.title}
    title={caseStudy.title}
    slug= {caseStudy.slug}
    description={caseStudy.description}
    category={caseStudy.category}
  
    technologies={
        typeof caseStudy.technologies === "string"
          ? JSON.parse(caseStudy.technologies)
          : caseStudy.technologies
      }
/>
)
)
}
</div>
    </section>
    
)

}


