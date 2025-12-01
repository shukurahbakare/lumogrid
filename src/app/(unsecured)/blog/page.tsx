"use client"

import React, { useState } from 'react';
import { Sun, Menu, X, Calendar, User, ArrowRight, Search } from 'lucide-react';
import TopNav from '../../../../components/shared/nav/TopNav';

const LumogridBlogPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact-form' },
  ];

  const categories = ['All', 'Savings', 'Technology', 'Installation', 'Maintenance', 'News'];

  const blogPosts = [
    {
      id: 1,
      title: "5 Ways Solar Power Saves Nigerian Homes Money",
      excerpt: "Discover how switching to solar can cut your energy costs by up to 80% and protect you from rising electricity tariffs. Learn about the financial benefits and long-term savings.",
      content: "Solar power is revolutionizing how Nigerian households manage their energy costs...",
      date: "Nov 20, 2024",
      author: "Adebayo Ogunlesi",
      category: "Savings",
      readTime: "5 min read",
      image: "💰"
    },
    {
      id: 2,
      title: "Understanding Solar Battery Storage for Your Home",
      excerpt: "Learn how battery storage works and why it's essential for 24/7 power in areas with unreliable grid supply. A comprehensive guide to battery technology.",
      content: "Battery storage is the key to uninterrupted power supply...",
      date: "Nov 15, 2024",
      author: "Chioma Nwosu",
      category: "Technology",
      readTime: "7 min read",
      image: "🔋"
    },
    {
      id: 3,
      title: "Solar Installation: What to Expect in Lagos",
      excerpt: "A step-by-step guide to the solar installation process, from assessment to activation, specifically for Lagos homeowners. Everything you need to know.",
      content: "Installing solar panels in Lagos is easier than you think...",
      date: "Nov 10, 2024",
      author: "Emeka Okafor",
      category: "Installation",
      readTime: "6 min read",
      image: "🏠"
    },
    {
      id: 4,
      title: "The Ultimate Guide to Solar Panel Maintenance",
      excerpt: "Keep your solar system running at peak efficiency with these essential maintenance tips. Simple practices that extend the life of your investment.",
      content: "Maintaining your solar panels is crucial for optimal performance...",
      date: "Nov 5, 2024",
      author: "Fatima Abdullahi",
      category: "Maintenance",
      readTime: "4 min read",
      image: "🔧"
    },
    {
      id: 5,
      title: "Government Incentives for Solar Energy in Nigeria",
      excerpt: "Explore the latest government policies and incentives supporting solar adoption in Nigeria. Learn how to benefit from available programs.",
      content: "The Nigerian government is increasingly supporting renewable energy...",
      date: "Oct 28, 2024",
      author: "Oluwaseun Adeyemi",
      category: "News",
      readTime: "5 min read",
      image: "📋"
    },
    {
      id: 6,
      title: "Solar vs Generator: A Cost Comparison for 2024",
      excerpt: "An in-depth analysis comparing the costs of running a generator versus solar power. The numbers might surprise you.",
      content: "When comparing solar and generators, the long-term savings are clear...",
      date: "Oct 20, 2024",
      author: "Ibrahim Mohammed",
      category: "Savings",
      readTime: "8 min read",
      image: "⚡"
    },
    {
      id: 7,
      title: "How Solar Panels Work: A Simple Explanation",
      excerpt: "Demystifying solar technology with an easy-to-understand breakdown of how solar panels convert sunlight into electricity.",
      content: "Solar panels might seem complex, but the principle is simple...",
      date: "Oct 15, 2024",
      author: "Chioma Nwosu",
      category: "Technology",
      readTime: "6 min read",
      image: "☀️"
    },
    {
      id: 8,
      title: "Preparing Your Home for Solar Installation",
      excerpt: "Essential steps to take before your solar installation day. Make the process smooth and hassle-free with proper preparation.",
      content: "Proper preparation ensures a smooth installation process...",
      date: "Oct 10, 2024",
      author: "Adebayo Ogunlesi",
      category: "Installation",
      readTime: "5 min read",
      image: "🏡"
    },
    {
      id: 9,
      title: "The Environmental Impact of Going Solar",
      excerpt: "Understand how switching to solar helps reduce your carbon footprint and contributes to a cleaner Nigeria.",
      content: "Solar energy is one of the cleanest power sources available...",
      date: "Oct 5, 2024",
      author: "Fatima Abdullahi",
      category: "News",
      readTime: "4 min read",
      image: "🌍"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
           <TopNav />


      {/* Blog Header */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16  mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Lumogrid Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your source for solar energy insights, tips, and updates in Nigeria
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl overflow-hidden shadow-xl border border-green-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 h-64 md:h-full flex items-center justify-center text-8xl">
                {featuredPost.image}
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full mb-4">
                  Featured
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
                  Read Full Article
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 h-48 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <button className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Get the latest solar energy tips and insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-white">Lumogrid</span>
              </div>
              <p className="text-gray-400 mb-4">
                Powering African homes with clean, reliable, and affordable solar energy.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'How It Works', 'Pricing', 'Blog'].map((item, index) => (
                  <li key={index}>
                    <button className="hover:text-green-500 transition-colors text-left">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">Lagos, Nigeria</p>
              <p className="text-sm text-gray-400">info@lumogrid.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2025 Lumogrid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LumogridBlogPage;