import Link from 'next/link';

export default function ComparisonsIndex() {
  const comparisons = [
    { name: '✍️ Writing Tools', path: '/compare/writing-tools', desc: 'Compare ChatGPT, Jasper, Copy.ai and more' },
    { name: '🎨 Image Generators', path: '/compare/image-tools', desc: 'Compare Midjourney, DALL-E 3, Stable Diffusion' },
    { name: '🎬 Video Tools', path: '/compare/video-tools', desc: 'Compare Runway, Synthesia, Descript' },
    { name: '💻 Coding Assistants', path: '/compare/coding-tools', desc: 'Compare GitHub Copilot, Tabnine, Cursor' },
    { name: '🎵 Audio & Music', path: '/compare/audio-tools', desc: 'Compare Suno, ElevenLabs, Mubert' },
    { name: '🎨 Design Tools', path: '/compare/design-tools', desc: 'Compare Canva, Figma, Framer AI' },
    { name: '📚 Education Tools', path: '/compare/education-tools', desc: 'Compare Khanmigo, Coursera, Duolingo' },
    { name: '⚡ Productivity', path: '/compare/productivity-tools', desc: 'Compare Notion AI, Otter.ai, Zapier' },
    { name: '🔬 Research Tools', path: '/compare/research-tools', desc: 'Compare Elicit, Scite, Consensus' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Tools <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Comparisons</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare the best AI tools side by side. Find the perfect tool for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comp, idx) => (
            <Link key={idx} href={comp.path}>
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-4">{comp.name.split(' ')[0]}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {comp.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {comp.desc}
                </p>
                <div className="mt-4 text-purple-500 group-hover:translate-x-2 transition-transform">
                  Compare →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}