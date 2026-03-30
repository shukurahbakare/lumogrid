"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TopNav from '@/../components/shared/nav/TopNav';

const FAQsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'About Lumogrid',
    'Installation',
    'Payments & Financing',
    'System Performance',
    'Batteries & Panels',
    'Maintenance',
    'Business Solutions',
    'Warranty'
  ];

  const faqData = [
    {
      category: 'About Lumogrid',
      questions: [
        {
          q: 'What is Lumogrid?',
          a: 'Lumogrid is an end-to-end solar platform that helps homes and businesses access clean, reliable power through affordable installations, expert maintenance, transparent education, and smart financing.'
        },
        {
          q: 'How is Lumogrid different from other solar companies?',
          a: 'Unlike typical installers, Lumogrid provides a full ecosystem—assessment, design, installation, maintenance, customer education, and long-term support. You don\'t just buy solar; you get a partner.'
        },
        {
          q: 'Where does Lumogrid operate?',
          a: 'We currently serve customers across Nigeria with a growing network of certified installation and maintenance partners nationwide.'
        }
      ]
    },
    {
      category: 'Installation',
      questions: [
        {
          q: 'How do I know the right solar system for my home or business?',
          a: 'You can complete a quick assessment on the Lumogrid platform. Our system analyzes your appliances, usage patterns, and budget to recommend the ideal solar kit.'
        },
        {
          q: 'How long does installation take?',
          a: 'Most installations are completed within a week after confirmation of payment or approval of financing. This may however differ by location. Our support agents will always confirm your specific installation dates prior.'
        },
        {
          q: 'Do I need to be present during installation?',
          a: 'Only for access permissions. Our certified technicians handle everything end-to-end.'
        },
        {
          q: 'Will my roof type affect installation?',
          a: 'No. Our installers are trained to work on concrete roofs, aluminium sheets, stone-coated roofing, flat roofs, bungalows and duplexes.'
        },
        {
          q: 'Can solar power my entire house?',
          a: 'Yes. With the right system size, solar can run freezers, ACs, pumps, TVs, WiFi, lights, small appliances, and business equipment.'
        },
        {
          q: 'What if my energy needs increase later?',
          a: 'All Lumogrid systems are expandable. You can add more batteries or panels anytime.'
        }
      ]
    },
    {
      category: 'Payments & Financing',
      questions: [
        {
          q: 'What payment options are available?',
          a: 'Lumogrid offers direct full payment, flexible instalment plans, third-party financing partners, and pay-as-you-go options for select systems.'
        },
        {
          q: 'Can I pay in instalments?',
          a: 'Yes. Monthly installment plans are available depending on the system and credit approval.'
        },
        {
          q: 'What happens after I complete payment?',
          a: 'You receive confirmation, installation date, and system documentation & warranty details.'
        },
        {
          q: 'Do businesses get financing support?',
          a: 'Yes. We provide SME-friendly financing with options tailored to small businesses, shops, offices, and online workspaces.'
        }
      ]
    },
    {
      category: 'System Performance',
      questions: [
        {
          q: 'Can solar work during cloudy days or rainy seasons?',
          a: 'Yes. The right solar panels still produce energy in cloudy conditions, and your batteries supply stored energy at night or during low sunlight periods.'
        },
        {
          q: 'What happens at night?',
          a: 'Your home runs on stored battery power. With the right system, you can enjoy 24/7 electricity.'
        },
        {
          q: 'Will solar reduce my PHCN (NEPA) bill?',
          a: 'Yes. Many customers see a 60–90% reduction depending on their system size.'
        },
        {
          q: 'Can I use solar and grid power together?',
          a: 'Absolutely. Lumogrid systems are hybrid-ready.'
        },
        {
          q: 'Can my system run multiple AC units?',
          a: 'Yes, with the appropriate inverter and battery capacity. Our engineers will recommend the right configuration.'
        }
      ]
    },
    {
      category: 'Batteries & Panels',
      questions: [
        {
          q: 'What type of batteries do you use?',
          a: 'We use high-performance Lead-Acid and Lithium Iron Phosphate (LiFePO4) batteries. Lithium-ion batteries last 10-15 years with high efficiency (up to 99%) and require low maintenance. Lead-acid batteries have lower upfront costs and proven reliability with high recyclability.'
        },
        {
          q: 'What is the lifespan of solar panels?',
          a: 'Panels last 25 years or more and maintain up to 80–90% efficiency over time.'
        },
        {
          q: 'Do the panels get hot or attract heat into the home?',
          a: 'No. In fact, they provide light shade to the roof.'
        }
      ]
    },
    {
      category: 'Maintenance',
      questions: [
        {
          q: 'Does Lumogrid offer maintenance?',
          a: 'Yes. We provide scheduled checkups, on-demand repairs, and system optimization.'
        },
        {
          q: 'How often is maintenance required?',
          a: 'Basic maintenance is recommended twice a year.'
        },
        {
          q: 'What if something goes wrong after installation?',
          a: 'You get access to Lumogrid Support for troubleshooting, replacement, or repairs depending on your warranty level.'
        },
        {
          q: 'Do you repair systems installed by other providers?',
          a: 'Yes. Lumogrid offers maintenance services even for non-Lumogrid users.'
        }
      ]
    },
    {
      category: 'Business Solutions',
      questions: [
        {
          q: 'Can Lumogrid design solar for SMEs?',
          a: 'Yes. We support retail stores, warehouses, tech hubs, hospitals, schools, cold rooms, and hospitality businesses.'
        },
        {
          q: 'Will solar reduce my operating cost?',
          a: 'Yes. Many SMEs cut generator and fuel expenses by up to 75%.'
        },
        {
          q: 'Can my business scale the system later?',
          a: 'Lumogrid offers modular, expandable solar systems perfect for growing businesses.'
        }
      ]
    },
    {
      category: 'Warranty',
      questions: [
        {
          q: 'What warranty do I get?',
          a: 'Depending on the system, you get 6–12 months on installation workmanship.'
        },
        {
          q: 'Is there a performance guarantee?',
          a: 'Yes. Lumogrid systems are designed to meet expected energy output for your load requirements.'
        }
      ]
    }
  ];

  const filteredFAQs = faqData.filter(category => {
    if (selectedCategory !== 'All' && category.category !== selectedCategory) {
      return false;
    }
    
    if (searchQuery) {
      return category.questions.some(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      
      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-green-50 to-white py-16 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about Lumogrid solar solutions
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No FAQs found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFAQs.map((categoryData, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-8 bg-green-600 rounded"></span>
                      {categoryData.category}
                    </h2>
                    <div className="space-y-3">
                      {categoryData.questions
                        .filter(faq => 
                          !searchQuery || 
                          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((faq, faqIndex) => (
                          <details 
                            key={faqIndex} 
                            className="bg-white rounded-lg border border-gray-200 shadow-sm group hover:shadow-md transition-shadow"
                          >
                            <summary className="px-6 py-4 cursor-pointer flex justify-between items-start font-semibold text-gray-900 hover:text-green-600 transition-colors">
                              <span className="pr-4">{faq.q}</span>
                              <span className="text-green-600 flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                              {faq.a}
                            </div>
                          </details>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-green-50 mb-8">
              Our team is here to help you find the perfect solar solution
            </p>
            <button 
              onClick={() => window.location.href = '/#contact-form'}
              className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg"
            >
              Contact Us Today
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">© 2025 Lumogrid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQsPage;