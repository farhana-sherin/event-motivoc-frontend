import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="relative text-white font-sans border-t border-[#2D2D35]">
      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,0,85,0.05),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(112,0,255,0.05),transparent_45%)]" />

      <div className="w-[95%] max-w-7xl mx-auto relative pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(255,0,85,0.5)]">
                  M
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter">
                Moti<span className="text-[var(--color-primary)]">vok</span>
              </h1>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover and book the best events in your city. From workshops to conferences, we bring people together for unforgettable experiences.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
              <li><Link to="/auth/event/list" className="hover:text-[var(--color-primary)] transition-colors">All Events</Link></li>
              <li><Link to="/auth/view/all/booking" className="hover:text-[var(--color-primary)] transition-colors">My Bookings</Link></li>
              <li><Link to="/auth/support-ticket/create" className="hover:text-[var(--color-primary)] transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <span>(02) 574 - 328 - 301</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <span>hello@eventhub.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span>156 Innovation Blvd, Tech City</span>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a aria-label="Facebook" href="#" className="w-10 h-10 rounded-full bg-[#1E1E24] border border-[#2D2D35] flex items-center justify-center text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110 transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12.06C22 6.49 17.52 2 11.94 2 6.37 2 1.88 6.49 1.88 12.06c0 4.99 3.65 9.13 8.43 10v-7.07H7.9v-2.93h2.41V9.41c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.93h-2.22V22c4.79-.87 8.44-5.01 8.44-9.94z" /></svg>
              </a>
              <a aria-label="Twitter" href="#" className="w-10 h-10 rounded-full bg-[#1E1E24] border border-[#2D2D35] flex items-center justify-center text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110 transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a aria-label="Instagram" href="#" className="w-10 h-10 rounded-full bg-[#1E1E24] border border-[#2D2D35] flex items-center justify-center text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110 transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2D2D35] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} EventHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;