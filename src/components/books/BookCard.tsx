import {
  BookOpen,
  Clock,
  Compass,
  Crown,
  Eye,
  Flame,
  Hourglass,
  Layers,
  Leaf,
  PenTool,
} from "lucide-react";
import type { MockBook } from "@/data/mockBooks";

interface BookCardProps {
  book: MockBook;
  onSelect?: (book: MockBook) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  const renderCoverIcon = (icon: MockBook["coverTheme"]["icon"]) => {
    const iconClass = "h-7 w-7 stroke-[1.25]";
    switch (icon) {
      case "pillar":
        return <Layers className={iconClass} />;
      case "compass":
        return <Compass className={iconClass} />;
      case "quill":
        return <PenTool className={iconClass} />;
      case "leaf":
        return <Leaf className={iconClass} />;
      case "crown":
        return <Crown className={iconClass} />;
      case "hourglass":
        return <Hourglass className={iconClass} />;
      case "eye":
        return <Eye className={iconClass} />;
      case "flame":
        return <Flame className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <article
      className="group relative flex flex-col rounded-xl border border-[#22324B] bg-[#172235]/60 hover:bg-[#172235] transition-all duration-300 hover:border-[#D4AF37]/40 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5),0_0_16px_-4px_rgba(212,175,55,0.15)] overflow-hidden"
      aria-label={`${book.title} by ${book.author}`}
    >
      {/* Visual Book Cover Canvas */}
      <div
        className={`relative aspect-[3/4] w-full bg-gradient-to-b ${book.coverTheme.bgGradient} p-6 flex flex-col justify-between overflow-hidden border-b border-[#22324B]/70 book-spine-shadow select-none`}
      >
        {/* Subtle foil grid line accents */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04]" />
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#D4AF37]/15 rounded pointer-events-none" />

        {/* Top spine / edition badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/80 font-medium">
            {book.category}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/60" />
        </div>

        {/* Centerpiece title & motif */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto px-2">
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#101827]/60 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110 shadow-inner"
            style={{ color: book.coverTheme.accentColor }}
          >
            {renderCoverIcon(book.coverTheme.icon)}
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
            {book.title}
          </h3>

          <p className="font-cinzel mt-2 text-xs tracking-[0.18em] text-[#CBD5E1] uppercase font-medium">
            {book.author}
          </p>
        </div>

        {/* Cover bottom metadata stamp */}
        <div className="relative z-10 text-center">
          <p className="font-cinzel text-[9px] tracking-[0.22em] text-[#8B9BB4] uppercase truncate">
            {book.coverTheme.editionLabel ?? "Pragya Classical Edition"}
          </p>
        </div>
      </div>

      {/* Book details & reader controls */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-[#8B9BB4] line-clamp-2 leading-relaxed mb-4">
          {book.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#22324B]/60 text-[11px] text-[#8B9BB4]">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>{book.chaptersCount} Chapters</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>{book.estimatedReadingTime}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect?.(book)}
          className="mt-4 w-full h-9 rounded-md border border-[#22324B] bg-[#101827]/70 text-[#F5F0E6] text-xs font-medium tracking-wide flex items-center justify-center gap-2 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] cursor-pointer"
        >
          <span>Open in Reader</span>
          <BookOpen className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
