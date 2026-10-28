import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Highlighter,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onExplore: () => void;
  onStartReading: () => void;
}

export function HeroSection({ onExplore, onStartReading }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-[#22324B]/70"
    >
      {/* Ambient background depth lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Editorial Headline Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Subtle Cinzel Tagline */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/30 bg-[#172235]/80 px-3.5 py-1 text-xs backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="font-cinzel tracking-[0.25em] text-[#D4AF37] font-semibold text-[11px] uppercase">
                Read • Reflect • Retain
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F0E6] leading-[1.12]">
              Build Your Personal{" "}
              <span className="italic text-[#D4AF37]">Knowledge</span> Library.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#8B9BB4] max-w-2xl leading-relaxed font-sans">
              A serene digital sanctuary for focused reading and enduring
              scholarship. Read foundational books, reflect with private margin
              annotations, and retain wisdom through your own uncompromised
              personal editions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={onExplore}
                className="h-12 px-7 rounded-md bg-[#D4AF37] text-[#101827] font-semibold text-sm hover:bg-[#E5C358] transition-all shadow-[0_4px_16px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                <span>Explore Library</span>
                <ArrowRight className="ml-2 h-4 w-4 stroke-[2.2]" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onStartReading}
                className="h-12 px-6 rounded-md border-[#22324B] bg-[#172235]/70 text-[#F5F0E6] hover:bg-[#172235] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all cursor-pointer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Start Reading</span>
              </Button>
            </div>

            {/* Value affirmations */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#22324B]/60 w-full max-w-lg">
              <div>
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#F5F0E6]">
                  100%
                </div>
                <div className="text-xs text-[#8B9BB4] mt-0.5">
                  Private Copies
                </div>
              </div>
              <div>
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#D4AF37]">
                  0
                </div>
                <div className="text-xs text-[#8B9BB4] mt-0.5">
                  Distractions
                </div>
              </div>
              <div>
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#F5F0E6]">
                  Infinite
                </div>
                <div className="text-xs text-[#8B9BB4] mt-0.5">
                  Personal Retention
                </div>
              </div>
            </div>
          </div>

          {/* Visual Composition: Scholarly Personal Folio Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient gold glow under the manuscript */}
            <div className="absolute inset-0 bg-[#D4AF37]/10 blur-2xl rounded-full scale-90 -z-10" />

            {/* Folio Window */}
            <div className="w-full max-w-md rounded-2xl border border-[#22324B] bg-[#172235] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-7 relative overflow-hidden">
              {/* Folio Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#22324B]/70">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <span className="font-cinzel text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                    Marcus Aurelius • Book II
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8B9BB4]">
                  <Bookmark className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Private Copy</span>
                </div>
              </div>

              {/* Reader Text Sample */}
              <div className="space-y-4">
                <h4 className="font-display text-xl font-bold text-[#F5F0E6] leading-tight">
                  On the Nature of the Mind
                </h4>

                <p className="font-serif-reading text-sm text-[#CBD5E1] leading-relaxed">
                  When you wake up in the morning, tell yourself: The people I
                  deal with today will be meddling, ungrateful, arrogant,
                  dishonest, jealous, and surly. They are like this because they
                  cannot distinguish good from evil.
                </p>

                {/* Highlighted passage with personal reflection */}
                <div className="rounded-lg border-l-2 border-[#D4AF37] bg-[#D4AF37]/10 p-3.5 my-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#D4AF37] mb-1">
                    <Highlighter className="h-3 w-3" />
                    <span>Smart Highlight • Stoic Discipline</span>
                  </div>
                  <p className="font-serif-reading text-xs italic text-[#F5F0E6] leading-relaxed">
                    “None of them can hurt me. No one can implicate me in
                    ugliness. Nor can I feel angry at my fellow citizen.”
                  </p>
                </div>

                {/* Personal Margin Note Card */}
                <div className="rounded-lg border border-[#22324B] bg-[#101827]/80 p-3 flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] text-[#8B9BB4] mb-1">
                      <span className="font-medium text-[#D4AF37]">
                        My Reflection
                      </span>
                      <span>Saved just now</span>
                    </div>
                    <p className="text-xs text-[#CBD5E1] leading-snug">
                      Internal sovereignty: others can dictate their behavior,
                      never my emotional reaction to it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reader status bar */}
              <div className="mt-5 pt-3 border-t border-[#22324B]/70 flex items-center justify-between text-[11px] text-[#8B9BB4]">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Reading Progress: 42%</span>
                </div>
                <span className="font-cinzel text-[10px] tracking-wider text-[#CBD5E1]">
                  Chapter 2 of 12
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
