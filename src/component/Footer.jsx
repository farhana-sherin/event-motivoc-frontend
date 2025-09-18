import React from 'react'

export const Footer = () => {
  return (
    <footer className="relative bg-[#0c1030] text-gray-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.05),transparent_45%)]" />
      <div className="w-[95%] max-w-7xl mx-auto relative">
        {/* Newsletter row at top of footer */}
        
        <div className="border-t border-indigo-800/30" />
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
          <div className="flex items-center gap-2 select-none">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md flex items-center justify-center ring-1 ring-white/30">
                <span className="font-bold">M</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Motivoc</h1>
            </div>
            <p className="mt-3 text-gray-400">Discover, book, and enjoy the best events around you.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white" href="#">About</a></li>
              <li><a className="hover:text-white" href="#">Blog</a></li>
              <li><a className="hover:text-white" href="#">Venue</a></li>
              <li><a className="hover:text-white" href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">(02) 574 - 328 - 301</li>
              <li className="text-gray-400">support@example.com</li>
              <li className="text-gray-400">156 Michael Ct, Anchorage</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Our Social</h4>
            <div className="flex items-center gap-3">
              <a aria-label="Facebook" href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M22 12.06C22 6.49 17.52 2 11.94 2 6.37 2 1.88 6.49 1.88 12.06c0 4.99 3.65 9.13 8.43 10v-7.07H7.9v-2.93h2.41V9.41c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.93h-2.22V22c4.79-.87 8.44-5.01 8.44-9.94z"/>
                </svg>
              </a>
              <a aria-label="X / Twitter" href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M3 3h4.6l4.66 6.4L16.7 3H21l-7.2 9.72L21.6 21h-4.6l-5.01-6.89L7.3 21H3l7.6-10.14L3 3z"/>
                </svg>
              </a>
              <a aria-label="LinkedIn" href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.05h.07c.67-1.27 2.3-2.6 4.72-2.6 5.05 0 5.98 3.32 5.98 7.64V24h-5v-6.69c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V24h-4.75V8.98z"/>
                </svg>
              </a>
              <a aria-label="Instagram" href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4.61.21 1.04.46 1.49.91.45.45.7.88.91 1.49.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.4 2.43-.21.61-.46 1.04-.91 1.49-.45.45-.88.7-1.49.91-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.04 4.04 0 0 1-1.49-.91 4.04 4.04 0 0 1-.91-1.49c-.16-.46-.35-1.26-.4-2.43C2.17 15.58 2.16 15.2 2.16 12s.012-3.584.07-4.85c.054-1.17.24-1.97.4-2.43.21-.61.46-1.04.91-1.49.45-.45.88-.7 1.49-.91.46-.16 1.26-.35 2.43-.4C8.42 2.17 8.8 2.16 12 2.16Zm0 1.68c-3.15 0-3.52.012-4.76.07-.98.045-1.51.21-1.86.35-.47.18-.8.39-1.15.74-.35.35-.56.68-.74 1.15-.14.35-.31.88-.35 1.86-.06 1.24-.07 1.61-.07 4.76s.012 3.52.07 4.76c.045.98.21 1.51.35 1.86.18.47.39.8.74 1.15.35.35.68.56 1.15.74.35.14.88.31 1.86.35 1.24.06 1.61.07 4.76.07s3.52-.012 4.76-.07c.98-.045 1.51-.21 1.86-.35.47-.18.8-.39 1.15-.74.35-.35.56-.68.74-1.15.14-.35.31-.88.35-1.86.06-1.24.07-1.61.07-4.76s-.012-3.52-.07-4.76c-.045-.98-.21-1.51-.35-1.86a2.36 2.36 0 0 0-.74-1.15 2.36 2.36 0 0 0-1.15-.74c-.35-.14-.88-.31-1.86-.35-1.24-.06-1.61-.07-4.76-.07Zm0 3.27a6.57 6.57 0 1 1 0 13.14 6.57 6.57 0 0 1 0-13.14Zm0 1.68a4.89 4.89 0 1 0 0 9.78 4.89 4.89 0 0 0 0-9.78Zm6.92-2.03a1.54 1.54 0 1 1 0 3.08 1.54 1.54 0 0 1 0-3.08Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-indigo-800/30 pt-6 flex justify-between items-center gap-2 mb-10">
         
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-white">Teams & Conditions</a>
            <span className="text-indigo-700">|</span>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
          <p className="text-xs text-gray-500">Copyright © {new Date().getFullYear()} Motivec Demo3. All Rights Reserved.</p>
        </div>
      </div>

      <a href="#top" className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md absolute right-5 bottom-5">↑</a>
    </footer>
  )
}
