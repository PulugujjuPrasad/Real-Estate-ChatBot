import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { sendMessageToAI } from '../services/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Welcome to the AI Real Estate Concierge. I can help you find your perfect home. What location and budget are you looking for?",
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const textToSend = input.trim() || (e && e.target.dataset.prompt);
    if (!textToSend) return;

    const userMsg = { id: Date.now(), role: 'user', text: textToSend, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: response.text,
        type: 'text',
        properties: response.properties || []
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'bot',
        text: "I'm having trouble connecting to my brain. Please try again in a moment.",
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Luxury 3BHK in New York under 1.2M",
    "Modern apartment in Miami under 500k",
    "Quiet suburban house in Texas around 300k",
    "Penthouse in London with city view"
  ];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-8">
      {/* Chat Header */}
      <header className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Sparkles size={20} className="text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Discovery Engine</h1>
        </div>
        <div className="text-xs text-zinc-500 font-medium bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
          v1.0 Production
        </div>
      </header>

      {/* Conversation Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 px-2 mb-6 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-zinc-700' : 'bg-blue-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className={`max-w-[80%] flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>

                {msg.properties && msg.properties.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {msg.properties.map(prop => (
                      <PropertyCard key={prop.propertyId} property={prop} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4 px-2">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={(e) => handleSend({ target: { dataset: { prompt: suggestion } } })}
            className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 px-3 py-2 rounded-full transition-all active:scale-95"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
        <div className="relative flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. I'm looking for a 3BHK in New York under 600k"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 py-3 text-white placeholder-zinc-500 outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !suggestions.find(s => s === ''))}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white p-3 rounded-xl transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
