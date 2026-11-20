import { useState } from 'react';
import { Check, Copy, FileEdit, Maximize2, Music, Volume2, Square } from 'lucide-react';
import { ContrastTheme, FontScale, Hymn } from '../types/study';
import { getFontClasses, getThemeTokens } from '../utils/themeStyles';

interface HymnCardProps {
  hymn: Hymn;
  fontScale: FontScale;
  theme: ContrastTheme;
  onOpenFullscreen: (hymn: Hymn) => void;
  onOpenEditor?: () => void;
  isSpeechSupported: boolean;
  activeSpeechId: string | null;
  isSpeaking: boolean;
  onSpeak: (id: string, text: string) => void;
}

export function HymnCard({
  hymn,
  fontScale,
  theme,
  onOpenFullscreen,
  onOpenEditor,
  isSpeechSupported,
  activeSpeechId,
  isSpeaking,
  onSpeak,
}: HymnCardProps) {
  const tokens = getThemeTokens(theme);
  const fonts = getFontClasses(fontScale);
  const [copied, setCopied] = useState(false);

  const speechKey = `hymn-${hymn.id}`;
  const isThisPlaying = activeSpeechId === speechKey && isSpeaking;

  const fullLyricsForAudio = `${hymn.number}, ${hymn.title}. ${hymn.stanzas
    .map((s) => `Bait ${s.number}. ${s.lines.join(' ')}`)
    .join(' ')}`;

  const handleCopy = async () => {
    const text = `${hymn.number} — ${hymn.title}\n(${hymn.toneAndTempo})\n\n${hymn.stanzas
      .map((s) => `${s.number}.\n${s.lines.join('\n')}`)
      .join('\n\n')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <article
      className={`rounded-2xl border p-6 sm:p-8 ${tokens.surface}`}
      aria-labelledby={`hymn-title-${hymn.id}`}
    >
      <div className={`pb-5 border-b ${tokens.border} flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4`}>
        <div>
          <p className={`font-semibold ${tokens.textSecondary} ${fonts.meta} flex items-center gap-2`}>
            <Music className={`w-4 h-4 shrink-0 ${tokens.textAccent}`} aria-hidden="true" />
            <span>{hymn.roleLabel}</span>
          </p>
          <h3
            id={`hymn-title-${hymn.id}`}
            className={`font-display font-bold mt-1.5 ${fonts.h2} ${tokens.textPrimary}`}
          >
            {hymn.number} — “{hymn.title}”
          </h3>
          <p className={`mt-1.5 font-medium ${fonts.meta} ${tokens.textSecondary}`}>
            {hymn.toneAndTempo}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <button
            type="button"
            onClick={() => onOpenFullscreen(hymn)}
            className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tokens.buttonPrimary} ${fonts.meta}`}
          >
            <Maximize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Layar Penuh</span>
          </button>

          {onOpenEditor && (
            <button
              type="button"
              onClick={onOpenEditor}
              className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tokens.buttonSecondary} ${fonts.meta}`}
            >
              <FileEdit className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Edit Lirik</span>
            </button>
          )}

          {isSpeechSupported && (
            <button
              type="button"
              onClick={() => onSpeak(speechKey, fullLyricsForAudio)}
              className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tokens.buttonSecondary} ${fonts.meta}`}
            >
              {isThisPlaying ? (
                <>
                  <Square className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Stop Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Bacakan Syair</span>
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
                <span>Salin Lirik</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`mt-5 p-4 rounded-xl border ${tokens.surfaceMuted}`}>
        <p className={`${fonts.meta} ${tokens.textSecondary}`}>
          <strong className={tokens.textPrimary}>Kaitan Tema: </strong>
          {hymn.themeNote}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 font-sans-body">
        {hymn.stanzas.map((stanza) => (
          <div key={stanza.number} className={`p-5 rounded-xl border ${tokens.surfaceMuted}`}>
            <p className={`text-[15px] font-bold mb-2.5 ${tokens.textAccent} tabular-nums tracking-tight`}>
              Bait {stanza.number}
            </p>
            <div className={`${fonts.lyric} ${tokens.textPrimary} space-y-1.5`}>
              {stanza.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
