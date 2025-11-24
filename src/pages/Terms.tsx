import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch the actual Terms & Conditions page
        const response = await fetch("https://www.admin.clickads.in/business-page/terms-and-conditions");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        // 2. Parse the HTML response
        const htmlString = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        // 3. Extract the content
        // Note: We attempt to find '.privacy-section' first as templates often reuse this class.
        // If null, we try to find a generic section or a specific '.terms-section'.
        let targetSection = doc.querySelector(".privacy-section") || doc.querySelector(".terms-section");

        if (targetSection) {
          setContent(targetSection.outerHTML);
        } else {
          setError("Could not locate the terms content. The page structure might have changed.");
        }
      } catch (err: any) {
        console.error("Error loading Terms:", err);
        setError(err.message || "Failed to load content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      {/* Custom CSS to ensure the extracted HTML looks perfect */}
      <style>{`
        /* Reset container inside extracted content */
        .extracted-html .container {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Typography Polish */
        .extracted-html h1, .extracted-html h2, .extracted-html h3 {
          color: #111827; /* gray-900 */
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .extracted-html h1 { font-size: 1.8rem; }
        .extracted-html h2 { font-size: 1.5rem; }
        
        .extracted-html p, .extracted-html li {
          color: #4b5563; /* gray-600 */
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .extracted-html ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .extracted-html strong {
          color: #2563eb; /* blue-600 */
        }
      `}</style>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          {/* Header Card */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Terms & <span className="text-blue-600">Conditions</span>
            </h1>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </div>

          {/* Content Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Loading State */}
            {isLoading && (
              <div className="p-20 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-500 font-medium animate-pulse">Loading terms...</p>
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
                  Try Again
                </button>
              </div>
            )}

            {/* Success State */}
            {!isLoading && !error && content && (
              <div className="p-8 md:p-12">
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

export default TermsAndConditions;