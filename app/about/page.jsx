'use client'
import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-orange-500">ElectroCart</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted destination for cutting-edge electronics and gadgets, powered by AI innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to revolutionize the electronics shopping experience, ElectroCart combines 
                cutting-edge AI technology with a passion for premium electronics. We believe that finding the 
                perfect gadget should be effortless and enjoyable.
              </p>
              <p className="text-gray-600 mb-4">
                Since our inception, we've been committed to providing our customers with the latest technology, 
                competitive prices, and exceptional service. Our AI-powered product recognition system ensures 
                accurate product information and helps you make informed decisions.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of satisfied customers worldwide, offering everything from smartphones 
                and laptops to smartwatches and accessories.
              </p>
            </div>
            <div className="relative">
              <div className="bg-orange-100 rounded-lg p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-orange-500">10K+</h3>
                    <p className="text-gray-600">Happy Customers</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-orange-500">500+</h3>
                    <p className="text-gray-600">Products</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-orange-500">50+</h3>
                    <p className="text-gray-600">Brands</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-orange-500">24/7</h3>
                    <p className="text-gray-600">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ElectroCart?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just another electronics store. Here's what makes us different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Shopping</h3>
              <p className="text-gray-600">
                Our advanced AI technology helps identify products instantly and provides accurate specifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                We offer competitive prices with regular deals and discounts on premium electronics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and secure delivery with real-time tracking for all your orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-center">
                To make premium electronics accessible to everyone through innovative technology, 
                exceptional service, and competitive pricing. We strive to be your trusted partner 
                in discovering and purchasing the latest gadgets.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-center">
                To become the world's leading AI-powered electronics marketplace, where technology 
                meets convenience. We envision a future where finding the perfect gadget is as 
                simple as taking a picture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Constantly pushing boundaries with AI and technology.
              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality</h4>
              <p className="text-gray-600 text-sm">
                Only the best products from trusted brands.
              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer First</h4>
              <p className="text-gray-600 text-sm">
                Your satisfaction is our top priority.
              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h4>
              <p className="text-gray-600 text-sm">
                Honest pricing and clear communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-6 md:px-16 lg:px-32">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Electronics Shopping?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Join thousands of satisfied customers who trust ElectroCart for their tech needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/all-products'}
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;