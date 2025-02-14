
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { featuredPosts, latestPosts, fashionTrendsData, stylingTipsData, behindTheScenesData, designerDialoguesData } from '../data/data';

// const PostPage = () => {
//     const { postSlug } = useParams();
//     const allPosts = [...featuredPosts, ...latestPosts, ...fashionTrendsData, ...stylingTipsData, ...behindTheScenesData,
//         ...designerDialoguesData];
//     const post = allPosts.find(p => p.slug === postSlug);

//   if (!post) {
//     return <div className="text-center py-10">Post not found</div>;
//   }

//   return (
//     <article className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-serif mb-6">{post.title}</h1>
//       <p className="text-gray-600 mb-8">{post.excerpt}</p>
//       <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
//     </article>
//   );
// };

// export default PostPage;


// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { featuredPosts, latestPosts, fashionTrendsData, stylingTipsData, behindTheScenesData, designerDialoguesData } from '../data/data';

// const PostPage = () => {
//   const { postSlug } = useParams();
//   const allPosts = [...featuredPosts, ...latestPosts, ...fashionTrendsData, ...stylingTipsData, ...behindTheScenesData, ...designerDialoguesData];
//   const post = allPosts.find(p => p.slug === postSlug);

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center py-20 max-w-2xl px-4">
//           <h1 className="text-3xl font-serif mb-4">Article Not Found</h1>
//           <p className="text-gray-600 mb-8">The requested article could not be located in our archives.</p>
//           <Link 
//             to="/blog" 
//             className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
//           >
//             Return to Blog
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <article className="min-h-screen bg-white">
//       {/* Featured Image */}
//       {post.image && (
//         <div className="relative h-96 mb-16">
//           <img
//             src={post.image}
//             alt={post.title}
//             className="w-full h-full object-cover object-center"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
//         </div>
//       )}

//       {/* Article Content */}
//       <div className="max-w-4xl mx-auto px-4 pb-20">
//         <header className="mb-12 text-center">
//           <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
//             <span className="bg-gray-100 px-3 py-1 rounded-full">{post.category}</span>
//             <span>•</span>
//             <time>{post.date}</time>
//             <span>•</span>
//             <span>{post.author}</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
//             {post.title}
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             {post.excerpt}
//           </p>
//         </header>

//         {/* Main Content */}
//         <div className="prose prose-lg max-w-none mb-16">
//           <div dangerouslySetInnerHTML={{ __html: post.content }} />
//         </div>

//         {/* Back to Blog Link */}
//         <div className="border-t pt-12">
//           <Link 
//             to="/blog" 
//             className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
//           >
//             <svg 
//               className="w-5 h-5 mr-2" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18" 
//               />
//             </svg>
//             Back to Blog
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default PostPage;


// PostPage.jsx (updated without images)
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredPosts, latestPosts, fashionTrendsData, stylingTipsData, behindTheScenesData, designerDialoguesData } from '../data/data';

const PostPage = () => {
  const { postSlug } = useParams();
  const allPosts = [...featuredPosts, ...latestPosts, ...fashionTrendsData, ...stylingTipsData, ...behindTheScenesData, ...designerDialoguesData];
  const post = allPosts.find(p => p.slug === postSlug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-20 max-w-2xl px-4">
          <h1 className="text-3xl font-serif mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The requested article could not be located in our archives.</p>
          <Link 
            to="/blog" 
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Text-based Hero Section */}
      <div className="bg-gray-50 py-20 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">{post.category}</span>
              <span>•</span>
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Back to Blog Link */}
        <div className="border-t pt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostPage;
