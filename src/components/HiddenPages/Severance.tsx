import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Severance: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Dramatic reveal effect
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft size={16} className="mr-2" />
        Return
      </button>
      
      {!showContent ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-3 w-3 bg-white rounded-full animate-pulse"></div>
            <div className="inline-block h-3 w-3 bg-white rounded-full animate-pulse mx-2"></div>
            <div className="inline-block h-3 w-3 bg-white rounded-full animate-pulse"></div>
            <p className="mt-4 text-gray-500">Accessing restricted files...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light tracking-wider mb-2">SEVERANCE PROTOCOL</h1>
            <p className="text-red-500">CLASSIFIED - LEVEL 9 CLEARANCE REQUIRED</p>
          </div>
          
          <div className="space-y-8">
            <div className="border border-gray-800 p-6 rounded">
              <h2 className="text-xl font-light mb-4 text-gray-300">Procedure Overview</h2>
              <p className="text-gray-400 mb-4">
                The Severance procedure involves the surgical implantation of a microchip at the base of the cerebral cortex, 
                creating a complete bifurcation of consciousness between work and non-work environments.
              </p>
              <p className="text-gray-400">
                Once activated, the subject's consciousness is divided into two distinct entities: the "innie" (work consciousness) 
                and the "outie" (non-work consciousness). Neither entity retains memories or awareness of the other's existence beyond 
                the most basic understanding that they are severed.
              </p>
            </div>
            
            <div className="border border-gray-800 p-6 rounded">
              <h2 className="text-xl font-light mb-4 text-gray-300">Subject Eligibility</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Minimum age: 21 years</li>
                <li>No history of neurological disorders</li>
                <li>Psychological evaluation clearance</li>
                <li>No immediate family members with security clearance above Level 4</li>
                <li>Willingness to sign comprehensive non-disclosure agreements</li>
                <li>Acceptance of memory monitoring protocols</li>
              </ul>
            </div>
            
            <div className="border border-gray-800 p-6 rounded">
              <h2 className="text-xl font-light mb-4 text-gray-300">Contingency Protocols</h2>
              <p className="text-gray-400 mb-4">
                In the event of consciousness bleed-through or chip malfunction, the following protocols are to be enacted immediately:
              </p>
              <ol className="list-decimal list-inside text-gray-400 space-y-2">
                <li>Subject isolation in Contingency Room C</li>
                <li>Administration of memory suppression agents</li>
                <li>Chip reset procedure (Code: CLEAN SLATE)</li>
                <li>If unsuccessful, initiate Protocol Black (permanent retirement)</li>
              </ol>
              <p className="text-red-500 mt-4 text-sm">
                Note: Protocol Black authorization requires two Level 9 administrators and cannot be reversed.
              </p>
            </div>
            
            <div className="border border-gray-800 p-6 rounded">
              <h2 className="text-xl font-light mb-4 text-gray-300">Experimental Findings</h2>
              <p className="text-gray-400 mb-4">
                Recent studies have shown that under specific conditions, severed subjects may experience:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Emotional resonance between innie and outie states</li>
                <li>Dream-state memory transference</li>
                <li>Unconscious recognition of familiar stimuli across the severance barrier</li>
                <li>Heightened susceptibility to symbolic triggers</li>
              </ul>
              <p className="text-gray-400 mt-4">
                These findings suggest that complete severance may be theoretically impossible, though practical separation 
                remains effective for operational purposes.
              </p>
            </div>
            
            <div className="mt-8 p-4 bg-red-900 bg-opacity-30 border border-red-800 rounded text-center">
              <p className="text-gray-300 mb-2">This document is monitored.</p>
              <p className="text-gray-400 text-sm">Your access has been logged and reported to security.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Severance;
