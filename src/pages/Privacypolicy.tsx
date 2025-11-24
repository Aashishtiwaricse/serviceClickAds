import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyContent = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch the Privacy Policy page
        const response = await fetch("https://www.admin.clickads.in/business-page/privacy-policy");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        // 2. Parse the HTML response
        const htmlString = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        // 3. Extract the specific section
        // The HTML provided shows the content is inside "privacy-section"
        const targetSection = doc.querySelector(".privacy-section");

        if (targetSection) {
          setContent(targetSection.outerHTML);
        } else {
          setError("Could not locate the privacy policy content.");
        }
      } catch (err: any) {
        console.error("Error loading Privacy Policy:", err);
        setError(err.message || "Failed to load content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacyContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      {/* Custom CSS to ensure the extracted HTML looks professional */}
      <style>{`
        /* Reset container inside extracted content to fit our card */
        .extracted-html .container {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Headings */
        .extracted-html h1 { 
          font-size: 1.8rem; 
          color: #111827; 
          font-weight: 800; 
          margin-top: 2.5rem; 
          margin-bottom: 1.25rem; 
        }
        
        .extracted-html h3 { 
          font-size: 1.4rem; 
          color: #374151; 
          font-weight: 700; 
          margin-top: 1.5rem; 
          margin-bottom: 0.75rem; 
        }

        /* Text & Lists */
        .extracted-html p {
          color: #4b5563; 
          line-height: 1.75; 
          margin-bottom: 1rem; 
        }

        .extracted-html ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #4b5563;
        }

        .extracted-html li {
          margin-bottom: 0.5rem;
        }

        /* Highlighted text (e.g., Last Updated) */
        .extracted-html strong {
          color: #2563eb; /* blue-600 */
        }

        /* Separators */
        .extracted-html hr {
          border-color: #e5e7eb;
          margin: 2rem 0;
        }
      `}</style>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Your privacy is important to us. Please read how we collect, use, and protect your data.
            </p>
          </div>

          {/* Content Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Loading State */}
            {isLoading && (
              <div className="p-20 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-500 font-medium animate-pulse">Fetching policy details...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-12 text-center bg-red-50">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Content Unavailable</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Success State - Display Content */}
            {!isLoading && !error && content && (
              <div className="p-8 md:p-12">
                {/* Using Tailwind Typography ('prose') + Custom Class ('extracted-html') */}
                <div 
                  className="extracted-html prose prose-lg prose-blue max-w-none"
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

export default PrivacyPolicy;