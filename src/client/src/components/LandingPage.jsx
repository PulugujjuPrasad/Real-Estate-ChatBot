import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Sparkles, Search, ShieldCheck, Zap } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Concierge AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <button
              onClick={onStart}
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-medium mb-6"
          >
            <Sparkles size={12} />
            <span>Next-Gen Real Estate Discovery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]"
          >
            Find Your Dream Home <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              With AI Precision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stop scrolling through endless lists. Chat with our AI Concierge to find properties that actually match your lifestyle, budget, and desires in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onStart}
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              Start Your Search
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-2xl font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all">
              View Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our AI?</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">We combine deep learning with real-time real estate data to change how you discover homes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="text-blue-400" />,
                title: "Natural Search",
                desc: "No more complex filters. Just tell us what you want in plain English, and we'll find it."
              },
              {
                icon: <Zap className="text-purple-400" />,
                title: "Instant Results",
                desc: "Our engine processes thousands of listings in milliseconds to give you the most relevant matches."
              },
              {
                icon: <ShieldCheck className="text-emerald-400" />,
                title: "Verified Data",
                desc: "We integrate with trusted real estate APIs to ensure the listings you see are accurate and current."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Simple Steps</h2>
          </div>

          <div className="space-y-12">
            {[
              { step: "01", title: "Describe Your Dream", desc: "Tell the AI your budget, preferred neighborhood, and 'must-have' features." },
              { step: "02", title: "AI Filtering", desc: "Our engine analyzes the intent and queries the database for the perfect matches." },
              { step: "03", title: "Explore & Save", desc: "Browse the curated list of properties and save the ones you love." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="text-4xl font-black text-zinc-800 group-hover:text-blue-600 transition-colors duration-500">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>© 2026 Concierge AI Real Estate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
