export type FontScale = 'sedang' | 'besar' | 'ekstra';
export type ContrastTheme = 'hangat' | 'kontras';
export type StudySectionNumber = '01' | '02' | '03' | '04';
export type ReadingViewMode = 'fokus' | 'semua';

export interface BibleVerse {
  verse: number;
  text: string;
}

export interface BiblePassage {
  reference: string;
  bookTitle: string;
  translation: string;
  verses: BibleVerse[];
}

export interface HymnStanza {
  number: number;
  isChorus?: boolean;
  lines: string[];
}

export interface Hymn {
  id: string;
  role: 'pembuka' | 'penutup';
  roleLabel: string;
  paId: 'pa1' | 'pa2';
  paTitle: string;
  sourceBook: string;
  number: string;
  title: string;
  toneAndTempo: string;
  themeNote: string;
  stanzas: HymnStanza[];
}

export interface MaterialPoint {
  number: string;
  title: string;
  paragraphs: string[];
}

export interface CalloutNote {
  term: string;
  explanation: string;
}

export interface DiscussionGroup {
  groupTitle: string;
  questions: string[];
}

export interface PrayerExample {
  speaker: string;
  text: string;
}

export interface StudySession {
  id: 'pa1' | 'pa2';
  label: string;
  seriesTitle: string;
  publisher: string;
  title: string;
  subtitle: string;
  biblePassage: BiblePassage;
  openingHymnId: string;
  closingHymnId: string;
  introTitle: string;
  introSteps: string[];
  introParagraphs?: string[];
  introHighlight?: {
    label: string;
    example: string;
  };
  iceBreaking?: {
    title: string;
    subtitle: string;
    howToPlay: string;
    reflection: string;
  };
  materialIntroParagraphs: string[];
  materialPoints: MaterialPoint[];
  materialClosingParagraphs: string[];
  calloutTitle: string;
  calloutNotes: CalloutNote[];
  practicalApplications: {
    audience: string;
    action: string;
  }[];
  discussionTitle: string;
  discussionLead: string;
  discussionGroups: DiscussionGroup[];
  actionStep?: {
    title: string;
    instruction: string;
    examples: { label: string; text: string }[];
  };
  closingPrayer: {
    title: string;
    duration: string;
    instruction: string;
    examples: PrayerExample[];
    note: string;
  };
}

export interface SupportLeaf {
  id: string;
  author: string;
  generation: 'Generasi Senior' | 'Generasi Muda' | 'Keluarga';
  kind: 'Komitmen' | 'Dukungan';
  message: string;
}

export interface CustomStudyOverride {
  openingHymnTitle?: string;
  openingHymnLyrics?: string;
  closingHymnTitle?: string;
  closingHymnLyrics?: string;
  bibleReference?: string;
  bibleText?: string;
}
