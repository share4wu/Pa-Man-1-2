import { ChevronLeft, ChevronRight, Eye, Printer, Type } from 'lucide-react';
import { ContrastTheme, FontScale, StudySectionNumber } from '../types/study';
import { getThemeTokens } from '../utils/themeStyles';

interface AccessibilityToolbarProps {
  fontScale: FontScale;
  onChangeFontScale: (scale: FontScale) => void;
  theme: ContrastTheme;
  onChangeTheme: (theme: ContrastTheme) => void;
  activeSection: StudySectionNumber;
  onPrevSection: () => void;
  onNextSection: () => void;
}

const SECTION_LABELS: Record<StudySectionNumber, string> = {
  '01': '01 · Pujian',
  '02': '02 · Alkitab',
  '03': '03 · Pengantar',
  '04': '04 · Diskusi',
};

export function AccessibilityToolbar({
  fontScale,
  onChangeFontScale,
  theme,
  onChangeTheme,
  activeSection,
  onPrevSection,
  onNextSection,
}: AccessibilityToolbarProps) {
  const tokens = getThemeTokens(theme);

  const fontOptions: { id: FontScale; label: string }[] = [
    { id: 'sedang', label: 'Normal' },
    { id: 'besar', label: 'Besar' },
    { id: 'ekstra', label: 'Ekstra' },
  ];

  return (
    <section
      aria-label="Kontrol Ukuran Huruf dan Navigasi Bagian"
      className={`rounded-2xl border px-4 sm:px-6 py-3.5 ${tokens.toolbarBg} no-print`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
        {/* Left: Font size + Contrast */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-[15px] font-semibold ${tokens.textPrimary} mr-1`}>
              <Type className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Ukuran Huruf:</span>
            </span>
            <div className="flex items-center gap-1.5" role="group" aria-label="Pilih ukuran huruf">
              {fontOptions.map((opt) => {
                const isActive = fontScale === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeFontScale(opt.id)}
                    aria-pressed={isActive}
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg text-[15px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive ? tokens.buttonActive : tokens.buttonInactive
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChangeTheme(theme === 'hangat' ? 'kontras' : 'hangat')}
            aria-pressed={theme === 'kontras'}
            className={`min-h-[44px] px-3.5 py-2 rounded-lg text-[15px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              theme === 'kontras' ? tokens.buttonActive : tokens.buttonInactive
            }`}
          >
            <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{theme === 'kontras' ? 'Kontras Tinggi: Aktif' : 'Kontras Tinggi'}</span>
          </button>
        </div>

        {/* Right: < and > Section Stepper + Print */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
          <div className="flex items-center gap-2" role="group" aria-label="Navigasi antar bagian PA">
            <button
              type="button"
              onClick={onPrevSection}
              disabled={activeSection === '01'}
              aria-label="Bagian sebelumnya"
              className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg font-bold inline-flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${tokens.buttonSecondary}`}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <span className={`text-[15px] font-semibold tabular-nums px-2 ${tokens.textPrimary} whitespace-nowrap`}>
              {SECTION_LABELS[activeSection]}
            </span>

            <button
              type="button"
              onClick={onNextSection}
              disabled={activeSection === '04'}
              aria-label="Bagian berikutnya"
              className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg font-bold inline-flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${tokens.buttonSecondary}`}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className={`hidden md:inline-flex min-h-[44px] px-3.5 py-2 rounded-lg text-[15px] font-semibold items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tokens.buttonSecondary}`}
          >
            <Printer className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Cetak</span>
          </button>
        </div>
      </div>
    </section>
  );
}
