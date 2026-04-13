'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  toolName: string;
  toolUrl: string;
  toolDescription: string;
}

export default function ShareButtons({ toolName, toolUrl, toolDescription }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isNativeShareSupported, setIsNativeShareSupported] = useState(false);

  useEffect(() => {
    // Check if native share is supported
    setIsNativeShareSupported(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  const handleNativeShare = async () => {
    if (isNativeShareSupported) {
      try {
        await navigator.share({
          title: `${toolName} - AI Tools Directory`,
          text: `Check out ${toolName}! ${toolDescription}`,
          url: toolUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(toolUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out ${toolName} - an amazing AI tool!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(toolUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(toolUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(toolUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const text = `Check out ${toolName} - ${toolDescription}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + toolUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnReddit = () => {
    const title = `${toolName} - Amazing AI Tool`;
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(toolUrl)}&title=${encodeURIComponent(title)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
        <span>📤</span>
        <span>Share this tool</span>
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Native Share Button (Mobile) */}
        {isNativeShareSupported && (
          <button
            onClick={handleNativeShare}
            className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span>Share</span>
          </button>
        )}

        {/* Twitter */}
        <button
          onClick={shareOnTwitter}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
          style={{ backgroundColor: '#1DA1F2' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.59-11.845c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <span>Twitter</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={shareOnLinkedIn}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
          style={{ backgroundColor: '#0A66C2' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.203 0 22.225 0z"/>
          </svg>
          <span>LinkedIn</span>
        </button>

        {/* Facebook */}
        <button
          onClick={shareOnFacebook}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
          style={{ backgroundColor: '#1877F2' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={shareOnWhatsApp}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zM8.1 17.3l2.3-1.1 1.2 1.2c.8-.3 1.6-.9 2.1-1.5.4-.5.7-1.2.7-1.9 0-.4-.1-.9-.4-1.2l-1.5-1.9c-.6-.8-1.7-1-2.6-.5-.7.5-1.2 1.2-1.5 2-.4 1.2-.4 2.5 0 3.7.4 1 .9 1.9 1.6 2.6.7.8 1.6 1.5 2.7 2 .9.5 1.9.8 2.9.9.8 0 1.6-.1 2.4-.3 1.1-.4 2-1 2.7-1.8.7-.8 1-1.8.8-2.8-.1-.8-.5-1.6-1-2.2-.4-.6-1-1-1.7-1.3l-2.7-1.4c-.4-.2-.9-.2-1.3-.1-.4.2-.8.5-1 .9-.2.4-.3.9-.1 1.4.1.3.3.6.5.8.2.2.4.3.6.5.2.1.5.3.7.5.1.2.2.3.3.6 0 .2 0 .4-.1.6-.2.5-.6.8-1 1-.3.1-.5.2-.8.1-.2 0-.4-.1-.5-.1-.5-.3-.9-.6-1.3-1-.3-.4-.6-.9-.7-1.5-.1-.5-.1-1 0-1.5.1-.5.3-.9.6-1.3.2-.3.5-.6.8-.8.2-.2.4-.4.4-.7 0-.3 0-.5-.2-.7-.2-.2-.4-.3-.7-.4-.3-.1-.6 0-.8.1-.4.2-.7.5-1 .9-.4.5-.6 1.1-.8 1.7-.1.6-.1 1.1 0 1.7.1.6.3 1.1.7 1.5.4.6 1 1.1 1.6 1.5.6.4 1.3.6 2 .6.8 0 1.5-.1 2.2-.4 1-.5 1.9-1.2 2.5-2.1.5-.7.7-1.6.6-2.4-.1-.8-.4-1.5-1-2.1-.5-.5-1.1-.8-1.7-1l-3-1c-.7-.2-1.5-.3-2.2 0-1.2.4-2.2 1.2-2.8 2.3-.5.8-.7 1.8-.7 2.8 0 .9.3 1.7.7 2.4.4.7.9 1.4 1.5 2 .7.7 1.6 1.2 2.5 1.5 1.1.4 2.2.5 3.3.4 1.1-.1 2.2-.4 3.2-.9 1.1-.5 2-1.3 2.7-2.3.6-.8 1-1.8 1.1-2.8.1-1-.1-2-.7-2.9-.3-.6-.8-1.1-1.3-1.5l-2.6-2c-.5-.4-1.1-.6-1.7-.6-.6 0-1.2.1-1.7.4-.5.3-1 .7-1.2 1.3-.3.5-.4 1.1-.3 1.7.1.6.3 1.1.7 1.5l1.5 1.8c.2.3.5.5.9.7.3.2.7.3 1 .3.4 0 .7 0 1.1-.1.4-.1.7-.2 1-.4.3-.2.6-.4.8-.7.5-.6.7-1.3.8-2 .1-.7-.2-1.5-.6-2.1-.4-.6-1-1.1-1.6-1.4l-3-1.4c-.7-.4-1.6-.5-2.4-.4-.8.1-1.6.4-2.2.9-.6.5-1.1 1.1-1.4 1.9-.3.7-.4 1.5-.3 2.3.1.8.4 1.5.9 2.1.5.6 1.1 1.1 1.9 1.3.7.3 1.5.4 2.3.3.8-.1 1.5-.4 2.1-.8.6-.4 1.1-1 1.4-1.6.3-.6.4-1.4.3-2.1-.1-.7-.4-1.3-.8-1.9l-1.8-2.3c-.3-.4-.7-.7-1.1-.9-.4-.2-.9-.4-1.4-.5l-3.4-.7c-.9-.2-1.8 0-2.6.4-.8.4-1.4 1.1-1.8 1.9-.4.8-.5 1.7-.3 2.5.2.9.6 1.6 1.1 2.3l2.2 2.6c.5.6 1.2 1.1 1.9 1.4.7.4 1.5.6 2.3.6.8 0 1.6-.1 2.3-.3.8-.3 1.4-.7 2-1.3.6-.6 1-1.2 1.3-2 .3-.7.4-1.5.3-2.3-.1-.8-.4-1.5-.8-2.2-.4-.7-.9-1.2-1.6-1.6l-3-1.8c-.7-.4-1.5-.7-2.4-.6-.8 0-1.6.3-2.3.8-.7.5-1.2 1.1-1.6 1.9-.3.7-.5 1.6-.5 2.4 0 .8.2 1.6.6 2.3.4.7.9 1.4 1.5 1.9l2.3 1.9c.6.5 1.2.8 1.9 1 .7.2 1.4.1 2.1 0 .7-.2 1.3-.5 1.9-1 .5-.5.9-1 1.2-1.7.2-.6.3-1.3.2-2-.1-.7-.4-1.3-.8-1.9l-1.7-2.3"/>
          </svg>
          <span>WhatsApp</span>
        </button>

        {/* Reddit */}
        <button
          onClick={shareOnReddit}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-white"
          style={{ backgroundColor: '#FF4500' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.623 3.867 10.364 9.092 11.734.664.122.906-.288.906-.64 0-.316-.012-1.154-.018-2.265-3.698.803-4.478-1.782-4.478-1.782-.604-1.535-1.476-1.944-1.476-1.944-1.206-.825.091-.808.091-.808 1.334.094 2.036 1.37 2.036 1.37 1.185 2.03 3.109 1.443 3.866 1.104.12-.858.464-1.444.844-1.776-2.95-.335-6.05-1.475-6.05-6.564 0-1.45.518-2.636 1.367-3.565-.137-.336-.593-1.687.13-3.517 0 0 1.115-.357 3.65 1.362 1.058-.294 2.193-.441 3.32-.446 1.127.005 2.263.152 3.322.446 2.533-1.719 3.647-1.362 3.647-1.362.724 1.83.268 3.181.131 3.517.85.929 1.366 2.115 1.366 3.565 0 5.096-3.103 6.226-6.058 6.554.477.41.902 1.22.902 2.458 0 1.773-.016 3.203-.016 3.637 0 .354.241.767.914.637C20.135 22.362 24 17.622 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Reddit</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
              </svg>
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}