import caseStudies from "../case-studies/caseStudies";
import CaseStudyCard from "./CaseStudyCard";

export default function CaseStudies(){
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
    technologies={caseStudy.technologies}
/>
)
)
}
</div>
    </section>
    
)

}


