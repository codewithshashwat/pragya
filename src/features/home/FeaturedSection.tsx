import { ArrowRight, BookOpen, Clock, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MockBook } from "@/data/mockBooks";

interface FeaturedSectionProps {
  featuredBooks: MockBook[];
  onSelectBook: (book: MockBook) => void;
}

export function FeaturedSection({
  featuredBooks,
  onSelectBook,
}: FeaturedSectionProps) {
  const primaryBook = featuredBooks[0];
  const secondaryBooks = featuredBooks.slice(1, 3);

  if (!primaryBook) return null;

  return (
    <section
      id="featured"
      className="py-16 sm:py-24 border-b border-[#22324B]/70 bg-[#0E1523]/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase font-cinzel tracking-[0.24em] text-[#D4AF37] mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Masterpieces</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E6] tracking-tight">
              Featured Volumes
            </h2>
          </div>
          <p className="text-sm text-[#8B9BB4] max-w-md">
            Timeless canonical treatises chosen for their enduring clarity and
            the depth of thought they inspire.
          </p>
        </div>

        {/* Featured Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Primary Spotlight Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-[#22324B] bg-[#172235] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  Featured Volume of the Week
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10">
                  {primaryBook.category}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors leading-tight">
                {primaryBook.title}
              </h3>

              <p className="font-cinzel text-sm text-[#CBD5E1] tracking-[0.15em] uppercase font-medium mt-1 mb-5">
                By {primaryBook.author}
              </p>

              <p className="text-sm sm:text-base text-[#8B9BB4] leading-relaxed mb-6">
                {primaryBook.description}
              </p>

              {/* Featured Quote Callout */}
              {primaryBook.quote && (
                <div className="rounded-xl border border-[#22324B] bg-[#101827]/70 p-4 sm:p-5 mb-6 relative">
                  <Quote className="h-5 w-5 text-[#D4AF37]/50 mb-2" />
                  <p className="font-serif-reading text-sm italic text-[#F5F0E6] leading-relaxed">
                    “{primaryBook.quote}”
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#22324B]/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5 text-xs text-[#8B9BB4]">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                  <span>{primaryBook.chaptersCount} Chapters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#D4AF37]" />
                  <span>{primaryBook.estimatedReadingTime}</span>
                </div>
              </div>

              <Button
                onClick={() => onSelectBook(primaryBook)}
                className="h-10 px-5 rounded-md bg-[#D4AF37] text-[#101827] font-semibold text-xs hover:bg-[#E5C358] transition-colors cursor-pointer"
              >
                <span>Read Volume</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Secondary Spotlight Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryBooks.map((book) => (
              <div
                key={book.id}
                className="flex-1 rounded-xl border border-[#22324B] bg-[#172235]/80 p-6 flex flex-col justify-between hover:border-[#D4AF37]/40 hover:bg-[#172235] transition-all duration-300 shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-cinzel tracking-wider uppercase text-[#D4AF37]">
                      {book.category}
                    </span>
                    <span className="text-[#8B9BB4]">
                      {book.estimatedReadingTime}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors">
                    {book.title}
                  </h4>

                  <p className="font-cinzel text-xs text-[#CBD5E1] uppercase tracking-wider mt-0.5 mb-3">
                    {book.author}
                  </p>

                  <p className="text-xs text-[#8B9BB4] line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#22324B]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#8B9BB4]">
                    {book.chaptersCount} Canonical Chapters
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectBook(book)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#E5C358] transition-colors cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
