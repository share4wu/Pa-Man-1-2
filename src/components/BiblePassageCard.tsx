import { useState } from 'react';
import { BookOpen, Check, Copy, FileEdit, Volume2, Square } from 'lucide-react';
import { BiblePassage, ContrastTheme, FontScale } from '../types/study';
import { getFontClasses, getThemeTokens } from '../utils/themeStyles';

interface BiblePassageCardProps {
  passage: BiblePassage;
  fontScale: FontScale;
  theme: ContrastTheme;
  speechId: string;
  isSpeechSupported: boolean;
  activeSpeechId: string | null;
  isSpeaking: boolean;
  onSpeak: (id: string, text: string) => void;
  onOpenEditor: () => void;
}

export function BiblePassageCard({
  passage,
  fontScale,
  theme,
  speechId,
  isSpeechSupported,
  activeSpeechId,
  isSpeaking,
  onSpeak,
  onOpenEditor,
}: BiblePassageCardProps) {
  const tokens = getThemeTokens(theme);
  const fonts = getFontClasses(fontScale);
  const [copied, setCopied] = useState(false);
  const [focusedVerse, setFocusedVerse] = useState<number | null>(null);

  const isThisPlaying = activeSpeechId === speechId && isSpeaking;

  const fullTextForAudio = `${passage.bookTitle}. ${passage.verses
    .map((v) => `Ayat ${v.verse}. ${v.text}`)
    .join(' ')}`;

  const handleCopy = async () => {
    const formatted = `${passage.reference} (${passage.translation})\n\n${passage.verses
      .map((v) => `${v.verse}. ${v.text}`)
      .join('\n')}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <article
      className={`rounded-2xl border p-6 sm:p-8 ${tokens.surface}`}
      aria-labelledby={`bible-heading-${speechId}`}
    >
      <div className={`pb-5 border-b ${tokens.border} flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4`}>
        <div>
          <p className={`font-semibold ${tokens.textSecondary} ${fonts.meta} flex items-center gap-2`}>
            <BookOpen className={`w-4 h-4 shrink-0 ${tokens.textAccent}`} aria-hidden="true" />
            <span>02 · Bacaan Alkitab · {passage.translation}</span>
          </p>
          <h3
            id={`bible-heading-${speechId}`}
            className={`font-display font-bold mt-1.5 ${fonts.h2} ${tokens.textPrimary}`}
          >
            {passage.reference}
          </h3>
          <p className={`mt-1 ${fonts.meta} ${tokens.textSecondary}`}>
            {passage.bookTitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <button
            type="button"
            onClick={onOpenEditor}
            className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tokens.buttonSecondary} ${fonts.meta}`}
          >
            <FileEdit className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Edit / Tempel Teks PA</span>
          </button>

          {isSpeechSupported && (
            <button
              type="button"
              onClick={() => onSpeak(speechId, fullTextForAudio)}
              className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isThisPlaying ? tokens.buttonPrimary : tokens.buttonSecondary
              } ${fonts.meta}`}
            >
              {isThisPlaying ? (
                <>
                  <Square className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Stop Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Bacakan Ayat</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tokens.buttonSecondary} ${fonts.meta}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Salin Ayat</span>
              </>
            )}
          </button>
        </div>
      </div>

      <p className={`mt-4 ${fonts.meta} ${tokens.textSecondary} no-print`}>
        Ketuk salah satu ayat untuk menandai baris yang sedang dibaca bersama.
      </p>

      <div className="mt-4 space-y-2.5 font-sans-body">
        {passage.verses.map((item) => {
          const isFocused = focusedVerse === item.verse;
          return (
            <button
              key={item.verse}
              type="button"
              onClick={() => setFocusedVerse(isFocused ? null : item.verse)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-colors cursor-pointer block ${
                isFocused ? tokens.verseActiveRow : tokens.surfaceMuted
              }`}
              aria-pressed={isFocused}
            >
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span
                  className={`font-bold tabular-nums shrink-0 min-w-[2.2rem] text-center py-0.5 rounded-lg border ${
                    isFocused
                      ? tokens.buttonPrimary
                      : `${tokens.surface} ${tokens.textAccent}`
                  } ${fonts.meta}`}
                >
                  {item.verse}
                </span>
                <p className={`${fonts.verse} ${tokens.textPrimary} flex-1`}>
                  {item.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </article>
  );
}
