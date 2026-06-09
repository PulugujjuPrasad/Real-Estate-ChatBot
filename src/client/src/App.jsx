import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import LandingPage from './components/LandingPage';
import { Layout } from 'lucide-react';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Sidebar - Minimalist Navigation */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => setIsStarted(false)}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Layout size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Concierge AI</span>
        </div>

        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Main Menu</div>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-zinc-800 text-white transition-all">
            <span className="text-sm font-medium">Chat Discovery</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
            <span className="text-sm font-medium">Saved Homes</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
            <span className="text-sm font-medium">Market Analytics</span>
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <div className="text-sm font-medium">Guest User</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
