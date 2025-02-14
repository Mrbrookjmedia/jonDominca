
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { categories, featuredPosts, latestPosts } from '../data/data';

// const CategoryPage = () => {
//   const { categorySlug } = useParams();
//   const [category, setCategory] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategoryData = () => {
//       setIsLoading(true);
//       const foundCategory = categories.find(cat => cat.slug === categorySlug);
//       if (foundCategory) {
//         setCategory(foundCategory);
//         const categoryPosts = [...featuredPosts, ...latestPosts].filter(post => post.category === categorySlug);
//         setPosts(categoryPosts);
//       }
//       setIsLoading(false);
//     };

//     fetchCategoryData();
//   }, [categorySlug]);

//   if (isLoading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!category) {
//     return <div className="text-center py-10">Category not found</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-serif mb-6">{category.name}</h1>
//       <p className="text-gray-600 mb-8">{category.description}</p>
      
//       <div className="grid md:grid-cols-2 gap-8">
//         {posts.map(post => (
//           <article key={post.slug} className="bg-gray-50 p-6 rounded-xl">
//             <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
//             <p className="text-gray-600 mb-4">{post.excerpt}</p>
//             <Link 
//               to={`/blog/post/${post.slug}`}
//               className="text-black font-medium hover:underline"
//             >
//               Read Article →
//             </Link>
//           </article>
//         ))}
//       </div>
      
//       {posts.length === 0 && (
//         <p className="text-center text-gray-600">No posts found in this category.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, featuredPosts, latestPosts, fashionTrendsData, stylingTipsData, behindTheScenesData, designerDialoguesData } from '../data/data';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = () => {
      setIsLoading(true);
      const foundCategory = categories.find(cat => cat.slug === categorySlug);
      
      if (foundCategory) {
        setCategory(foundCategory);
        
        let categoryPosts;
        switch(categorySlug) {
          case 'fashion-trends':
            categoryPosts = fashionTrendsData;
            break;
          case 'styling-tips':
            categoryPosts = stylingTipsData;
            break;
            case 'behind-the-scenes':
                categoryPosts = behindTheScenesData;
                break;
              case 'designer-dialogues':
                categoryPosts = designerDialoguesData;
                break;
              default:
                categoryPosts = [];
        }
        
        setPosts(categoryPosts);
      }
      setIsLoading(false);
    };

    fetchCategoryData();
  }, [categorySlug]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!category) {
    return <div className="text-center py-10">Category not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-serif mb-6">{category.name}</h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-center">
        {category.description}
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <article 
            key={post.slug} 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
            )}
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <time>{post.date}</time>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link
              to={`/blog/post/${post.slug}`}
              className="inline-flex items-center text-black font-medium hover:underline"
            >
              Read Article
              <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No articles found in this category</p>
          <Link
            to="/blog"
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
