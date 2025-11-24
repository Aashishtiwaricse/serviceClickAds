import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://admin.workwaale.in/business-page/about-us");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const htmlString = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        
        // Extract the section
        const targetSection = doc.querySelector(".privacy-section");

        if (targetSection) {
          setContent(targetSection.outerHTML);
        } else {
          setError("Content not found");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      
      {/* Custom Styles for the injected HTML */}
      <style>{`
        /* Override Bootstrap container behavior inside the extraction */
        .extracted-html .container {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
        }
        
        /* Custom styling for specific elements in the raw HTML */
        .extracted-html h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .extracted-html p {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        /* Highlight the brand name 'WorkWaale' usually inside strong tags */
        .extracted-html strong {
          color: #2563eb; /* Blue-600 */
        }

        .extracted-html hr {
          border-color: #e5e7eb;
          margin: 2rem 0;
        }
      `}</style>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          {/* Page Title Card */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              About <span className="text-blue-600">Us</span>
            </h1>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Content Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            {isLoading && (
              <div className="p-20 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-500 font-medium animate-pulse">Fetching details...</p>
              </div>
            )}

            {error && (
              <div className="p-12 text-center bg-red-50">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-red-600">⚠️</span>
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Unable to Load Content</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && content && (
              <div className="p-8 md:p-12">
                {/* We use 'prose' (Tailwind Typography) to auto-format the HTML.
                  We also add 'extracted-html' to hook into our custom CSS overrides above.
                */}
                <div 
                  className="extracted-html prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-p:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;