'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { AmbientSoundscape } from './ambient-soundscape';
import { MagneticButton } from './magnetic-button';

const NAV_LINKS = [
  { href: '/luxury', label: 'Maison' },
  { href: '/luxury/works', label: 'Selected Works' },
  { href: '/luxury/services', label: 'Disciplines' },
  { href: '/luxury/lab', label: 'Sensorial Lab' },
  { href: '/luxury/about', label: 'Heritage' },
  { href: '/luxury/journal', label: 'Journal' },
  { href: '/luxury/contact', label: 'Private Salon' },
];

export function LuxuryNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(true);

  // Scroll detection to shrink and blur nav
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme with document element
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Close mobile menu on Escape
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/luxury') return pathname === '/luxury';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
          isScrolled
            ? 'h-16 sm:h-20 bg-background/90 backdrop-blur-xl border-b border-[var(--dp-rule,rgba(197,160,89,0.18))] shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
            : 'h-24 sm:h-28 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          {/* Maison Monogram & Wordmark */}
          <Link
            href="/luxury"
            className="group flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)] rounded"
            aria-label="Atelier Véricourt Home"
          >
            {/* Custom SVG Monogram Emblem */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--dp-gold,#c5a059)]/40 flex items-center justify-center p-1 group-hover:border-[var(--dp-gold,#c5a059)] transition-colors duration-300">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[var(--dp-gold,#c5a059)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="46" strokeDasharray="3 3" opacity="0.6" />
                <path d="M28 32 L50 78 L72 32" strokeWidth="5" strokeLinecap="round" />
                <path d="M38 48 L62 48" strokeWidth="3" opacity="0.8" />
                <circle cx="50" cy="24" r="3" fill="currentColor" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-serif tracking-[0.24em] uppercase text-sm sm:text-base font-semibold text-foreground group-hover:text-[var(--dp-gold,#c5a059)] transition-colors duration-300">
                Atelier Véricourt
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-foreground/50">
                Haute Conception
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Atelier Main Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs tracking-[0.22em] uppercase font-sans transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-[var(--dp-gold,#c5a059)] font-semibold'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[var(--dp-gold,#c5a059)] origin-left transition-transform duration-300 ease-out ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Utilities & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Ambient Soundscape Synthesizer */}
            <AmbientSoundscape />

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-full border border-[var(--dp-rule,rgba(197,160,89,0.2))] text-foreground/70 hover:text-[var(--dp-gold,#c5a059)] hover:border-[var(--dp-gold,#c5a059)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
              aria-label={isDark ? 'Switch to Alabaster Silk light mode' : 'Switch to Obsidian Noir dark mode'}
              title={isDark ? 'Alabaster Silk light mode' : 'Obsidian Noir dark mode'}
            >
              {isDark ? (
                <Sun size={15} className="text-[var(--dp-gold,#c5a059)]" aria-hidden="true" />
              ) : (
                <Moon size={15} className="text-foreground/80" aria-hidden="true" />
              )}
            </button>

            {/* Magnetic Private Salon CTA */}
            <div className="hidden lg:block">
              <MagneticButton strength={0.25}>
                <Link
                  href="/luxury/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/10 px-5 py-2 text-xs font-medium tracking-[0.18em] uppercase text-[var(--dp-gold,#c5a059)] hover:bg-[var(--dp-gold,#c5a059)] hover:text-black transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
                >
                  Book Private Salon
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded border border-[var(--dp-rule,rgba(197,160,89,0.2))] text-foreground/80 hover:text-[var(--dp-gold,#c5a059)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold,#c5a059)]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col p-6 animate-in fade-in duration-200"
        >
          <nav className="flex flex-col gap-6 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xl font-serif tracking-[0.16em] uppercase transition-colors ${
                  isActive(link.href)
                    ? 'text-[var(--dp-gold,#c5a059)] font-bold'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6 border-t border-[var(--dp-rule,rgba(197,160,89,0.2))]">
              <Link
                href="/luxury/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center rounded-full bg-[var(--dp-gold,#c5a059)] px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-black"
              >
                Book Private Salon
              </Link>

              <div className="mt-8 text-center">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs text-foreground/50 hover:text-foreground underline underline-offset-4"
                >
                  Return to Digital Pandharpur Heritage Platform →
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
