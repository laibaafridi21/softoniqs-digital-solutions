  import ServiceCard from "./ServiceCard";
  
  
  export default function Services(){
    return(
<section   className="py-20 text-center ">
    <h2 className="text-3xl font-bold mb-4"    >Our Services</h2>
    <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<ServiceCard title="Web Development"
description = "We build modern, responsive websites and web applications for businesses."
features= {[
    "Responsive Design",
    "SEO Friendly",
    "Modern Technologies",
]}
technologies={[
    "React",
    "Next.js",
    "Node.js",
]
}
price ="Starting at 499$"
/>


<ServiceCard title="App Development"
description="We build modern, user-friendly mobile applications for businesses."
features={[
"Cross platform",
    "Responsive UI ",
    "Good Performence",
]}
technologies={[
    "React Native",
    "Flutter",
    "Node.js",
]}
price="Starting at $799"

/>

<ServiceCard title="UI/UX Design"
description="We create clean, intuitive, and engaging designs that provide a great user experience across all devices."
features={[
    "User Research",
    "Wireframing",
    "Responsive Design",
]}
technologies={[
    "Figma",
    "Adobe XD",
    "FigJam",
]}
price="Starting at $399"

/>




</div>

</section>


    )
}