// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-emerald-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Plant Identifier
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-emerald-200 transition-colors">
              Home
            </Link>
            <Link href="/identify" className="hover:text-emerald-200 transition-colors">
              Identify
            </Link>
            <Link href="/guide" className="hover:text-emerald-200 transition-colors">
              Plant Guide
            </Link>
            <Link href="/about" className="hover:text-emerald-200 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-emerald-200 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

