"use client";

import { useMemo, useState } from "react";
import { BookPreviewModal } from "@/components/books/BookPreviewModal";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MOCK_BOOKS, type MockBook } from "@/data/mockBooks";
import { FeaturedSection } from "@/features/home/FeaturedSection";
import { HeroSection } from "@/features/home/HeroSection";
import { LibraryDiscoverySection } from "@/features/home/LibraryDiscoverySection";
import { ProductFeaturesSection } from "@/features/home/ProductFeaturesSection";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<MockBook | null>(null);

  const featuredBooks = useMemo(() => {
    return MOCK_BOOKS.filter((b) => b.featured);
  }, []);

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101827] text-[#F5F0E6]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          onExplore={() => handleScrollTo("explore-library")}
          onStartReading={() => handleScrollTo("featured")}
        />

        {/* Featured Curated Editions */}
        <FeaturedSection
          featuredBooks={featuredBooks}
          onSelectBook={(book) => setSelectedBook(book)}
        />

        {/* Library Discovery: Search & Filterable Stacks */}
        <LibraryDiscoverySection
          books={MOCK_BOOKS}
          onSelectBook={(book) => setSelectedBook(book)}
        />

        {/* Pragya Method & Product Architecture */}
        <ProductFeaturesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Book Inspection Dialog */}
      <BookPreviewModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
