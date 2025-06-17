
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Koby Digital. All rights reserved.
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a 
              href="https://facebook.com/kobylarry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://x.com/@koby_larry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://instagram.com/koby_larry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link 
              to="/disclaimer" 
              className="hover:text-purple-300 transition-colors"
            >
              Disclaimer
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-purple-300 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
