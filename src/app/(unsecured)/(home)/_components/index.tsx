"use client"
import React, { useState } from 'react';
import { Zap, Shield, Clock, TrendingDown, CheckCircle, Sun, Battery, Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import CustomButton from "@/../components/shared/button/CustomButton";
import Image from "next/image";
import WomaSeatingWithAFan from "../_components/assets/landing_img.png";
import MaskImage from "../_components/assets/mask.png";

const LumogridLanding = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      console.log('Email submitted:', email);
      setEmail('');
      alert('Thank you! We\'ll contact you soon.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Your Original Design */}
       <div
      style={{
        backgroundImage: `url(${MaskImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="bg-white border-b border-gray-200 py-12 sm:py-16 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            All In One Shop For <br className="hidden sm:block" />
            Affordable Alternative <br className="hidden sm:block" />
            Green Energy!
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700">
            Get Power Readily In{" "}
            <span className="font-semibold text-green-700">{`Lagos`}</span>
          </p>
          <div className="mt-6 sm:mt-8">
            <CustomButton text={"Get Reliable Power Now"} link="/signup/1" />
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src={WomaSeatingWithAFan}
            alt="WomaSeatingWithAFan"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>

      {/* Secondary Hero Section with Your Copy */}
      <section className="relative bg-gradient-to-br from-green-50 to-white border-b border-gray-200 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyYzU1ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
            ⚡ Reliable Solar Power for Your Home
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
            Take Control of Your Power. <span className="text-green-600">Live Uninterrupted.</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Experience true freedom from blackouts, expensive fuel, and uncertainty. Lumogrid's solar energy solutions guarantee your home is always bright, safe, and efficient.
          </p>
          
          {/* <button 
            onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Stable Power Today
          </button> */}
          
          <p className="mt-4 text-sm text-gray-600">
            Flexible plans designed for every household
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lumogrid?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of Nigerian homes enjoying clean, reliable, and affordable energy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-green-600" />,
                title: "24/7 Reliable Power",
                description: "Never worry about blackouts again. Your home stays powered round the clock."
              },
              {
                icon: <TrendingDown className="w-10 h-10 text-green-600" />,
                title: "Save on Energy Costs",
                description: "Cut your electricity bills by up to 80% and say goodbye to expensive diesel."
              },
              {
                icon: <Shield className="w-10 h-10 text-green-600" />,
                title: "12-Month Warranty",
                description: "Complete peace of mind with comprehensive warranty coverage on all equipment."
              },
              {
                icon: <Clock className="w-10 h-10 text-green-600" />,
                title: "Quick Installation",
                description: "Professional installation in 2-3 days with minimal disruption to your routine."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps to Energy Freedom
            </h2>
            <p className="text-lg text-gray-600">
              Get powered in just 4 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Free Assessment",
                description: "We analyze your home's energy needs at no cost to you",
                icon: <Home className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Custom Design",
                description: "Get a tailored solar solution with flexible payment plans",
                icon: <Sun className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Professional Install",
                description: "Expert installation with zero disruption to your daily life",
                icon: <Battery className="w-8 h-8" />
              },
              {
                step: "04",
                title: "Ongoing Support",
                description: "24/7 monitoring and maintenance to keep you powered",
                icon: <Shield className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-green-100 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-600 text-white rounded-lg p-2">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-bold text-green-600">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Everything Your Home Needs
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Lumogrid provides complete solar solutions designed specifically for Nigerian homes, with features that matter most to you and your family.
              </p>
              
              <div className="space-y-4">
                {[
                  // "Smart monitoring via mobile app",
                  "Flexible payment plans to suit your budget",
                  "Expert training on system maintenance",
                  "Premium quality panels with 25-year lifespan",
                  "Local support team available 24/7",
                  "Hassle-free warranty claims"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5000+", label: "Homes Powered" },
                { value: "₦2.5B+", label: "Customer Savings" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200">
                  <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about solar energy
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How long does installation take?",
                answer: "Most installations are completed within a week after confirmation of payment. Our certified technicians handle everything end-to-end, and you only need to be present for access permissions."
              },
              {
                question: "Can solar work during cloudy days or rainy seasons?",
                answer: "Yes. Quality solar panels still produce energy in cloudy conditions, and your batteries supply stored energy at night or during low sunlight periods, ensuring 24/7 electricity."
              },
              {
                question: "What payment options are available?",
                answer: "Lumogrid offers direct full payment, flexible instalment plans, third-party financing partners, and pay-as-you-go options for select systems."
              },
              {
                question: "Will solar reduce my PHCN bill?",
                answer: "Yes. Many customers see a 60–90% reduction in their electricity bills depending on their system size and energy consumption patterns."
              },
              {
                question: "What warranty do I get?",
                answer: "You get 6–12 months warranty on installation workmanship, and solar panels last 25 years or more, maintaining up to 80–90% efficiency over time."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg border border-gray-200 group">
                <summary className="px-6 py-4 cursor-pointer flex justify-between items-center font-semibold text-gray-900 hover:text-green-600 transition-colors">
                  <span>{faq.question}</span>
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => window.location.href = '/faqs'}
              className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2 transition-colors"
            >
              View All FAQs
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-form" className="py-16 sm:py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Power?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Start your journey to energy independence today. Get a free assessment and custom quote.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300"
              />
              <button
                onClick={handleSubmit}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
            <p className="text-green-50 text-sm mt-4">
              No commitment required. Free consultation included.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-white">Lumogrid</span>
              </div>
              <p className="text-gray-400 mb-4">
                Powering African homes with clean, reliable, and affordable solar energy. Building a sustainable future, one household at a time.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <button key={index} className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'How It Works', 'Pricing', 'FAQ', 'Blog'].map((item, index) => (
                  <li key={index}>
                    <button className="hover:text-green-500 transition-colors text-left">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span className="text-sm">+234 XXX XXX XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-500" />
                  <span className="text-sm">info@lumogrid.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Lumogrid. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="hover:text-green-500 transition-colors">Privacy Policy</button>
              <button className="hover:text-green-500 transition-colors">Terms of Service</button>
              <button className="hover:text-green-500 transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LumogridLanding;