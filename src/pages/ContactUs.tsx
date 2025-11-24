import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://www.admin.clickads.in/page/contact-us");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const htmlString = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const targetSection = doc.querySelector(".contact-section");

        if (targetSection) {
          setContent(targetSection.outerHTML);
        } else {
          setError("Could not locate the contact details.");
        }
      } catch (err: any) {
        console.error("Error loading Contact Us:", err);
        setError(err.message || "Failed to load content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <style>{`
        /* 1. Import Icons */
        @import url('https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css');

        /* 2. Grid System Overrides (Making it responsive) */
        .extracted-html .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .extracted-html .row {
          display: flex;
          flex-wrap: wrap;
          margin: -15px;
          justify-content: center;
        }

        /* IMPORTANT: Override the API's 'col-6' class */
        .extracted-html .col-6 {
          padding: 15px;
          box-sizing: border-box;
        }

        /* Mobile: Stack items vertically (1 per row) */
        @media (max-width: 767px) {
          .extracted-html .col-6 {
            width: 100% !important;
            max-width: 100% !important;
            flex: 0 0 100%;
          }
        }

        /* Tablet: 2 per row */
        @media (min-width: 768px) and (max-width: 1023px) {
          .extracted-html .col-6 {
            width: 50% !important;
            flex: 0 0 50%;
          }
        }

        /* Desktop: 3 per row (looks cleaner than 2+1) */
        @media (min-width: 1024px) {
          .extracted-html .col-6 {
            width: 33.333% !important;
            flex: 0 0 33.333%;
          }
        }

        /* 3. Card Styling */
        .extracted-html .contact__item {
          background: #ffffff;
          padding: 40px 20px;
          border-radius: 20px;
          text-align: center;
          height: 100%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          border: 1px solid #f3f4f6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .extracted-html .contact__item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: #3b82f6;
        }

        /* 4. Icon Styling */
        .extracted-html .contact__item-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #eff6ff; /* blue-50 */
          color: #2563eb; /* blue-600 */
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .extracted-html .contact__item-icon i {
          font-size: 32px;
        }

        /* 5. Text Styling */
        .extracted-html .contact__item-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .extracted-html ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .extracted-html li {
          color: #4b5563;
          font-size: 1rem;
          line-height: 1.5;
        }

        /* 6. Specific Email Handling to keep it on one line */
        .extracted-html a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          
          /* Responsive font size: shrinks if screen is tiny */
          font-size: clamp(13px, 2.5vw, 16px); 
          
          /* Safety net: breaks word if absolutely necessary, prevents overflow */
          word-break: break-word; 
          overflow-wrap: anywhere;
          
          display: inline-block;
          transition: color 0.2s;
        }

        .extracted-html a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }
      `}</style>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We'd love to hear from you. Here is how you can reach us.
            </p>
          </div>

          {/* Content Wrapper */}
          <div className="w-full">
            
            {isLoading && (
              <div className="p-20 text-center bg-white rounded-2xl border border-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-500 font-medium animate-pulse">Fetching contact details...</p>
              </div>
            )}

            {error && (
              <div className="p-12 text-center bg-red-50 rounded-2xl">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Information Unavailable</h3>
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
              <div 
                className="extracted-html"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;