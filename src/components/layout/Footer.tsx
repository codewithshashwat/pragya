import { BookOpen } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#22324B] bg-[#0B111D] text-[#8B9BB4] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#22324B]/70">
          {/* Brand & Tagline */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#D4AF37]/40 bg-[#172235] text-[#D4AF37]">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-cinzel text-lg font-bold tracking-[0.22em] text-[#F5F0E6]">
                PRAGYA
              </span>
            </div>

            <p className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              Read. Reflect. Retain.
            </p>

            <p className="text-xs text-[#8B9BB4] max-w-sm mt-1">
              A serene digital library engineered for quiet reading, reflective
              scholarship, and personal knowledge preservation.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap gap-x-8 gap-y-3 text-xs"
          >
            <Link
              href="#hero"
              className="text-[#CBD5E1] hover:text-[#D4AF37] transition-colors"
            >
              Overview
            </Link>
            <Link
              href="#explore-library"
              className="text-[#CBD5E1] hover:text-[#D4AF37] transition-colors"
            >
              Explore Library
            </Link>
            <Link
              href="#featured"
              className="text-[#CBD5E1] hover:text-[#D4AF37] transition-colors"
            >
              Curated Editions
            </Link>
            <Link
              href="#features"
              className="text-[#CBD5E1] hover:text-[#D4AF37] transition-colors"
            >
              The Pragya Method
            </Link>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8B9BB4] gap-4">
          <p>
            © {new Date().getFullYear()} Pragya. Built with Next.js & Mongoose.
            Private knowledge edition.
          </p>

          <p className="font-cinzel text-[10px] tracking-widest uppercase text-[#8B9BB4]">
            Knowledge • Understanding • Wisdom
          </p>
        </div>
      </div>
    </footer>
  );
}
