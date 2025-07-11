
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONSTANTS } from '@/lib/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { 
      name: 'Bootcamps', 
      path: '/bootcamps', 
      isSpecial: true,
      badge: 'NEW'
    },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/contact') {
      // If already on contact page, scroll to form
      const formSection = document.getElementById('enrollment-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to contact page with hash
      window.location.href = '/contact#enrollment-form';
    }
  };

  return (
    <>
      {/* New Batch Banner - Fixed positioning for all pages */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100 py-3 text-center h-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm md:text-base font-medium text-gray-700">
            🎓 <span className="font-bold text-blue-600">New Batch Starting {CONSTANTS.BATCH_START_DATE}</span> • 
            <span className="text-orange-600 font-semibold"> Limited Seats Available</span> • 
            <Link to="/contact" className="text-blue-600 hover:text-blue-800 underline font-semibold ml-2">
              Book a free demo →
            </Link>
          </p>
        </div>
      </div>

      <nav className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      } top-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo placeholder - will be animated from hero */}
            <div className="flex items-center space-x-3">
              {isScrolled && (
                <div className="animate-fade-in">
                  <img 
                    src="/lovable-uploads/a509da7d-f612-42d2-aca6-0d96eeece976.png" 
                    alt={`${CONSTANTS.COMPANY_NAME} Logo`} 
                    className="h-10 w-auto"
                  />
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    item.isSpecial
                      ? 'text-purple-600 hover:text-purple-700'
                      : isActive(item.path)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {item.name}
                    {item.isSpecial && (
                      <div className="flex items-center gap-1">
                        <Code className="h-4 w-4 text-purple-500" />
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  {isActive(item.path) && (
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full animate-fade-in ${
                      item.isSpecial 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                        : 'bg-gradient-to-r from-blue-600 to-green-500'
                    }`} />
                  )}
                </Link>
              ))}
              <button
                onClick={handleEnrollClick}
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Book a free demo
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      item.isSpecial
                        ? 'text-purple-600 bg-purple-50 hover:bg-purple-100'
                        : isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {item.isSpecial && (
                      <div className="flex items-center gap-1">
                        <Code className="h-4 w-4 text-purple-500" />
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
                <button
                  onClick={(e) => {
                    setIsOpen(false);
                    handleEnrollClick(e);
                  }}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-green-500 text-white px-3 py-2 rounded-md font-medium mt-4"
                >
                  Book a free demo
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
