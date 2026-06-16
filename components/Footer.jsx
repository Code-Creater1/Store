export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white">NovaCart</h2>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              For 20 years, we’ve been a top retail chain specializing in
              watches, glasses, and jewelry. We bring premium quality products
              with trust and style.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Our Story</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Search</li>
              <li className="hover:text-white cursor-pointer">Bulk Order</li>
              <li className="hover:text-white cursor-pointer">Offers</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <p className="text-sm text-gray-400">
              Shop # G-13, Ground Floor Dolmen Mall, Hyderi
            </p>
            <p className="mt-2 text-sm text-gray-400">+92 334 0111155</p>
            <p className="mt-2 text-sm text-gray-400">support@novacart.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} NovaCart. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}