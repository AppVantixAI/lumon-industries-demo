import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, FileText, Users, Building, Database } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Lumon: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [accessGranted, setAccessGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  useEffect(() => {
    // Check user access level
    const checkAccess = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Only grant access to users with level 4 or higher
      if (user && user.accessLevel >= 4) {
        setAccessGranted(true);
      }
      
      setLoading(false);
    };
    
    checkAccess();
  }, [user]);

  const sections = [
    {
      id: 'history',
      title: 'Corporate History',
      icon: <Building className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-light mb-4">The Founding Vision</h3>
          <p className="mb-4">
            Lumon Industries was established in 1866 by Kier Eagan, whose revolutionary vision 
            transformed what began as a modest candle manufacturing operation into one of the 
            world's most innovative biotech corporations.
          </p>
          <p className="mb-4">
            Through nine generations of Eagan leadership, Lumon has maintained its commitment 
            to pushing the boundaries of science and human potential. The company's early 
            transition from candles to topical salves marked the beginning of its journey 
            into biotechnology.
          </p>
          <p className="mb-4">
            By the mid-20th century, Lumon had established itself as a pioneer in neurological 
            research, developing proprietary technologies that would eventually lead to 
            breakthroughs in consciousness engineering and data refinement methodologies.
          </p>
          <p>
            Today, Lumon stands at the forefront of several classified research domains, 
            continuing the legacy of its founder while adapting to the challenges of the 
            modern world with innovative solutions that remain both important and mysterious.
          </p>
        </div>
      )
    },
    {
      id: 'departments',
      title: 'Department Structure',
      icon: <Users className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-light mb-4">Organizational Hierarchy</h3>
          <p className="mb-4">
            Lumon's organizational structure is designed to maximize efficiency while 
            maintaining strict compartmentalization of sensitive information. The severed 
            floor contains four primary departments:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>
              <span className="font-medium">Macrodata Refinement (MDR)</span> - Responsible for 
              identifying and isolating malignant data sequences through proprietary refinement 
              protocols.
            </li>
            <li>
              <span className="font-medium">Optics & Design (O&D)</span> - Creates and maintains 
              visual and experiential elements essential to Lumon's operations and public presence.
            </li>
            <li>
              <span className="font-medium">Data Analysis</span> - Processes refined data for 
              implementation in various company initiatives and products.
            </li>
            <li>
              <span className="font-medium">Security</span> - Ensures compliance with company 
              protocols and maintains the integrity of all Lumon operations.
            </li>
          </ul>
          <p>
            Each department operates independently with minimal cross-departmental interaction, 
            reporting to a management structure that extends upward to the Board of Directors 
            and the current Eagan family leadership.
          </p>
        </div>
      )
    },
    {
      id: 'protocols',
      title: 'Security Protocols',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-light mb-4">Classified Security Measures</h3>
          <p className="mb-4">
            Lumon employs a comprehensive security framework to protect its intellectual 
            property and ensure operational integrity. All employees are subject to these 
            protocols without exception.
          </p>
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Clearance Levels</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Level 1-2: Basic employee access</li>
              <li>Level 3-4: Department management access</li>
              <li>Level 5: Executive access</li>
              <li>Level 6-7: Board member access</li>
              <li>Level 8-9: Eagan family access</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Emergency Protocols</h4>
            <p>
              In the event of a security breach or protocol violation, the following measures 
              may be activated:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Code Black: Facility lockdown</li>
              <li>Clean Slate: Memory contingency procedure</li>
              <li>Overtime Contingency: Extended operation authorization</li>
              <li>Protocol 3: Department isolation</li>
            </ul>
          </div>
          <p className="text-red-500 text-sm">
            Note: Detailed security protocols are restricted to Level 5+ clearance. This 
            overview is provided for general awareness only.
          </p>
        </div>
      )
    },
    {
      id: 'research',
      title: 'Current Research',
      icon: <Database className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-light mb-4">Ongoing Initiatives</h3>
          <p className="mb-4">
            Lumon's research division continues to advance several key projects that align 
            with the company's long-term strategic objectives. Current focus areas include:
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-1">Consciousness Engineering</h4>
              <p>
                Building on the success of the severance procedure, researchers are exploring 
                more granular approaches to memory compartmentalization and cognitive 
                partitioning.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-1">Biological Data Integration</h4>
              <p>
                Developing methods to translate refined data sequences into biological 
                applications, with potential implications for medical treatments and human 
                enhancement.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-1">Neural Interface Systems</h4>
              <p>
                Creating next-generation interfaces between human consciousness and digital 
                systems, building on proprietary technologies developed through the severance 
                program.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-1">Temporal Cognition</h4>
              <p>
                Investigating the relationship between subjective time perception and memory 
                formation, with applications for improving efficiency in severed work environments.
              </p>
            </div>
          </div>
          <p className="mt-4 text-red-500 text-sm">
            Note: Research details are classified. This overview contains only approved 
            information for Level 4+ clearance.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft size={16} className="mr-2" />
        Return
      </button>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="inline-block h-3 w-3 bg-blue-500 rounded-full animate-pulse mx-2"></div>
            <div className="inline-block h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="mt-4 text-gray-500">Verifying security clearance...</p>
          </div>
        </div>
      ) : !accessGranted ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-light mt-4">Access Denied</h2>
              <p className="text-gray-400 mt-2">
                You do not have sufficient clearance to access this information.
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-gray-700 text-sm text-gray-400">
              <p>Required clearance level: 4</p>
              <p>Your clearance level: {user?.accessLevel || 0}</p>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              This access attempt has been logged.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light tracking-wider mb-2">LUMON INDUSTRIES</h1>
            <p className="text-blue-400">INTERNAL DOCUMENTATION - LEVEL {user?.accessLevel} CLEARANCE</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 bg-gray-800 rounded-lg p-4 h-fit">
              <h2 className="text-lg font-medium mb-4 text-gray-300 border-b border-gray-700 pb-2">
                Information Sections
              </h2>
              <nav className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center p-2 rounded text-left ${
                      selectedSection === section.id 
                        ? 'bg-blue-900 text-white' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {section.icon}
                    <span className="ml-3">{section.title}</span>
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex items-center text-xs text-gray-500">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Document ID: LUM-INT-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              {selectedSection ? (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-light mb-6 pb-4 border-b border-gray-700">
                    {sections.find(s => s.id === selectedSection)?.title}
                  </h2>
                  <div className="text-gray-300">
                    {sections.find(s => s.id === selectedSection)?.content}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a section to view information</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-red-900 bg-opacity-30 border border-red-800 rounded text-center">
            <p className="text-gray-300 mb-2">This information is classified.</p>
            <p className="text-gray-400 text-sm">Your access and viewing activity is being monitored.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lumon;
