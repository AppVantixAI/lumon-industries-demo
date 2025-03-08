import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare } from 'lucide-react';
import Chatbot from '../Chatbot';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [memoryFragments, setMemoryFragments] = useState<string[]>([]);
  const [visibleFragments, setVisibleFragments] = useState<string[]>([]);
  
  // Memory fragments that appear randomly
  const allMemoryFragments = [
    "I remember a lake house... was that mine?",
    "Someone was waiting for me outside work yesterday...",
    "The hallways seem longer than they should be.",
    "I had a dream about numbers last night. They were dancing.",
    "Why can't I remember what I did last weekend?",
    "There's a photo on my desk I don't recognize.",
    "Sometimes I hear voices in the break room when no one is there.",
    "The elevator only goes to certain floors.",
    "I found a note in my pocket that I don't remember writing.",
    "My reflection looked different this morning.",
    "Time moves differently here.",
    "I keep finding myself in places with no memory of how I got there.",
    "The same song has been playing in my head for days.",
    "There are gaps in my calendar I can't account for.",
    "I feel like I'm being watched when I'm alone."
  ];
  
  useEffect(() => {
    // Randomly select 3-5 memory fragments
    const numFragments = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...allMemoryFragments].sort(() => 0.5 - Math.random());
    setMemoryFragments(shuffled.slice(0, numFragments));
    
    // Start with no visible fragments
    setVisibleFragments([]);
    
    // Gradually reveal fragments
    const intervals: NodeJS.Timeout[] = [];
    
    memoryFragments.forEach((fragment, index) => {
      const interval = setTimeout(() => {
        setVisibleFragments(prev => [...prev, fragment]);
      }, (index + 1) * 3000); // Reveal a new fragment every 3 seconds
      
      intervals.push(interval);
    });
    
    return () => intervals.forEach(interval => clearTimeout(interval));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-light text-white mb-2">Personal Space</h1>
          <p className="text-gray-400 italic">Fragments of memory and identity</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-light text-white mb-4">Memory Fragments</h2>
            <div className="space-y-6">
              {visibleFragments.map((fragment, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-800 rounded border-l-4 border-blue-500 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <p className="text-gray-300 italic">{fragment}</p>
                </div>
              ))}
              {visibleFragments.length < memoryFragments.length && (
                <div className="text-center py-4">
                  <div className="inline-block h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="inline-block h-2 w-2 bg-blue-500 rounded-full animate-pulse mx-1"></div>
                  <div className="inline-block h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-light text-white mb-4">Identity</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-white">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Department:</span>
                  <span className="text-white">{user?.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-red-400">Severed</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-light text-white mb-4">Connections</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-800 rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center text-white">
                      M
                    </div>
                    <span className="ml-3 text-gray-300">Mark S.</span>
                  </div>
                  <span className="text-xs text-gray-500">Colleague?</span>
                </div>
                <div className="p-3 bg-gray-800 rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-900 flex items-center justify-center text-white">
                      H
                    </div>
                    <span className="ml-3 text-gray-300">Harmony C.</span>
                  </div>
                  <span className="text-xs text-gray-500">Supervisor?</span>
                </div>
                <div className="p-3 bg-gray-800 rounded flex items-center justify-between opacity-50">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center text-white">
                      ?
                    </div>
                    <span className="ml-3 text-gray-300">Unknown</span>
                  </div>
                  <span className="text-xs text-gray-500">Waiting outside</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 p-6 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-light text-white mb-4">Recovered Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 rounded border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="h-24 bg-gray-700 rounded flex items-center justify-center mb-2">
                <span className="text-gray-500">Redacted</span>
              </div>
              <div className="text-sm text-gray-400">File_001.jpg</div>
            </div>
            <div className="p-4 bg-gray-800 rounded border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="h-24 bg-gray-700 rounded flex items-center justify-center mb-2">
                <span className="text-gray-500">Corrupted</span>
              </div>
              <div className="text-sm text-gray-400">Memory_fragment.txt</div>
            </div>
            <div className="p-4 bg-gray-800 rounded border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="h-24 bg-gray-700 rounded flex items-center justify-center mb-2">
                <span className="text-gray-500">Encrypted</span>
              </div>
              <div className="text-sm text-gray-400">Unknown.dat</div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default Dashboard;
