'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-6xl">
        
        {/* Main Card - 16:9 Aspect Ratio */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
          
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          
          {/* Two Columns Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">
            
            {/* LEFT SIDE - AI Robot Image */}
            <div className="relative overflow-hidden m-3 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl"></div>
              
              {/* AI Robot Image - Using working URL */}
              <div className="relative h-full w-full">
                <img 
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Advanced AI Robot with futuristic design, glowing blue eyes, metallic finish"
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' }}
                />
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 backdrop-blur-[1px] rounded-2xl"></div>
              </div>
              
              {/* Gen AI Label - Top Left */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider border border-white/20 shadow-lg">
                  Gen AI
                </span>
              </div>
              
              {/* Blue/Purple Glow Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/30 to-transparent rounded-b-2xl"></div>
              
              {/* Floating particles effect */}
              <div className="absolute top-1/4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute bottom-1/3 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-pulse delay-700"></div>
              <div className="absolute top-2/3 right-12 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse delay-300"></div>
            </div>
            
            {/* RIGHT SIDE - Signup Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md">
                
                {/* Back Arrow */}
                <Link 
                  href="/" 
                  className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6 group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-sm">Back</span>
                </Link>
                
                {/* Heading */}
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                  Create Your Account
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    to Unleash Your Dreams
                  </span>
                </h1>
                
                {/* Login Link */}
                <p className="text-gray-400 text-sm mt-4">
                  Already have an account?{' '}
                  <button className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    Log in
                  </button>
                </p>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  
                  {/* Name Field */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Yasir Erkini"
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yasir@example.com"
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Password Field with Visibility Toggle */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group relative w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Start Creating</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  {submitted && (
                    <p className="text-green-400 text-sm text-center mt-4 animate-pulse">
                      ✓ Account created successfully!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          {/* Glassmorphism Border Effect */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/10"></div>
        </div>
      </div>
    </div>
  );
}