// import React from "react";

// export default function SearchBar({ value, onSearch }) {
//   return (
//     <div className="mb-6">
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onSearch(e.target.value)}
//         placeholder="Search products..."
//         className="w-full p-2 border border-gray-300 rounded-lg"
//       />
//     </div>
//   );
// }


export default function SearchBar({ value, onSearch }) {
  return (
    <div className="mb-6 relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <svg 
        className="absolute right-3 top-3 h-6 w-6 text-gray-400"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </div>
  );
}
