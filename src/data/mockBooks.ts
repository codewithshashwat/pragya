export type BookCategory =
  | "All"
  | "Philosophy"
  | "Literature"
  | "Science & Nature"
  | "History & Thought"
  | "Psychology";

export interface MockBook {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: Exclude<BookCategory, "All">;
  description: string;
  featured: boolean;
  quote?: string;
  chaptersCount: number;
  estimatedReadingTime: string;
  coverTheme: {
    bgGradient: string;
    accentColor: string;
    icon:
      | "pillar"
      | "compass"
      | "quill"
      | "leaf"
      | "crown"
      | "hourglass"
      | "eye"
      | "flame";
    editionLabel?: string;
  };
  tags: string[];
}

export const CATEGORIES: BookCategory[] = [
  "All",
  "Philosophy",
  "Literature",
  "Science & Nature",
  "History & Thought",
  "Psychology",
];

export const MOCK_BOOKS: MockBook[] = [
  {
    id: "book-1",
    slug: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    description:
      "A private notebook of Stoic reflections on virtue, mortal impermanence, inner tranquility, and the supreme duty to universal reason.",
    featured: true,
    quote:
      "You have power over your mind — not outside events. Realize this, and you will find strength.",
    chaptersCount: 12,
    estimatedReadingTime: "4 hrs 15 mins",
    coverTheme: {
      bgGradient: "from-[#1A2536] via-[#121B2A] to-[#0A101A]",
      accentColor: "#D4AF37",
      icon: "pillar",
      editionLabel: "Stoic Canon • Rome, 180 CE",
    },
    tags: ["stoicism", "mindfulness", "ethics", "classics"],
  },
  {
    id: "book-2",
    slug: "the-republic",
    title: "The Republic",
    author: "Plato",
    category: "Philosophy",
    description:
      "An enduring Socratic inquiry into the definition of justice, the immortality of the soul, and the governance of the philosopher-guided polis.",
    featured: true,
    quote:
      "The heaviest penalty for declining to rule is to be ruled by someone inferior to yourself.",
    chaptersCount: 10,
    estimatedReadingTime: "9 hrs 30 mins",
    coverTheme: {
      bgGradient: "from-[#222E42] via-[#172233] to-[#0D1522]",
      accentColor: "#E5C358",
      icon: "flame",
      editionLabel: "Classical Dialogues • Athens, 375 BCE",
    },
    tags: ["justice", "governance", "metaphysics", "dialectic"],
  },
  {
    id: "book-3",
    slug: "the-odyssey",
    title: "The Odyssey",
    author: "Homer",
    category: "Literature",
    description:
      "The epic voyage of Odysseus navigating monsters, enchantresses, and mortal longing across ten tempestuous years on the wine-dark sea.",
    featured: true,
    quote:
      "There is a time for many words, and there is also a time for sleep.",
    chaptersCount: 24,
    estimatedReadingTime: "11 hrs 40 mins",
    coverTheme: {
      bgGradient: "from-[#1B2C3F] via-[#132030] to-[#0A131F]",
      accentColor: "#D4AF37",
      icon: "compass",
      editionLabel: "Epic Verse • Ionia, c. 8th c. BCE",
    },
    tags: ["mythology", "epic", "perseverance", "voyage"],
  },
  {
    id: "book-4",
    slug: "on-the-origin-of-species",
    title: "On the Origin of Species",
    author: "Charles Darwin",
    category: "Science & Nature",
    description:
      "The landmark treatise presenting the principle of natural selection, biological adaptation, and the interconnected lineage of all earthly life.",
    featured: false,
    quote:
      "From so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.",
    chaptersCount: 14,
    estimatedReadingTime: "13 hrs 10 mins",
    coverTheme: {
      bgGradient: "from-[#1B2F2A] via-[#12221E] to-[#0A1412]",
      accentColor: "#93C5AA",
      icon: "leaf",
      editionLabel: "Natural Philosophy • London, 1859",
    },
    tags: ["evolution", "biology", "natural-selection", "science"],
  },
  {
    id: "book-5",
    slug: "the-prince",
    title: "The Prince",
    author: "Niccolò Machiavelli",
    category: "History & Thought",
    description:
      "A clinical examination of political statecraft, pragmatic power dynamics, fortùna, and the harsh realities of ruling Renaissance realms.",
    featured: false,
    quote:
      "Everyone sees what you appear to be, few experience what you really are.",
    chaptersCount: 26,
    estimatedReadingTime: "3 hrs 45 mins",
    coverTheme: {
      bgGradient: "from-[#2A1E27] via-[#1E151C] to-[#120B10]",
      accentColor: "#C98B96",
      icon: "crown",
      editionLabel: "Political Realism • Florence, 1532",
    },
    tags: ["politics", "power", "leadership", "renaissance"],
  },
  {
    id: "book-6",
    slug: "walden",
    title: "Walden; or, Life in the Woods",
    author: "Henry David Thoreau",
    category: "Literature",
    description:
      "Reflections on voluntary simplicity, natural communion, self-reliance, and living deliberately alongside Massachusetts' quiet Walden Pond.",
    featured: false,
    quote:
      "I went to the woods because I wished to live deliberately, to front only the essential facts of life.",
    chaptersCount: 18,
    estimatedReadingTime: "8 hrs 20 mins",
    coverTheme: {
      bgGradient: "from-[#202E29] via-[#15201C] to-[#0B1310]",
      accentColor: "#B5D4B2",
      icon: "quill",
      editionLabel: "Transcendentalism • Boston, 1854",
    },
    tags: ["solitude", "nature", "transcendentalism", "contemplation"],
  },
  {
    id: "book-7",
    slug: "the-interpretation-of-dreams",
    title: "The Interpretation of Dreams",
    author: "Sigmund Freud",
    category: "Psychology",
    description:
      "The pioneering psychoanalytic investigation unveiling the royal road to the unconscious mind through latent dream-work and wish fulfillment.",
    featured: false,
    quote:
      "The interpretation of dreams is the royal road to a knowledge of the unconscious activities of the mind.",
    chaptersCount: 7,
    estimatedReadingTime: "12 hrs 00 mins",
    coverTheme: {
      bgGradient: "from-[#261E38] via-[#1B142A] to-[#100A1A]",
      accentColor: "#C0A9E8",
      icon: "eye",
      editionLabel: "Psychoanalysis • Vienna, 1899",
    },
    tags: ["psychoanalysis", "unconscious", "mind", "psychology"],
  },
  {
    id: "book-8",
    slug: "beyond-good-and-evil",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    category: "Philosophy",
    description:
      "A fierce critique of dogmatic morality, introducing the will to power and laying the conceptual prelude for a philosophy of free spirits.",
    featured: false,
    quote:
      "He who fights with monsters might take care lest he thereby become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
    chaptersCount: 9,
    estimatedReadingTime: "6 hrs 50 mins",
    coverTheme: {
      bgGradient: "from-[#2B231B] via-[#1E1711] to-[#120D08]",
      accentColor: "#E0A96D",
      icon: "hourglass",
      editionLabel: "Philosophy of the Future • Leipzig, 1886",
    },
    tags: ["existentialism", "critique", "morality", "truth"],
  },
];
