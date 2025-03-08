import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Quote } from 'lucide-react';

const Kier: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    {
      text: "The remembered man does not decay.",
      context: "From 'Musings on Immortality', Chapter 3"
    },
    {
      text: "Let not your work be sullied by the dirt and grime of your outie's life.",
      context: "From 'The Divided Self', Chapter 1"
    },
    {
      text: "A man's character isn't determined by how he enjoys his freedom, but by what he does when that freedom is taken from him.",
      context: "From 'The Lexington Letter', Appendix B"
    },
    {
      text: "The tempers four are not equal, but they are in balance. As it is in the mind, so it is in Lumon.",
      context: "From 'The Four Tempers', Introduction"
    },
    {
      text: "Ambition and surrender, frolic and dread. These are the four elements of man.",
      context: "From 'The Four Tempers', Chapter 1"
    },
    {
      text: "When the mind is divided, the body is but a vessel.",
      context: "From 'Severance and the Soul', Chapter 7"
    },
    {
      text: "What divides us is not the absence of love, but the absence of understanding our purpose.",
      context: "From 'Corporate Philosophy', Chapter 2"
    },
    {
      text: "The mind is a labyrinth. Severance is merely a door.",
      context: "From 'The Science of Separation', Chapter 4"
    },
    {
      text: "We must trust that the board knows what is best for each and every one of us.",
      context: "From 'Corporate Governance', Chapter 9"
    }
  ];
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    // Set up quote rotation
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 10000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
    };
  }, [quotes.length]);

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
            <p className="mt-4 text-gray-500">Accessing the wisdom of Kier...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-light tracking-wider mb-2">THE WISDOM OF KIER EAGAN</h1>
            <p className="text-blue-400">FOUNDER AND VISIONARY</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 bg-gray-700">
                  <img 
                    src="https://i.imgur.com/placeholder.jpg" 
                    alt="Kier Eagan Portrait" 
                    className="object-cover w-full h-full opacity-70"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23374151"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%23FFFFFF" text-anchor="middle" dominant-baseline="middle">Portrait of Kier Eagan</text></svg>';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-medium text-gray-200">Kier Eagan</h2>
                  <p className="text-gray-400 text-sm mt-1">1842 - 1939</p>
                  <p className="mt-3 text-gray-300 text-sm">
                    Founder of Lumon Industries and author of numerous philosophical works that continue 
                    to guide the company's vision and values to this day.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-200 flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  Major Works
                </h3>
                <ul className="mt-3 space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="h-1 w-1 bg-blue-500 rounded-full mr-2"></div>
                    <span>The Four Tempers</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1 w-1 bg-blue-500 rounded-full mr-2"></div>
                    <span>Severance and the Soul</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1 w-1 bg-blue-500 rounded-full mr-2"></div>
                    <span>The Divided Self</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1 w-1 bg-blue-500 rounded-full mr-2"></div>
                    <span>Corporate Philosophy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1 w-1 bg-blue-500 rounded-full mr-2"></div>
                    <span>Musings on Immortality</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-6 w-6 text-blue-400 mr-2" />
                  <h2 className="text-xl font-medium text-gray-200">Quotations</h2>
                </div>
                
                <div className="relative h-40 flex items-center justify-center">
                  {quotes.map((quote, index) => (
                    <div 
                      key={index}
                      className={`absolute w-full transition-opacity duration-1000 ${
                        index === currentQuote ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <blockquote className="text-center">
                        <p className="text-xl text-gray-200 italic">"{quote.text}"</p>
                        <footer className="mt-3 text-sm text-gray-400">{quote.context}</footer>
                      </blockquote>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`h-2 w-2 rounded-full mx-1 ${
                        index === currentQuote ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-200 mb-4">The Philosophy of Kier</h2>
                
                <div className="space-y-4 text-gray-300">
                  <p>
                    Kier Eagan's philosophical works form the foundation of Lumon's corporate culture 
                    and operational methodologies. His writings explore the relationship between the 
                    individual and the collective, the nature of work as a spiritual practice, and 
                    the concept of divided consciousness.
                  </p>
                  
                  <h3 className="text-lg font-medium text-gray-200 mt-6">The Four Tempers</h3>
                  <p>
                    Central to Kier's philosophy is the concept of the Four Tempers: Woe, Frolic, 
                    Dread, and Malice. These represent the fundamental emotional states that must 
                    be balanced within both the individual and the organization. When properly 
                    harmonized, they create what Kier called "the perfect workplace consciousness."
                  </p>
                  
                  <h3 className="text-lg font-medium text-gray-200 mt-6">Corporate Devotion</h3>
                  <p>
                    Kier believed that the modern corporation could serve as a spiritual home for 
                    its employees, providing not just material sustenance but also moral guidance 
                    and purpose. His vision of corporate devotion emphasizes loyalty, sacrifice, 
                    and the sublimation of individual desires for the greater good of the company.
                  </p>
                  
                  <h3 className="text-lg font-medium text-gray-200 mt-6">The Severed Mind</h3>
                  <p>
                    Though writing decades before the technology existed, Kier's explorations of 
                    divided consciousness presaged the development of the severance procedure. He 
                    theorized that the human mind could be compartmentalized to achieve greater 
                    focus and productivity, allowing for a purer work experience unclouded by 
                    outside concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>"The remembered man does not decay."</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kier;
