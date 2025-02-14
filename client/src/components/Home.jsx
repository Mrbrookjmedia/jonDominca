import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import 'bootstrap-icons/font/bootstrap-icons.css';




import featureImage1 from "../assets/images/featured1.png"
import featureImage2 from "../assets/images/featured2.png"


import EverydayfashionBanner from "./EverdayFashionBanner";
import ProductCard from "./ProductCard";
import FeedbackCarosel from "./FeedbackCarousel";
import NewArrivalFinal from "./NewArrivalFinal"

import Star from "./ui/Star";
import BigSavingZone from "./BigSavingZone";

function Home() {
    return (
        <section className=" ">
            <Banner> </Banner>

            {/* freatured content */}
            <div className="w-full h-96 overflow-hidden md:mb-10">

                <div className="featured_content mt-20 mb-20 flex md:ml-20  md:gap-8 w-full h-[500px] lg:ml-28 lg:gap-16   ">

                    {/* First Featured Content */}

                    <div className="rounded-lg relative w-[40%] h-[70%]">
                        <div className="absolute inset-0 z-[-1]">
                            <img src={featureImage1} alt="" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className=" rounded-lg absolute inset-0 z-[1] bg-gradient-to-r from-gray-700 to-transparent ">

                        </div>
                        <div className="absolute inset-0 flex items-center justify-start z-[2] pl-5">
                            <h1 className="text-white font-bold text-4xl  px-4 py-2 rounded-md">
                                "Winter Luxe <br /> Stay Chic in the Chill"
                            </h1>
                        </div>
                    </div>

                    {/* Second Featured Content */}

                    <div className="rounded-2xl relative w-[40%] h-[70%]">
                        <div className="absolute inset-0 z-[-1]">
                            <img src={featureImage2} alt="" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className=" rounded-lg absolute inset-0 z-[1] bg-gradient-to-r from-gray-700 to-transparent ">

                        </div>

                        <div className="absolute inset-0 flex items-center justify-start z-[2] pl-5">
                            <h1 className="text-white font-bold text-3xl  px-4 py-2 rounded-md">
                                The Eterna Collection—luxury handbags crafted with sustainable materials
                            </h1>
                        </div>
                    </div>
                </div>

            </div>



  





            {/* featured content ends here */}


            {/* new arrival section */}

            <div className="  h-auto  ">  <Link to="/shop">
                <h1 className="  ml-24 font-bold text-2xl">
                    Shop Our Latest Collection
                    <i className="bi bi-arrow-right ml-2 text-blue-600 "></i>
                </h1>

                {/*div containing the cards and the arrows for product  */}

                <div className=" flex h-full justify-evenly">
                    {/* left arrow */}
                    <div className="flex items-center justify-center ">
                        <i className="bi bi-arrow-left "></i>
                    </div>

                    {/* CARDs */}

                    <div className=" flex overflow-hidden w-[90%]">
                        <NewArrivalFinal></NewArrivalFinal>
                    </div>
                    {/* right arrow */}
                    <div className=" flex items-center justify-center">
                        <i className="bi bi-arrow-right "></i>
                    </div>

                </div>
                </Link>
            </div>

            {/* new arrival section ends here */}

            {/* Big Saving Zone */}
           <Link to= "/shop"> <BigSavingZone></BigSavingZone> </Link>

            {/* Big Saving Zone ends here */}



            {/* Everyday fashion banner */}

            <EverydayfashionBanner></EverydayfashionBanner>


            {/* Everyday fashion banner ends here */}

            {/* products */}
            <div className=" m-16 h-auto   ">
                <h1 className="  ml-24  font-bold text-2xl ">
                    In The Limelight
                    <i className="bi bi-arrow-right ml-2 text-blue-600 "></i>
                </h1>

                {/*div containing the cards and the arrows for product  */}

                <div className=" flex h-full justify-evenly">
                    {/* left arrow */}
                    <div className="flex items-center justify-center ">
                        <i className="bi bi-arrow-left "></i>
                    </div>

                    {/* CARDs */}

                    <div className=" flex overflow-hidden w-[90%] md:ml-24">
                        <Link to="/collections"><ProductCard></ProductCard></Link>
                    </div>
                    {/* right arrow */}
                    <div className=" flex items-center justify-center">
                        <i className="bi bi-arrow-right "></i>
                    </div>

                </div>

            </div>



            {/* Feedback carousel */}

            <h1 className="  ml-36 mb-10 font-bold text-2xl">
                Feedback
                <i className="bi bi-arrow-right ml-2 text-blue-600 "></i>
            </h1>

            <div className=" flex items-center justify-center w-full mb-10 overflow-hidden" >
                <FeedbackCarosel> </FeedbackCarosel>
            </div>



        </section>

    )
}
export default Home;
