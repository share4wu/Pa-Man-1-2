import { FormEvent, useEffect, useState } from 'react';
import { RotateCcw, Save, X } from 'lucide-react';
import { ContrastTheme, CustomStudyOverride } from '../types/study';
import { getThemeTokens } from '../utils/themeStyles';

interface CustomTextEditorModalProps {
  isOpen: boolean;
  sessionTitle: string;
  defaultOpeningTitle: string;
  defaultOpeningLyrics: string;
  defaultClosingTitle: string;
  defaultClosingLyrics: string;
  defaultBibleRef: string;
  defaultBibleText: string;
  currentOverride?: CustomStudyOverride;
  theme: ContrastTheme;
  onSave: (override: CustomStudyOverride) => void;
  onReset: () => void;
  onClose: () => void;
}

export function CustomTextEditorModal({
  isOpen,
  sessionTitle,
  defaultOpeningTitle,
  defaultOpeningLyrics,
  defaultClosingTitle,
  defaultClosingLyrics,
  defaultBibleRef,
  defaultBibleText,
  currentOverride,
  theme,
  onSave,
  onReset,
  onClose,
}: CustomTextEditorModalProps) {
  const tokens = getThemeTokens(theme);

  const [openingTitle, setOpeningTitle] = useState(defaultOpeningTitle);
  const [openingLyrics, setOpeningLyrics] = useState(defaultOpeningLyrics);
  const [closingTitle, setClosingTitle] = useState(defaultClosingTitle);
  const [closingLyrics, setClosingLyrics] = useState(defaultClosingLyrics);
  const [bibleRef, setBibleRef] = useState(defaultBibleRef);
  const [bibleText, setBibleText] = useState(defaultBibleText);

  useEffect(() => {
    if (!isOpen) return;
    setOpeningTitle(currentOverride?.openingHymnTitle ?? defaultOpeningTitle);
    setOpeningLyrics(currentOverride?.openingHymnLyrics ?? defaultOpeningLyrics);
    setClosingTitle(currentOverride?.closingHymnTitle ?? defaultClosingTitle);
    setClosingLyrics(currentOverride?.closingHymnLyrics ?? defaultClosingLyrics);
    setBibleRef(currentOverride?.bibleReference ?? defaultBibleRef);
    setBibleText(currentOverride?.bibleText ?? defaultBibleText);
  }, [
    isOpen,
    currentOverride,
    defaultOpeningTitle,
    defaultOpeningLyrics,
    defaultClosingTitle,
    defaultClosingLyrics,
    defaultBibleRef,
    defaultBibleText,
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      openingHymnTitle: openingTitle.trim(),
      openingHymnLyrics: openingLyrics.trim(),
      closingHymnTitle: closingTitle.trim(),
      closingHymnLyrics: closingLyrics.trim(),
      bibleReference: bibleRef.trim(),
      bibleText: bibleText.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-pa-title"
    >
      <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border ${tokens.surface} p-6 sm:p-8`}>
        <div className={`pb-4 border-b ${tokens.border} flex items-start justify-between gap-4`}>
          <div>
            <p className={`text-[14px] font-semibold ${tokens.textSecondary}`}>
              Sesuaikan Teks dari Dokumen PDF MAN 2026
            </p>
            <h2 id="edit-pa-title" className={`font-display font-bold text-2xl sm:text-3xl mt-1 ${tokens.textPrimary}`}>
              Edit / Tempel Teks — {sessionTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela edit"
            className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center cursor-pointer ${tokens.buttonSecondary}`}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="edit-bible-ref" className={`block text-[16px] font-semibold ${tokens.textPrimary}`}>
              Perikop Bacaan Alkitab
            </label>
            <input
              id="edit-bible-ref"
              type="text"
              value={bibleRef}
              onChange={(e) => setBibleRef(e.target.value)}
              className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border ${tokens.surfaceMuted} ${tokens.textPrimary} text-[16px]`}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-bible-text" className={`block text-[16px] font-semibold ${tokens.textPrimary}`}>
              Teks Ayat Alkitab (satu ayat per baris, awali dengan nomor ayat misal: &quot;16. Kita telah...&quot;)
            </label>
            <textarea
              id="edit-bible-text"
              rows={6}
              value={bibleText}
              onChange={(e) => setBibleText(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${tokens.surfaceMuted} ${tokens.textPrimary} text-[16px] leading-relaxed`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="edit-open-title" className={`block text-[16px] font-semibold ${tokens.textPrimary}`}>
                Judul Pujian Pembuka
              </label>
              <input
                id="edit-open-title"
                type="text"
                value={openingTitle}
                onChange={(e) => setOpeningTitle(e.target.value)}
                className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border ${tokens.surfaceMuted} ${tokens.textPrimary} text-[16px]`}
              />
              <label htmlFor="edit-open-lyrics" className={`block text-[14px] font-medium pt-1 ${tokens.textSecondary}`}>
                Syair Pujian Pembuka (pisahkan antar bait dengan baris kosong)
              </label>
              <textarea
                id="edit-open-lyrics"
                rows={6}
                value={openingLyrics}
                onChange={(e) => setOpeningLyrics(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${tokens.surfaceMuted} ${tokens.textPrimary} text-[15px] leading-relaxed`}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-close-title" className={`block text-[16px] font-semibold ${tokens.textPrimary}`}>
                Judul Pujian Penutup
              </label>
              <input
                id="edit-close-title"
                type="text"
                value={closingTitle}
                onChange={(e) => setClosingTitle(e.target.value)}
                className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border ${tokens.surfaceMuted} ${tokens.textPrimary} text-[16px]`}
              />
              <label htmlFor="edit-close-lyrics" className={`block text-[14px] font-medium pt-1 ${tokens.textSecondary}`}>
                Syair Pujian Penutup (pisahkan antar bait dengan baris kosong)
              </label>
              <textarea
                id="edit-close-lyrics"
                rows={6}
                value={closingLyrics}
                onChange={(e) => setClosingLyrics(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${tokens.surfaceMuted} ${tokens.textPrimary} text-[15px] leading-relaxed`}
              />
            </div>
          </div>

          <div className={`pt-5 border-t ${tokens.border} flex flex-wrap items-center justify-between gap-3`}>
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className={`min-h-[48px] px-4 py-2.5 rounded-xl text-[15px] font-semibold inline-flex items-center gap-2 cursor-pointer ${tokens.buttonSecondary}`}
            >
              <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Kembalikan Teks Asli</span>
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className={`min-h-[48px] px-5 py-2.5 rounded-xl text-[15px] font-semibold cursor-pointer ${tokens.buttonSecondary}`}
              >
                Batal
              </button>
              <button
                type="submit"
                className={`min-h-[48px] px-5 py-2.5 rounded-xl text-[15px] font-bold inline-flex items-center gap-2 cursor-pointer ${tokens.buttonPrimary}`}
              >
                <Save className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
