"use client";

import { BookOpen, CheckCircle2, Clock, Layers, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MockBook } from "@/data/mockBooks";

interface BookPreviewModalProps {
  book: MockBook | null;
  onClose: () => void;
}

export function BookPreviewModal({ book, onClose }: BookPreviewModalProps) {
  if (!book) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0F19]/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#22324B] bg-[#172235] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8B9BB4] hover:text-[#F5F0E6] hover:bg-[#101827] rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
              {book.category} Edition
            </span>
            <span className="h-1 w-1 rounded-full bg-[#8B9BB4]" />
            <span className="text-xs text-[#8B9BB4]">
              {book.coverTheme.editionLabel ?? "Canonical Pragya Edition"}
            </span>
          </div>

          <div>
            <h2
              id="modal-book-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0E6] leading-snug"
            >
              {book.title}
            </h2>
            <p className="font-cinzel text-sm text-[#D4AF37] tracking-[0.16em] uppercase mt-1">
              By {book.author}
            </p>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            {book.description}
          </p>

          {/* Book Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-[#22324B] bg-[#101827]/70 text-xs">
            <div>
              <span className="text-[#8B9BB4] block">Structure</span>
              <span className="text-[#F5F0E6] font-semibold flex items-center gap-1.5 mt-0.5">
                <Layers className="h-3.5 w-3.5 text-[#D4AF37]" />
                {book.chaptersCount} Chapters
              </span>
            </div>

            <div>
              <span className="text-[#8B9BB4] block">Duration</span>
              <span className="text-[#F5F0E6] font-semibold flex items-center gap-1.5 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                {book.estimatedReadingTime}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#8B9BB4] block">Architecture</span>
              <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5 mt-0.5">
                <Shield className="h-3.5 w-3.5 text-[#D4AF37]" />
                Copy-on-Write
              </span>
            </div>
          </div>

          {/* Privacy & Copy Guarantee */}
          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-3.5 text-xs text-[#CBD5E1] flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#D4AF37]">
                Private Scholarly Copy:
              </span>{" "}
              Reading or annotating this volume creates your private personal
              edition. The canonical original is never touched or overwritten.
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-[#22324B]">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto border-[#22324B] text-[#CBD5E1] hover:bg-[#101827] hover:text-[#F5F0E6]"
            >
              Back to Catalog
            </Button>

            <Button
              onClick={() => {
                alert(
                  `“${book.title}” is ready for reading! Reader & Annotation UI is arriving in Phase 4.`,
                );
                onClose();
              }}
              className="w-full sm:w-auto bg-[#D4AF37] text-[#101827] font-semibold hover:bg-[#E5C358]"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Begin Reading</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
