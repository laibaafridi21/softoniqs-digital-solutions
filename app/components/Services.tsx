  "use client" ;
  import{useEffect, useState} from "react";
   import ServiceCard from "./ServiceCard";


   type Service = {
    id: number;
    title: string;
    description: string;
    features: string[] | null;
    technologies: string[] | null;
    price: string | null;

   }
  
  
  export default function Services(){

    const [services, setServices] = useState<Service[]>([]);

useEffect(() => {
    fetch("http://localhost:5000/api/services")
 .then((res)  => res.json () )
 .then((data) => setServices(data) )
 .catch((error)  => console.log ("Error fetching services:" , error)  );


}, []);



    return( 
<section   className="py-20 text-center ">
    <h2 className="text-3xl font-bold mb-4"    >Our Services</h2>
    <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{services.map((service) => (
    <ServiceCard 
key={service.id}
title={service.title}
description={service.description}
features={ service.features ??[]}
technologies={service.technologies ??[]}
price={service.price ?? ""}
/>
    
)
)}

</div>

</section>


    )
}