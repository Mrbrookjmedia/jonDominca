import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import feedbackImage1 from "../assets/images/feedback1.jpg"
import feedbackImage2 from "../assets/images/feedback2.jpg"
import feedbackImage3 from "../assets/images/feedback3.jpg"
import feedbackImage4 from "../assets/images/feedback4.jpg"
import feedbackImage5 from "../assets/images/feedback5.jpg"


import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import Star from "./ui/Star"

const data = [
  {
    image: feedbackImage1,
    stars: 5,
    name: "Hollis Lucetta",
    feedback: "I purchased a formal shirt and denim jeans, and I must say, the fit is perfect! The material feels premium, and the pricing is reasonable. Loved the collection, especially the men's wear section. Highly satisfied!",
  },
  {
    image: feedbackImage2,
    stars: 4,
    name: "Ronald Richards",
    feedback: "The t-shirts and jackets I ordered are of great quality, and they feel super comfortable. However, I wish there were more size options for larger builds. Other than that, great shopping experience!",
  },
  {
    image: feedbackImage3,
    stars: 4.5,
    name: "Savannah Nguyen",
    feedback: "I was looking for trendy yet affordable outfits, and I’m so happy I found this site! Ordered a co-ord set, and it's exactly as shown in the pictures. Super comfortable and stylish! Highly recommend to all fashion lovers!",
  },
  {
    image: feedbackImage4,
    stars: 5,
    name: "Floyd Miles",
    feedback: "The quality and fit of the dresses are fantastic! The fabric feels soft and premium. However, my order took an extra 2 days to arrive. Still, I’m happy with the product and will shop again!",
  },
  {
    image: feedbackImage5,
    stars: 4.5,
    name: "Jennica Pen",
    feedback: "I absolutely love shopping from this website! The fabric quality is top-notch, and the styles are always trendy. I recently bought a floral maxi dress, and it fits perfectly! The delivery was quick, and the packaging was neat. Will definitely shop again!",
  },

]


export default function FeedbackCarosel() {

  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true })
  // )


  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({
        delay: 4000,
      }),]}
      className="w-full max-w-7xl h-auto max-h-96"


    >
      {/* <CarouselPrevious/> */}
      <CarouselContent >

        {data.map((ele, index) => (
          <CarouselItem key={index} className=" flex  justify-around items-center md:basis-[45%] lg:basis-1/3 ">
            <div className="p-1">

              {/*  main div for the feedback */}
              <div className="w-96 h-72 border-2 border-gray-500  b- flex flex-col m-5 p-5 gap-5 overflow-hidden   rounded-lg shadow-md ">
                
                
                <div className="flex  justify-between ">
                  <div className=" ">
                    <img src={ele.image} className=" rounded-sm h-20 w-20 " alt="" />
                  </div>
                  <Star star={ele.stars}  ></Star>
                </div>

                {/* div for name and feedback */}
                <div className="text-">
                  <p className="text-2xl mb-5" > {ele.name} </p>
                  <p className="text-[0.8rem] mb-5" >{ele.feedback}</p>
                </div>

              </div>

            </div>
          </CarouselItem>
        ))}



      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
