"use client";

import { BookOpen, Compass, Library, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#22324B]/80 bg-[#101827]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Pragya Home"
        >
          {/* Subtle antique gold monogram emblem */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#172235] text-[#D4AF37] transition-all duration-300 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)]">
            <BookOpen className="h-5 w-5 stroke-[1.75]" />
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#D4AF37]/80" />
          </div>

          <div className="flex flex-col">
            <span className="font-cinzel text-xl font-bold tracking-[0.24em] text-[#F5F0E6] transition-colors group-hover:text-[#D4AF37]">
              PRAGYA
            </span>
            <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8B9BB4] uppercase">
              Digital Library
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-[#F5F0E6] hover:text-[#D4AF37] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("explore-library")}
            className="flex items-center gap-1.5 text-[#8B9BB4] hover:text-[#F5F0E6] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          >
            <Compass className="h-4 w-4" />
            <span>Explore Library</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="flex items-center gap-1.5 text-[#8B9BB4] hover:text-[#F5F0E6] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          >
            <Sparkles className="h-4 w-4" />
            <span>The Pragya Method</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("featured")}
            className="flex items-center gap-1.5 text-[#8B9BB4] hover:text-[#F5F0E6] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          >
            <Library className="h-4 w-4" />
            <span>Curated Editions</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            onClick={() => scrollToSection("explore-library")}
            className="h-10 px-5 rounded-md border border-[#D4AF37]/50 bg-[#172235] text-[#D4AF37] font-medium text-sm hover:bg-[#D4AF37] hover:text-[#101827] hover:border-[#D4AF37] transition-all duration-200 shadow-sm cursor-pointer"
          >
            Start Reading
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-[#8B9BB4] hover:text-[#F5F0E6] hover:bg-[#172235] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D4AF37]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#22324B] bg-[#141D2E] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="text-left px-3 py-2 text-base font-medium text-[#F5F0E6] hover:bg-[#172235] rounded-md"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("explore-library")}
              className="text-left px-3 py-2 text-base font-medium text-[#8B9BB4] hover:text-[#F5F0E6] hover:bg-[#172235] rounded-md"
            >
              Explore Library
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("featured")}
              className="text-left px-3 py-2 text-base font-medium text-[#8B9BB4] hover:text-[#F5F0E6] hover:bg-[#172235] rounded-md"
            >
              Curated Editions
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className="text-left px-3 py-2 text-base font-medium text-[#8B9BB4] hover:text-[#F5F0E6] hover:bg-[#172235] rounded-md"
            >
              The Pragya Method
            </button>
          </div>
          <div className="pt-2 border-t border-[#22324B]">
            <Button
              onClick={() => scrollToSection("explore-library")}
              className="w-full h-11 bg-[#D4AF37] text-[#101827] font-semibold hover:bg-[#E5C358] transition-colors"
            >
              Explore All Books
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
