import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../assets/images/collection2.png";
import { categories, featuredPosts, latestPosts } from '../data/data';

const FashionBlog = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative mb-16">
        <div className="h-[70vh] relative">
          <img
            src={img1}
            alt="Luxury Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30">
            <div className="max-w-4xl mx-auto px-4 h-full flex items-center justify-center text-center">
              <div className="text-white">
                <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  Editorial Spotlight
                </span>
                <h1 className="text-5xl font-serif mt-6 mb-4">
                  Modern Opulence: Redefining Luxury
                </h1>
                <Link 
                  to={`/blog/post/${featuredPosts[0].slug}`}
                  className="inline-block bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors"
                >
                  Read Feature
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="max-w-5xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl font-serif mb-12">Curated Perspectives</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(category => (
            <Link 
              key={category.slug}
              to={`/blog/${category.slug}`}
              className="group cursor-pointer bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center mb-4">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <span className="text-sm text-gray-500 mt-2">
                  {category.posts} insights
                </span>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <span className="text-black font-medium group-hover:underline inline-block">
                Discover →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-12">Editorial Selections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <article 
                key={post.slug}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm">
                    {categories.find(cat => cat.slug === post.category)?.name}
                  </span>
                </div>
                <div className="p-6 text-center">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    to={`/blog/post/${post.slug}`}
                    className="text-black font-medium hover:underline"
                  >
                    Continue Reading →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-5xl mx-auto px-4 mb-16 text-center">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-serif mb-4">Recent Explorations</h2>
          <Link 
            to="/blog/fashion-trends"
            className="text-gray-600 hover:text-black transition-colors"
          >
            View All Posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {latestPosts.map(post => (
            <article 
              key={post.slug}
              className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-center md:text-left">
                <span className="text-sm text-gray-500">
                  {categories.find(cat => cat.slug === post.category)?.name}
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2">{post.title}</h3>
                <div className="flex items-center justify-center md:justify-start text-sm text-gray-600">
                  <span>{post.author}</span>
                  <span className="mx-2">·</span>
                  <time>{post.date}</time>
                </div>
                <Link
                  to={`/blog/post/${post.slug}`}
                  className="mt-3 inline-block text-black font-medium hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FashionBlog;
