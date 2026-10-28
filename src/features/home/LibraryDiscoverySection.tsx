"use client";

import { BookX, Filter, RotateCcw, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BookCategory, CATEGORIES, type MockBook } from "@/data/mockBooks";

interface LibraryDiscoverySectionProps {
  books: MockBook[];
  onSelectBook: (book: MockBook) => void;
}

export function LibraryDiscoverySection({
  books,
  onSelectBook,
}: LibraryDiscoverySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>("All");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [books, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <section id="explore-library" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase font-cinzel tracking-[0.24em] text-[#D4AF37] mb-2">
            <Filter className="h-3.5 w-3.5" />
            <span>The Stacks</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E6] tracking-tight">
            Explore the Library
          </h2>
          <p className="mt-3 text-sm text-[#8B9BB4] leading-relaxed">
            Search canonical volumes across philosophy, classical literature,
            and profound historic thought.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B9BB4]" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, philosophy, or keywords (e.g. 'Stoic', 'Darwin', 'Plato')..."
              className="h-12 pl-12 pr-10 rounded-xl border-[#22324B] bg-[#172235]/90 text-sm text-[#F5F0E6] placeholder:text-[#8B9BB4]/60 focus-visible:ring-1 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B9BB4] hover:text-[#F5F0E6] p-1"
                aria-label="Clear search query"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? "bg-[#D4AF37] text-[#101827] font-semibold shadow-sm"
                      : "bg-[#172235]/70 text-[#CBD5E1] border border-[#22324B] hover:border-[#D4AF37]/40 hover:text-[#F5F0E6]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Filter Status */}
          <div className="flex items-center justify-between text-xs text-[#8B9BB4] px-1 pt-2">
            <span>
              Showing {filteredBooks.length}{" "}
              {filteredBooks.length === 1 ? "volume" : "volumes"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery.trim() && ` matching “${searchQuery.trim()}”`}
            </span>

            {(searchQuery || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={(b) => onSelectBook(b)}
              />
            ))}
          </div>
        ) : (
          /* Empty / No Results State */
          <div className="rounded-2xl border border-dashed border-[#22324B] bg-[#172235]/30 p-12 text-center max-w-xl mx-auto my-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#22324B] bg-[#172235] text-[#8B9BB4] mb-4">
              <BookX className="h-6 w-6 text-[#D4AF37]/60" />
            </div>

            <h3 className="font-display text-xl font-bold text-[#F5F0E6] mb-2">
              No volumes found
            </h3>

            <p className="text-xs sm:text-sm text-[#8B9BB4] leading-relaxed mb-6">
              No books in the current stacks match your criteria. Try adjusting
              your search keywords or selecting a broader category.
            </p>

            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-[#22324B] bg-[#172235] text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              <span>Show All Volumes</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
