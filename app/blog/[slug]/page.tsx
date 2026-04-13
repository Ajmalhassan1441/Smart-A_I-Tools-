'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

const blogPosts = {
  'top-10-free-ai-writing-tools': {
    title: 'Top 10 Free AI Writing Tools in 2024',
    content: `
      <p>AI writing tools have revolutionized content creation. Here are the top 10 free tools you can use today:</p>
      
      <h2>1. ChatGPT</h2>
      <p>OpenAI's flagship chatbot offers a free tier with GPT-3.5 capabilities. Perfect for brainstorming, drafting, and editing.</p>
      
      <h2>2. Google Gemini</h2>
      <p>Google's AI assistant provides free access with Google account. Great for research and writing assistance.</p>
      
      <h2>3. Claude AI</h2>
      <p>Anthropic's Claude offers free tier with impressive context window for longer content.</p>
      
      <h2>4. Copy.ai</h2>
      <p>Free tier includes 2000 words per month for marketing copy and blog posts.</p>
      
      <h2>5. Rytr</h2>
      <p>Free plan offers 5000 characters per month with multiple use cases.</p>
      
      <h2>6. Writesonic</h2>
      <p>Free tier gives 10 credits for trying their AI writing tools.</p>
      
      <h2>7. Quillbot</h2>
      <p>Free paraphrasing tool with 1250 words limit.</p>
      
      <h2>8. Grammarly</h2>
      <p>Free grammar checker with basic writing suggestions.</p>
      
      <h2>9. Hemingway Editor</h2>
      <p>Free web tool for improving readability.</p>
      
      <h2>10. Wordtune</h2>
      <p>Free tier with 10 rewrites per day.</p>
    `,
    category: 'Writing',
    date: 'April 5, 2024',
    readTime: '5 min read'
  },
  'chatgpt-vs-gemini-vs-claude': {
    title: 'ChatGPT vs Gemini vs Claude: Which is Best?',
    content: `
      <p>Three major AI chatbots compete for dominance. Here's detailed comparison:</p>
      
      <h2>Feature Comparison</h2>
      <table class="w-full border-collapse">
        <tr><th>Feature</th><th>ChatGPT</th><th>Gemini</th><th>Claude</th></tr>
        <tr><td>Free Tier</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
        <tr><td>Context Window</td><td>8K-128K</td><td>32K</td><td>100K-200K</td></tr>
        <tr><td>File Upload</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
        <tr><td>Web Browsing</td><td>Yes (Plus)</td><td>Yes</td><td>No</td></tr>
        <tr><td>Image Generation</td><td>Yes (DALL-E)</td><td>Yes</td><td>No</td></tr>
      </table>
      
      <h2>Pricing</h2>
      <p>ChatGPT Plus: $20/month<br/>Gemini Advanced: $19.99/month<br/>Claude Pro: $20/month</p>
      
      <h2>Verdict</h2>
      <p>Best for writing: Claude<br/>Best for research: Gemini<br/>Best overall: ChatGPT</p>
    `,
    category: 'Comparison',
    date: 'April 4, 2024',
    readTime: '8 min read'
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/blog" className="text-purple-500 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/blog" className="inline-flex items-center space-x-2 text-purple-500 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Blog</span>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-6">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <ShareButtons 
              toolName={post.title}
              toolUrl={typeof window !== 'undefined' ? window.location.href : ''}
              toolDescription={post.content.substring(0, 150)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}