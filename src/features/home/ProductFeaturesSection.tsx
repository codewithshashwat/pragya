import {
  BookmarkCheck,
  Highlighter,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function ProductFeaturesSection() {
  const features = [
    {
      icon: <Highlighter className="h-6 w-6 text-[#D4AF37]" />,
      title: "Smart Highlights",
      tagline: "Mark what matters",
      description:
        "Capture pivotal insights with clean text emphasis. Organize passages by thematic focus for rapid retrieval during study and writing.",
    },
    {
      icon: <MessageSquareText className="h-6 w-6 text-[#D4AF37]" />,
      title: "Personal Notes",
      tagline: "Engage in dialogue with the author",
      description:
        "Jot down private margin reflections directly inside chapters. Your thoughts live exclusively on your personal copy and never touch the canonical text.",
    },
    {
      icon: <BookmarkCheck className="h-6 w-6 text-[#D4AF37]" />,
      title: "Reading Progress",
      tagline: "Never lose your place",
      description:
        "Seamless chapter tracking and scroll position retention. Resume reading right where your train of thought paused, across any device.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />,
      title: "Knowledge Vault",
      tagline: "Complete isolation & ownership",
      description:
        "Private Copy-on-Write architecture ensures your customized editions remain strictly confidential, preserved, and unalterable by external updates.",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 sm:py-24 border-t border-b border-[#22324B]/70 bg-[#0E1523]/60 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase font-cinzel tracking-[0.24em] text-[#D4AF37] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Pragya Method</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E6] tracking-tight">
            Designed for Thoughtful Readers
          </h2>
          <p className="mt-3 text-sm text-[#8B9BB4] leading-relaxed">
            A quiet architecture engineered around deep retention rather than
            algorithmic stimulation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#22324B] bg-[#172235]/80 p-6 sm:p-7 flex flex-col justify-between hover:border-[#D4AF37]/40 hover:bg-[#172235] transition-all duration-300 group shadow-md"
            >
              <div>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#101827] text-[#D4AF37] group-hover:scale-105 group-hover:border-[#D4AF37] transition-all">
                  {feature.icon}
                </div>

                <h3 className="font-display text-xl font-bold text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors mb-1">
                  {feature.title}
                </h3>

                <p className="font-cinzel text-[11px] uppercase tracking-wider text-[#D4AF37]/90 mb-3 font-medium">
                  {feature.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#8B9BB4] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#22324B]/50 flex items-center justify-between text-[11px] text-[#8B9BB4]">
                <span className="font-cinzel tracking-wider text-[10px] uppercase">
                  Private & Secure
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
