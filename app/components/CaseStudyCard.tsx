  import Link from "next/link";
  
  
  type CaseStudyCardProps={
    title: string;
    slug : string;
    description: string;
    category: string;
    technologies:string [];

};
export default function CaseStudyCard(
 {title,
    slug,
description,
category,
technologies,


 }: CaseStudyCardProps )
 {
    return(
        <div className="border rounded-lg p-6 shadow-sm">


            <Link href ={`/case-studies/${slug}`}>
            <h3   className="text-xl font-bold mb-2 ">{title}</h3>
            </Link>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500 mb-4">{category}</p>


            <h4 className="font-semibold mb-2">Technologies</h4>
            <ul>
             
                {technologies.map ((technology)  =>(
                <li  key={technology} className="text-sm text-gray-600"   >{technology}
                </li>
            )
            )
            }</ul>
        </div>
    )
 }