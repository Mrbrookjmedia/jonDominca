import { BsFacebook, BsGithub, BsInstagram, BsTwitter, BsPlus, BsDash } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const categories = ["Bags", "Shoes", "Apparel", "Accessories"];

    const handleSubscribe = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/newsletter/subscribe`, { email });
          setMessage(response.data.message);
          setEmail(""); // Clear input field after successful subscription
        } catch (error) {
          setMessage(error.response?.data?.message || "Something went wrong");
        }
      };


    return (
        <section className="py-10 bg-[#2f342f] sm:pt-16 lg:pt-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

                {/* Footer Sections */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6">

                    {/* Need Help */}
                    <div>
                        <p className="text-lg font-bold tracking-wider text-white uppercase">Need Help</p>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Contact Us</Link></li>
                            <li><Link to="/user-dash" className="text-sm text-white hover:text-blue-500">Track Order</Link></li>
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Returns & Refunds</Link></li>
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="text-lg font-bold tracking-wider text-white uppercase">Company</p>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/about" className="text-sm text-white hover:text-blue-500">About Us</Link></li>
                            <li><Link to="/blog" className="text-sm text-white hover:text-blue-500">Blog</Link></li>
                        </ul>
                    </div>

                    {/* More Info */}
                    <div>
                        <p className="text-lg font-bold tracking-wider text-white uppercase">More Info</p>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Terms & Conditions</Link></li>
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Privacy Policy</Link></li>
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Shipping Policy</Link></li>
                            <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Site Map</Link></li>
                        </ul>
                    </div>

                   {/* Newsletter Subscription */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <p className="text-lg font-bold tracking-wider text-white uppercase">Newsletter</p>
          <form className="mt-4" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 text-black placeholder-gray-500 bg-white border rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="w-full mt-3 p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </form>
          {message && <p className="mt-2 text-sm text-white">{message}</p>}
        </div>
                </div>

                {/* Social Icons */}
                <div className="mt-8 flex justify-center space-x-6">
                    <a href="#"><BsFacebook size={24} color="white" /></a>
                    <a href="#"><BsInstagram size={24} color="white" /></a>
                    <a href="#"><BsGithub size={24} color="white" /></a>
                    <a href="#"><BsTwitter size={24} color="white" /></a>
                </div>

                <hr className="mt-8 border-gray-500" />

                {/* Product Categories Section */}
                <div className="p-4 bg-[#2f342f] shadow-md mt-6">
                    <div
                        className="flex items-center justify-between cursor-pointer text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <h3 className="text-lg font-semibold">Product Categories</h3>
                        {isOpen ? <BsDash className="text-xl text-gray-300" /> : <BsPlus className="text-xl text-gray-300" />}
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3"
                            >
                                <ul className="space-y-2">
                                    {categories.map((category, index) => (
                                        <li key={index} className="text-sm p-2 bg-[#2f342f] rounded-md text-white hover:bg-[#252a25]">
                                     <Link to="/shop">     {category} </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Copyright Section */}
                <p className="text-sm text-center text-white mt-6">© 2025 Jon Dominica. All Rights Reserved.</p>

            </div>
        </section>
    );
}

export default Footer;





// import { BsFacebook, BsGithub, BsInstagram, BsTwitter, BsPlus, BsDash } from "react-icons/bs";
// import { Link } from 'react-router-dom';
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";

// function Footer() {
//     const [isOpen, setIsOpen] = useState(false);

//     const categories = ["Bags", "Shoes", "Apparel", "Accessories"];

//     return (
//         <section className="py-10 bg-[#2f342f] sm:pt-16 lg:pt-20">
//             <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

//                 {/* Footer Sections */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6">

//                     {/* Need Help */}
//                     <div>
//                         <p className="text-lg font-bold tracking-wider text-white uppercase">Need Help</p>
//                         <ul className="mt-4 space-y-3">
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Contact Us</Link></li>
//                             <li><Link to="/user-dash" className="text-sm text-white hover:text-blue-500">Track Order</Link></li>
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Returns & Refunds</Link></li>
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">FAQs</Link></li>
//                         </ul>
//                     </div>

//                     {/* Company */}
//                     <div>
//                         <p className="text-lg font-bold tracking-wider text-white uppercase">Company</p>
//                         <ul className="mt-4 space-y-3">
//                             <li><Link to="/about" className="text-sm text-white hover:text-blue-500">About Us</Link></li>
//                             <li><Link to="/blog" className="text-sm text-white hover:text-blue-500">Blog</Link></li>
//                         </ul>
//                     </div>

//                     {/* More Info */}
//                     <div>
//                         <p className="text-lg font-bold tracking-wider text-white uppercase">More Info</p>
//                         <ul className="mt-4 space-y-3">
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Terms & Conditions</Link></li>
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Privacy Policy</Link></li>
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Shipping Policy</Link></li>
//                             <li><Link to="/support" className="text-sm text-white hover:text-blue-500">Site Map</Link></li>
//                         </ul>
//                     </div>

//                     {/* Newsletter Subscription */}
//                     <div className="col-span-2 md:col-span-3 lg:col-span-2">
//                         <p className="text-lg font-bold tracking-wider text-white uppercase">Newsletter</p>
//                         <form className="mt-4">
//                             <input type="email" placeholder="Enter your email"
//                                 className="w-full p-3 text-black placeholder-gray-500 bg-white border rounded-md focus:outline-none focus:border-blue-500" />
//                             <button className="w-full mt-3 p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
//                                 Subscribe
//                             </button>
//                         </form>
//                     </div>
//                 </div>

//                 {/* Social Icons */}
//                 <div className="mt-8 flex justify-center space-x-6">
//                     <a href="#"><BsFacebook size={24} color="white" /></a>
//                     <a href="#"><BsInstagram size={24} color="white" /></a>
//                     <a href="#"><BsGithub size={24} color="white" /></a>
//                     <a href="#"><BsTwitter size={24} color="white" /></a>
//                 </div>

//                 <hr className="mt-8 border-gray-500" />

//                 {/* Product Categories Section */}
//                 <div className="p-4 bg-[#2f342f] shadow-md mt-6">
//                     <div
//                         className="flex items-center justify-between cursor-pointer text-white"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         <h3 className="text-lg font-semibold">Product Categories</h3>
//                         {isOpen ? <BsDash className="text-xl text-gray-300" /> : <BsPlus className="text-xl text-gray-300" />}
//                     </div>

//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="mt-3"
//                             >
//                                 <ul className="space-y-2">
//                                     {categories.map((category, index) => (
//                                         <li key={index} className="text-sm p-2 bg-[#2f342f] rounded-md text-white hover:bg-[#252a25]">
//                                      <Link to="/shop">     {category} </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Copyright Section */}
//                 <p className="text-sm text-center text-white mt-6">© 2025 Jon Dominica. All Rights Reserved.</p>

//             </div>
//         </section>
//     );
// }

// export default Footer;
