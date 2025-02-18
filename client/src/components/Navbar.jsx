// import logo from "../assets/images/Euphoria.png";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { twMerge } from "tailwind-merge";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import { IoMenu as MenuIcon } from "react-icons/io5";
// import { FaRegUser as ProfileIcon } from "react-icons/fa6";
// import { PiShoppingCart as CartIcon } from "react-icons/pi";
// import { RxCross1 as CrossIcon } from "react-icons/rx";

// const navitems = [
//   { itemname: "Home", path: "/" },
//   { itemname: "Shop", path: "/shop" },
//   { itemname: "Collection", path: "/collections" },
//   { itemname: "AI-Personalization", path: "/aipage" },
//   { itemname: "Blogs", path: "/blogs" },
//   { itemname: "About", path: "/about" },
//   { itemname: "Support", path: "/support" },
// ];

// const containerVariants = {
//   close: { x: "100%", transition: { type: "spring", damping: 15, duration: 0.5 } },
//   open: { x: 0, transition: { type: "spring", damping: 15, duration: 0.5 } },
// };

// const Navbar = () => {
//   const { currentUser, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//   }, [isOpen]);

//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   return (
//     <div className="overflow-hidden sticky top-0 z-20 bg-white">
//       <div className="w-full bg-orange">
//         {/* Top Navbar */}
//         <div className="flex justify-between items-center p-4 lg:px-12 sm:px-6">
//           {/* Logo */}
//           <Link to="/">
//             <img src={logo} className="ml-8 " alt="Euphoria" />
//           </Link>

//           {/* Icons */}
//           <div className="flex gap-4 items-center">
//             <ProfileIcon className="cursor-pointer" onClick={() => navigate("/user-dash")} />
//             <CartIcon className="cursor-pointer text-xl" onClick={() => navigate("/cart")} />
//             <button className="pl-4">
//               {currentUser ? (
//                 <button
//                   className="border border-dark text-dark w-full px-4 py-1"
//                   onClick={() => logout()}
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link className="border border-dark text-dark w-full px-4 py-1" to="/login">
//                   Login
//                 </Link>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="border-y border-purple flex sm:hidden justify-between px-4 py-2">
//           <button onClick={toggleMenu}>
//             {isOpen ? <CrossIcon size={24} /> : <MenuIcon size={24} />}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden sm:flex justify-center bg-orange p-2 border-y border-dark">
//           {navitems.map(({ itemname, path }, index) => (
//             <Link className={twMerge("hover:text-gray-900 px-4")} key={index} to={path}>
//               {itemname}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           variants={containerVariants}
//           initial="close"
//           animate="open"
//           exit="close"
//           className="fixed top-0 right-0 z-30 w-3/4 h-full bg-orange border-l border-dark flex flex-col items-center justify-center gap-5 text-xl text-black"
//         >
//           {navitems.map(({ itemname, path }, index) => (
//             <Link className="hover:text-gray-900" key={index} to={path} onClick={toggleMenu}>
//               {itemname}
//             </Link>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import logo from "../assets/images/Euphoria.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { IoMenu as MenuIcon } from "react-icons/io5";
import { FaRegUser as ProfileIcon } from "react-icons/fa6";
import { PiShoppingCart as CartIcon } from "react-icons/pi";
import { RxCross1 as CrossIcon } from "react-icons/rx";

const navitems = [
  { itemname: "Home", path: "/" },
  { itemname: "Shop", path: "/shop" },
  { itemname: "Collection", path: "/collections" },
  { itemname: "AI-Personalization", path: "/aipage" },
  { itemname: "Blogs", path: "/blogs" },
  { itemname: "About", path: "/about" },
  { itemname: "Support", path: "/support" },
];

const containerVariants = {
  close: { x: "100%", transition: { type: "spring", damping: 15, duration: 0.5 } },
  open: { x: 0, transition: { type: "spring", damping: 15, duration: 0.5 } },
};

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="overflow-hidden sticky top-0 z-20 bg-white shadow-md">
      <div className="w-full bg-orange">
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-3 lg:px-12 sm:px-6">
          {/* Logo */}
          <Link to="/" className="ml-8">
            <img src={logo} alt="Euphoria" className="w-32 sm:w-40" />
          </Link>

          {/* Icons */}
          <div className="flex gap-4 items-center sm:mr-10">
            <ProfileIcon className="cursor-pointer text-xl" onClick={() => navigate("/user-dash")} />
            <CartIcon className="cursor-pointer text-xl" onClick={() => navigate("/cart")} />

            {currentUser ? (
              <button
                className="border border-dark text-dark px-4 py-1 rounded-md hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link
                className="border border-dark text-dark px-4 py-1 rounded-md hover:bg-gray-200"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (VISIBLE ONLY ON SMALL SCREENS) */}
        <div className="border-y border-purple sm:hidden flex justify-between px-4 py-2">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <CrossIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Desktop Menu (VISIBLE ONLY ON LARGER SCREENS) */}
        <div className="hidden sm:flex justify-center bg-orange p-2 border-y border-dark">
          {navitems.map(({ itemname, path }, index) => (
            <Link
              className={twMerge("hover:text-blue-700  lg:py-3 lg:rounded-lg lg:p-1 px-4 sm:text-2xl lg:mr-8 lg:text-xl transition duration-300")}
              key={index}
              to={path}
            >
              {itemname}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu (VISIBLE ONLY WHEN isOpen IS TRUE) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="close"
            animate="open"
            exit="close"
            className="fixed top-0 right-0 z-30 w-3/4 h-full bg-orange border-l border-dark flex flex-col items-center justify-center gap-5 text-xl text-black shadow-lg sm:hidden"
          >
            {navitems.map(({ itemname, path }, index) => (
              <Link
                className="hover:text-gray-900 transition duration-300"
                key={index}
                to={path}
                onClick={toggleMenu}
              >
                {itemname}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
