'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Save to localStorage (simple for now)
    const subscribers = JSON.parse(localStorage.getItem('newsletter') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter', JSON.stringify(subscribers));
    }
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  return (
    <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white">
      <div className="text-center">
        <div className="text-3xl mb-3">📧</div>
        <h3 className="text-xl font-bold mb-2">Subscribe to Newsletter</h3>
        <p className="text-white/80 text-sm mb-4">
          Get the latest AI tools delivered to your inbox weekly!
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="text-green-200 text-sm mt-3">✓ Subscribed successfully!</p>
        )}
      </div>
    </div>
  );
}