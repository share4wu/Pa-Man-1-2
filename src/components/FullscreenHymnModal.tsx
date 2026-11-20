import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ContrastTheme, Hymn } from '../types/study';
import { getThemeTokens } from '../utils/themeStyles';

interface FullscreenHymnModalProps {
  hymn: Hymn | null;
  theme: ContrastTheme;
  onClose: () => void;
}

export function FullscreenHymnModal({ hymn, theme, onClose }: FullscreenHymnModalProps) {
  const [stanzaIndex, setStanzaIndex] = useState(0);
  const [showAllStanzas, setShowAllStanzas] = useState(false);

  useEffect(() => {
    setStanzaIndex(0);
    setShowAllStanzas(false);
  }, [hymn?.id]);

  useEffect(() => {
    if (!hymn) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!showAllStanzas && e.key === 'ArrowRight') {
        setStanzaIndex((prev) => Math.min(hymn.stanzas.length - 1, prev + 1));
      }
      if (!showAllStanzas && e.key === 'ArrowLeft') {
        setStanzaIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hymn, onClose, showAllStanzas]);

  if (!hymn) return null;

  const tokens = getThemeTokens(theme);
  const activeStanza = hymn.stanzas[stanzaIndex] ?? hymn.stanzas[0];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto ${tokens.pageBg}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-hymn-title"
    >
      <div className={`border-b ${tokens.headerBg} px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className={`text-[15px] font-semibold ${tokens.textSecondary}`}>
            {hymn.roleLabel} · {hymn.toneAndTempo}
          </p>
          <h2
            id="fullscreen-hymn-title"
            className={`font-display font-bold text-2xl sm:text-3xl ${tokens.textPrimary}`}
          >
            {hymn.number} — {hymn.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAllStanzas((v) => !v)}
            className={`min-h-[48px] px-4 py-2 rounded-xl text-[16px] font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${tokens.buttonSecondary}`}
          >
            {showAllStanzas ? 'Tampilkan Per Bait' : 'Tampilkan Semua Bait'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className={`min-h-[48px] px-5 py-2 rounded-xl text-[16px] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${tokens.buttonPrimary}`}
          >
            <X className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Tutup</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-5 sm:px-10 py-8 sm:py-12">
        {showAllStanzas ? (
          <div className="space-y-8">
            {hymn.stanzas.map((stanza) => (
              <div key={stanza.number} className={`p-6 sm:p-8 rounded-2xl border ${tokens.surface}`}>
                <p className={`text-[17px] font-bold mb-3 ${tokens.textAccent} tracking-tight`}>
                  Bait {stanza.number}
                </p>
                <div className={`font-sans-body text-[24px] sm:text-[30px] leading-[1.6] ${tokens.textPrimary} space-y-2`}>
                  {stanza.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-6 sm:p-12 rounded-3xl border ${tokens.surface}`}>
            <p className={`text-[19px] font-bold mb-5 ${tokens.textAccent} tabular-nums tracking-tight`}>
              Bait {activeStanza.number} dari {hymn.stanzas.length}
            </p>
            <div className={`font-sans-body text-[26px] sm:text-[36px] leading-[1.55] ${tokens.textPrimary} space-y-3`}>
              {activeStanza.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {!showAllStanzas && (
        <div className={`border-t ${tokens.headerBg} px-4 sm:px-8 py-4`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={stanzaIndex === 0}
              onClick={() => setStanzaIndex((prev) => Math.max(0, prev - 1))}
              className={`min-h-[52px] px-5 py-2.5 rounded-xl text-[17px] font-bold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${tokens.buttonSecondary}`}
            >
              <ChevronLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Bait Sebelumnya</span>
            </button>

            <span className={`text-[17px] font-bold tabular-nums ${tokens.textPrimary}`}>
              {stanzaIndex + 1} / {hymn.stanzas.length}
            </span>

            <button
              type="button"
              disabled={stanzaIndex === hymn.stanzas.length - 1}
              onClick={() => setStanzaIndex((prev) => Math.min(hymn.stanzas.length - 1, prev + 1))}
              className={`min-h-[52px] px-5 py-2.5 rounded-xl text-[17px] font-bold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${tokens.buttonPrimary}`}
            >
              <span>Bait Berikutnya</span>
              <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
