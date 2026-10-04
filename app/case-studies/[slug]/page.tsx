 import Link from "next/link"
 import caseStudies from "../caseStudies";
 
 
 export default async function CaseStudyPage({
    params,
}: {
params : Promise <{slug: string}>
}) {
const {slug} = await params;
const caseStudy = caseStudies.find(
(caseStudy) => caseStudy.slug === slug
);
 if (!caseStudy) {
    return <h1>One case study not found</h1>
 }
return(
    <main className="max-w-4xl mx-auto px-6 py-16" >
        <h1 className="text-4xl font-bold mb-4">{caseStudy.title}</h1>
        <p className="text-lg text-gray-600 mb-6  " >{caseStudy.description}</p>
        <p className="inline-block bg-gray-500  px-4 py-2 rounded-full text-sm mb-8 text-black-600"   >{caseStudy.category}</p>
        <h2   className="text-2xl font-bold mb-4" >Technologies</h2>
        <ul   className="flex flex-wrap gap-3"   >
           { caseStudy.technologies.map((technology) => (
            <li key={technology}   className="bg-gray-100 text-gray-500  px-4 py-2 rounded-md"      >{technology}</li>
           )

           )} 
        </ul>
        <Link
  href="/case-studies"
  className="inline-block mt-8 text-blue-600 hover:underline"
>
  ← Back to Case Studies
</Link>
    </main>
)
};