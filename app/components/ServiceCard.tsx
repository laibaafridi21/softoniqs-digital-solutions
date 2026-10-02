   type ServiceCardProps={
    title : string;
    description : string;
    features : string[];
    technologies : string[];
    price: string;

   } ;
    
    
    
    export default function ServiceCard(
        {title ,
         description ,
          features,
          technologies,
          price,
        }: ServiceCardProps)
        {
    return(
<div   className ="border text-left rounded-xl p-6 hover:shadow-lg"                  >
    <h3  className="text-xl font-semibold mb-2">{title }</h3>
    <p className="mb-4 text-gray-600"         >{description}</p>
    <ul  className="space-y-2 text-gray-600"     >{features.map((feature)  => (
        <li key = {feature}>{feature}</li>

    )

    )
    }
    </ul >
    <h4  className="text-sm font-semibold  mt-6 mb-2  "
    >Technologies</h4>
    <div>
        {technologies.map((technology) => (
            <span key={technology}  className="inline-block bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm"
                      >{technology}</span>
        )
        )}
    </div>
<p className=" text-lg font-semibold text-blue-600 mt-6">{price}</p>
</div>
    )
};