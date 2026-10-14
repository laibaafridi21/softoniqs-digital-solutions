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
 
 .then((data) => {
    if (Array.isArray(data)) {
      setServices(data);
    } else {
      console.error("Services API error:", data);
    }
  })

 .catch((error)  => console.log ("Error fetching services:" , error)  );


}, []);



    return( 
<section   className="bg-slate-950 px-6 py-24 text-center ">

        
    <h2 className="mb-12 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl"    >Our Services</h2>
    <div className= "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

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