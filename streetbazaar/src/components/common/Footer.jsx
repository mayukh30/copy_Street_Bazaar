import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp 
} from 'lucide-react';

const Footer = ({
  companyName = "Your Company",
  description = "Building amazing products and experiences for our customers.",
  links = {},
  socialLinks = {},
  contactInfo = {},
  showNewsletter = true,
  showBackToTop = true,
  copyrightText = ""
}) => {
  const defaultLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'News', href: '#' }
    ],
    services: [
      { name: 'Web Development', href: '#' },
      { name: 'Mobile Apps', href: '#' },
      { name: 'Consulting', href: '#' },
      { name: 'Support', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

  const defaultSocialLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
    github: '#'
  };

  const defaultContactInfo = {
    email: 'hello@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345'
  };

  const footerLinks = Object.keys(links).length > 0 ? links : defaultLinks;
  const socials = Object.keys(socialLinks).length > 0 ? socialLinks : defaultSocialLinks;
  const contact = Object.keys(contactInfo).length > 0 ? contactInfo : defaultContactInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socials.facebook && (
                <a 
                  href={socials.facebook} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socials.twitter && (
                <a 
                  href={socials.twitter} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socials.instagram && (
                <a 
                  href={socials.instagram} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socials.linkedin && (
                <a 
                  href={socials.linkedin} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socials.github && (
                <a 
                  href={socials.github} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, categoryLinks]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              {contact.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <span className="text-gray-300">{contact.address}</span>
                </div>
              )}
            </div>

            {/* Newsletter Signup */}
            {showNewsletter && (
              <div>
                <h5 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h5>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{copyright}</p>
            
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="mt-4 sm:mt-0 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="text-sm">Back to top</span>
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;