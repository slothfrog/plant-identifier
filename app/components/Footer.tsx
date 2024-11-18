// components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
    return (
      <footer className="bg-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Plant Identifier</h3>
              <p className="text-sm text-emerald-200">
                Your trusted companion for plant identification and care guidance.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-emerald-200 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-emerald-200 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-emerald-200 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-emerald-200 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-emerald-200">
                <li>Email: info@plantidentifier.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Botanical Garden St</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-emerald-200 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-emerald-200 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-emerald-200 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-emerald-700 text-center text-sm text-emerald-200">
            <p>&copy; {new Date().getFullYear()} Plant Identifier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;