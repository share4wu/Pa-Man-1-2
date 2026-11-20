import { ArrowRight } from 'lucide-react';
import { ContrastTheme, FontScale, StudySectionNumber } from '../types/study';
import { getFontClasses, getThemeTokens } from '../utils/themeStyles';

export interface WorkflowCardMeta {
  number: StudySectionNumber;
  title: string;
  subtitle: string;
}

interface StudyWorkflowGridProps {
  cards: WorkflowCardMeta[];
  activeSection: StudySectionNumber;
  showAllSections: boolean;
  fontScale: FontScale;
  theme: ContrastTheme;
  onSelectSection: (section: StudySectionNumber) => void;
}

export function StudyWorkflowGrid({
  cards,
  activeSection,
  showAllSections,
  fontScale,
  theme,
  onSelectSection,
}: StudyWorkflowGridProps) {
  const tokens = getThemeTokens(theme);
  const fonts = getFontClasses(fontScale);

  return (
    <section aria-labelledby="alur-pa-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className={`font-semibold ${tokens.textSecondary} ${fonts.meta}`}>
            Alur Pemahaman Alkitab Intergenerasional
          </p>
          <h2 id="alur-pa-heading" className={`font-display font-bold mt-0.5 ${fonts.h2} ${tokens.textPrimary}`}>
            Empat Langkah Pertemuan
          </h2>
        </div>
        <p className={`${fonts.meta} ${tokens.textSecondary}`}>
          Ketuk salah satu kartu di bawah untuk langsung membuka bagian tersebut.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {cards.map((card) => {
          const isActive = !showAllSections && activeSection === card.number;
          return (
            <button
              key={card.number}
              type="button"
              onClick={() => onSelectSection(card.number)}
              aria-current={isActive ? 'step' : undefined}
              className={`group text-left rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-colors cursor-pointer min-h-[144px] ${
                isActive
                  ? 'bg-[#1E3246] text-white border-[#1E3246]'
                  : `${tokens.surface} hover:border-[#1E3246]`
              }`}
            >
              <div className="flex items-center justify-between gap-3 w-full">
                <span
                  className={`font-display font-bold text-2xl sm:text-3xl tabular-nums ${
                    isActive ? 'text-white' : tokens.textAccent
                  }`}
                >
                  {card.number}
                </span>
                <ArrowRight
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    isActive ? 'text-white' : tokens.textAccent
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-5">
                <h3
                  className={`font-display font-bold ${fonts.h3} ${
                    isActive ? 'text-white' : tokens.textPrimary
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-1.5 ${fonts.meta} ${
                    isActive ? 'text-slate-200' : tokens.textSecondary
                  }`}
                >
                  {card.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
