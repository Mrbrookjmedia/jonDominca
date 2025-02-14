
import imgShop2 from "../assets/images/imgShop2.png";
import imgShop3 from "../assets/images/imgShop3.png";
import imgShop7 from "../assets/images/imgShop7.png";
import imgShop13 from "../assets/images/imgShop13.png";


const products = [
    {
      id: 1,
      name: 'Bags',
      href: '#',
      imageSrc: imgShop2 ,
      imageAlt: "Front of men's Basic Tee in black.",
      
    },
    {
      id: 2,
      name: 'shoes',
      href: '#',
      imageSrc: imgShop3,
      imageAlt: "Front of men's Basic Tee in black.",
      
    },
    {
      id: 3,
      name: 'Apparel',
      href: '#',
      imageSrc: imgShop7,
      imageAlt: "Front of men's Basic Tee in black.",
      
    },
    {
      id: 4,
      name: 'Accessoreis',
      href: '#',
      imageSrc: imgShop13,
      imageAlt: "Front of men's Basic Tee in black.",
      
    },
    // More products...
  ]
  
  export default function NewArrivalFinal() {
    return (
      <div className="bg-white">
        <div 
        style={{ paddingTop: '50px' }}
         className="mx-auto max-w-4xl px-4  sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          
  
          <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-[400px] rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-center items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 ">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    )
  }
  