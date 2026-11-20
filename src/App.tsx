import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  FileEdit,
  HeartHandshake,
  MessageSquare,
  Music,
} from 'lucide-react';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { CustomTextEditorModal } from './components/CustomTextEditorModal';
import { FullscreenHymnModal } from './components/FullscreenHymnModal';
import { StudySectionContent } from './components/StudySectionContent';
import { StudyWorkflowGrid, WorkflowCardMeta } from './components/StudyWorkflowGrid';
import { HYMNS, STUDY_SESSIONS } from './data/studyData';
import { useSpeechReader } from './hooks/useSpeechReader';
import {
  BiblePassage,
  ContrastTheme,
  CustomStudyOverride,
  FontScale,
  Hymn,
  StudySectionNumber,
} from './types/study';
import { getFontClasses, getThemeTokens } from './utils/themeStyles';

const PREFS_KEY = 'pa-man-2026-prefs-v2';
const OVERRIDES_KEY = 'pa-man-2026-custom-overrides';
const HERO_IMAGE_PATH = '/src/assets/images/advent_intergenerational_study_1795204563923.jpg';

function parseCustomVerses(rawText: string, fallback: BiblePassage['verses']): BiblePassage['verses'] {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return fallback;

  return lines.map((line, index) => {
    const match = line.match(/^(\d+)[\.\:\)]\s*(.+)$/);
    if (match) {
      return { verse: Number(match[1]), text: match[2].trim() };
    }
    return { verse: index + 1, text: line };
  });
}

function parseCustomStanzas(rawLyrics: string, fallback: Hymn['stanzas']): Hymn['stanzas'] {
  const blocks = rawLyrics
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  if (blocks.length === 0) return fallback;

  return blocks.map((block, idx) => ({
    number: idx + 1,
    lines: block
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean),
  }));
}

export default function App() {
  const [selectedPaId, setSelectedPaId] = useState<'pa1' | 'pa2'>('pa1');
  const [activeSection, setActiveSection] = useState<StudySectionNumber>('01');
  const [showAllSections, setShowAllSections] = useState(false);

  const [fontScale, setFontScale] = useState<FontScale>(() => {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fontScale) return parsed.fontScale;
      }
    } catch {
      // ignore
    }
    return 'besar';
  });

  const [theme, setTheme] = useState<ContrastTheme>(() => {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme === 'kontras' || parsed.theme === 'hangat') return parsed.theme;
      }
    } catch {
      // ignore
    }
    return 'hangat';
  });

  const [overrides, setOverrides] = useState<Record<'pa1' | 'pa2', CustomStudyOverride>>(() => {
    try {
      const saved = localStorage.getItem(OVERRIDES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { pa1: {}, pa2: {} };
  });

  const [fullscreenHymn, setFullscreenHymn] = useState<Hymn | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);

  const contentAnchorRef = useRef<HTMLDivElement>(null);
  const { isSupported, activeId, isSpeaking, speak, stop } = useSpeechReader();

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ fontScale, theme }));
    } catch {
      // ignore
    }
  }, [fontScale, theme]);

  useEffect(() => {
    try {
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
    } catch {
      // ignore
    }
  }, [overrides]);

  const activeSession = STUDY_SESSIONS.find((s) => s.id === selectedPaId) ?? STUDY_SESSIONS[0];
  const baseOpeningHymn = HYMNS.find((h) => h.id === activeSession.openingHymnId)!;
  const baseClosingHymn = HYMNS.find((h) => h.id === activeSession.closingHymnId)!;
  const currentOverride = overrides[selectedPaId] || {};

  const effectiveOpeningHymn: Hymn = useMemo(
    () => ({
      ...baseOpeningHymn,
      title: currentOverride.openingHymnTitle || baseOpeningHymn.title,
      stanzas: currentOverride.openingHymnLyrics
        ? parseCustomStanzas(currentOverride.openingHymnLyrics, baseOpeningHymn.stanzas)
        : baseOpeningHymn.stanzas,
    }),
    [baseOpeningHymn, currentOverride.openingHymnTitle, currentOverride.openingHymnLyrics]
  );

  const effectiveClosingHymn: Hymn = useMemo(
    () => ({
      ...baseClosingHymn,
      title: currentOverride.closingHymnTitle || baseClosingHymn.title,
      stanzas: currentOverride.closingHymnLyrics
        ? parseCustomStanzas(currentOverride.closingHymnLyrics, baseClosingHymn.stanzas)
        : baseClosingHymn.stanzas,
    }),
    [baseClosingHymn, currentOverride.closingHymnTitle, currentOverride.closingHymnLyrics]
  );

  const effectivePassage: BiblePassage = useMemo(
    () => ({
      ...activeSession.biblePassage,
      reference: currentOverride.bibleReference || activeSession.biblePassage.reference,
      verses: currentOverride.bibleText
        ? parseCustomVerses(currentOverride.bibleText, activeSession.biblePassage.verses)
        : activeSession.biblePassage.verses,
    }),
    [activeSession.biblePassage, currentOverride.bibleReference, currentOverride.bibleText]
  );

  const tokens = getThemeTokens(theme);
  const fonts = getFontClasses(fontScale);

  const jumpToSection = (section: StudySectionNumber) => {
    stop();
    setActiveSection(section);
    requestAnimationFrame(() => {
      if (showAllSections) {
        const target = document.getElementById(`bagian-${section}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      contentAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSwitchPa = (paId: 'pa1' | 'pa2') => {
    stop();
    setSelectedPaId(paId);
    setActiveSection('01');
  };

  const handlePrevSection = () => {
    const order: StudySectionNumber[] = ['01', '02', '03', '04'];
    const idx = order.indexOf(activeSection);
    if (idx > 0) jumpToSection(order[idx - 1]);
  };

  const handleNextSection = () => {
    const order: StudySectionNumber[] = ['01', '02', '03', '04'];
    const idx = order.indexOf(activeSection);
    if (idx < order.length - 1) jumpToSection(order[idx + 1]);
  };

  const workflowCards: WorkflowCardMeta[] = [
    {
      number: '01',
      title: 'Pujian Pembuka',
      subtitle: `${effectiveOpeningHymn.number} · ${effectiveOpeningHymn.title}`,
    },
    {
      number: '02',
      title: 'Bacaan Alkitab',
      subtitle: effectivePassage.reference,
    },
    {
      number: '03',
      title: 'Pengantar & Aplikasi',
      subtitle: 'Pendalaman & Catatan Tema',
    },
    {
      number: '04',
      title: 'Bahan Diskusi',
      subtitle: 'Pertanyaan Lintas Usia & Doa',
    },
  ];

  const topNavItems: { section: StudySectionNumber; label: string; mobileLabel: string; icon: typeof Music }[] = [
    { section: '01', label: 'Pujian', mobileLabel: '01 Pujian', icon: Music },
    { section: '02', label: 'Bacaan Alkitab', mobileLabel: '02 Alkitab', icon: BookOpen },
    { section: '03', label: 'Pengantar', mobileLabel: '03 Materi', icon: HeartHandshake },
    { section: '04', label: 'Bahan Diskusi', mobileLabel: '04 Diskusi', icon: MessageSquare },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${tokens.pageBg}`}>
      {/* Top Navbar: Strict 3-Zone Contract */}
      <header className={`sticky top-0 z-30 border-b ${tokens.headerBg} no-print`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single-line Title */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-display font-bold text-lg sm:text-2xl tracking-tight whitespace-nowrap shrink-0 ${tokens.textPrimary}`}
          >
            PA Adven Natal 2026
          </a>

          {/* Zone 2: Desktop Navigation Links (Bahan PA 1, Bahan PA 2 + Section Quick Links) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6" aria-label="Menu navigasi Bahan PA">
            <button
              type="button"
              onClick={() => {
                handleSwitchPa('pa1');
                contentAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              aria-current={selectedPaId === 'pa1' ? 'page' : undefined}
              className={`min-h-[44px] px-1 text-[16px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors underline-offset-8 tracking-tight ${
                selectedPaId === 'pa1'
                  ? `${tokens.textAccent} underline decoration-2 font-bold`
                  : `${tokens.textSecondary} hover:text-[#1A1C1E] hover:underline`
              }`}
            >
              Bahan PA 1
            </button>

            <button
              type="button"
              onClick={() => {
                handleSwitchPa('pa2');
                contentAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              aria-current={selectedPaId === 'pa2' ? 'page' : undefined}
              className={`min-h-[44px] px-1 text-[16px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors underline-offset-8 tracking-tight ${
                selectedPaId === 'pa2'
                  ? `${tokens.textAccent} underline decoration-2 font-bold`
                  : `${tokens.textSecondary} hover:text-[#1A1C1E] hover:underline`
              }`}
            >
              Bahan PA 2
            </button>

            <span className={`h-4 w-px bg-[#E4E0D8]`} aria-hidden="true" />

            {topNavItems
              .filter((item) => item.section !== '03')
              .map((item) => {
                const isCurrent = !showAllSections && activeSection === item.section;
                return (
                  <button
                    key={item.section}
                    type="button"
                    onClick={() => jumpToSection(item.section)}
                    className={`min-h-[44px] px-1 text-[15px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors underline-offset-8 tracking-tight ${
                      isCurrent
                        ? `${tokens.textAccent} underline decoration-2 font-bold`
                        : `${tokens.textSecondary} hover:text-[#1A1C1E] hover:underline`
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
          </nav>

          {/* Zone 3: Mobile PA 1/2 Switcher + Desktop Primary CTA */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="flex md:hidden items-center gap-1" role="group" aria-label="Pilih Bahan PA">
              <button
                type="button"
                onClick={() => handleSwitchPa('pa1')}
                aria-pressed={selectedPaId === 'pa1'}
                className={`min-h-[40px] px-3 py-1.5 rounded-lg text-[14px] font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  selectedPaId === 'pa1' ? tokens.buttonActive : tokens.buttonInactive
                }`}
              >
                PA 1
              </button>
              <button
                type="button"
                onClick={() => handleSwitchPa('pa2')}
                aria-pressed={selectedPaId === 'pa2'}
                className={`min-h-[40px] px-3 py-1.5 rounded-lg text-[14px] font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  selectedPaId === 'pa2' ? tokens.buttonActive : tokens.buttonInactive
                }`}
              >
                PA 2
              </button>
            </div>

            <button
              type="button"
              onClick={() => jumpToSection('01')}
              className={`hidden md:inline-flex min-h-[44px] px-5 py-2 rounded-xl text-[15px] font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors items-center ${tokens.buttonPrimary}`}
            >
              Mulai PA
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-7 sm:py-10 space-y-8 pb-28 md:pb-14">
        {/* Hero Section + Switcher Bahan PA */}
        <section className={`rounded-3xl border p-6 sm:p-10 ${tokens.surface}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <p className={`font-semibold ${tokens.textSecondary} ${fonts.meta}`}>
                  Bahan MAN 2026 · LPPS Sinode GKJ & GKI SW Jateng
                </p>
                <h1 className={`font-display font-bold mt-2 text-balance ${fonts.h1} ${tokens.textPrimary}`}>
                  Allah Peduli
                </h1>
                <p className={`mt-3 ${fonts.body} ${tokens.textSecondary}`}>
                  Pemahaman Alkitab Intergenerasional Masa Adven Natal 2026 untuk dihayati bersama anak, kaum muda, orangtua, dan warga adiyuswa/lansia—menghadirkan kasih dan kepedulian Allah yang nyata di tengah keluarga dan gereja.
                </p>

                {/* Switcher Bahan PA 1 & Bahan PA 2 */}
                <div className="mt-6 space-y-3" role="group" aria-label="Pilih Bahan PA">
                  <p className={`text-[15px] font-bold tracking-tight ${tokens.textSecondary}`}>
                    Pilih Sesi Pertemuan:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STUDY_SESSIONS.map((session, idx) => {
                      const isSelected = selectedPaId === session.id;
                      return (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => handleSwitchPa(session.id)}
                          aria-pressed={isSelected}
                          className={`text-left p-4 rounded-2xl border transition-colors cursor-pointer min-h-[76px] ${
                            isSelected
                              ? 'bg-[#1E3246] text-white border-[#1E3246]'
                              : `${tokens.surfaceMuted} hover:border-[#1E3246]`
                          }`}
                        >
                          <p
                            className={`text-[14px] font-bold tracking-tight ${
                              isSelected ? 'text-slate-200' : tokens.textSecondary
                            }`}
                          >
                            Bahan PA {idx + 1} · {session.biblePassage.reference}
                          </p>
                          <p
                            className={`font-display font-bold mt-1 text-[18px] leading-snug ${
                              isSelected ? 'text-white' : tokens.textPrimary
                            }`}
                          >
                            {session.title}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 no-print">
                <button
                  type="button"
                  onClick={() => jumpToSection('01')}
                  className={`min-h-[50px] px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer transition-colors ${tokens.buttonPrimary} ${fonts.label}`}
                >
                  <span>Mulai {selectedPaId === 'pa1' ? 'Bahan PA 1' : 'Bahan PA 2'}</span>
                  <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditorOpen(true)}
                  className={`min-h-[50px] px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors ${tokens.buttonSecondary} ${fonts.label}`}
                >
                  <FileEdit className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Edit / Tempel Teks PA</span>
                </button>
              </div>
            </div>

            {/* Right Column: Warm Editorial Illustration */}
            <div className="lg:col-span-5 flex">
              {!heroImageError ? (
                <div className={`w-full rounded-2xl border overflow-hidden ${tokens.surfaceMuted}`}>
                  <img
                    src={HERO_IMAGE_PATH}
                    alt="Ilustrasi keluarga lintas generasi dari kakek-nenek hingga anak-anak membaca Alkitab bersama di sekitar lilin Adven yang hangat"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageError(true)}
                    className="w-full h-64 sm:h-80 lg:h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-full rounded-2xl border p-8 flex flex-col justify-center items-center text-center ${tokens.surfaceMuted}`}>
                  <HeartHandshake className={`w-12 h-12 mb-3 ${tokens.textAccent}`} aria-hidden="true" />
                  <p className={`font-display font-bold text-xl ${tokens.textPrimary}`}>
                    Allah Peduli · Adven Natal 2026
                  </p>
                  <p className={`mt-2 ${fonts.meta} ${tokens.textSecondary}`}>
                    Persekutuan lintas generasi bersama keluarga dan jemaat
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Grid 4 Kartu Bernomor 01 – 04 */}
        <StudyWorkflowGrid
          cards={workflowCards}
          activeSection={activeSection}
          showAllSections={showAllSections}
          fontScale={fontScale}
          theme={theme}
          onSelectSection={jumpToSection}
        />

        {/* Menu Pilihan Bahan PA 1 atau Bahan PA 2 + Accessibility Bar */}
        <div ref={contentAnchorRef} className="scroll-mt-24 space-y-3">
          <div
            className={`rounded-2xl border p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${tokens.surface} no-print`}
            role="tablist"
            aria-label="Menu Pilihan Bahan PA"
          >
            {STUDY_SESSIONS.map((session, idx) => {
              const isSelected = selectedPaId === session.id;
              return (
                <button
                  key={session.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSwitchPa(session.id)}
                  className={`flex-1 min-h-[48px] px-4 py-2.5 rounded-xl text-left sm:text-center font-semibold transition-colors cursor-pointer ${
                    isSelected ? tokens.buttonActive : tokens.buttonInactive
                  } ${fonts.label}`}
                >
                  Bahan PA {idx + 1}: {session.title} ({session.biblePassage.reference})
                </button>
              );
            })}
          </div>

          <AccessibilityToolbar
            fontScale={fontScale}
            onChangeFontScale={setFontScale}
            theme={theme}
            onChangeTheme={setTheme}
            activeSection={activeSection}
            onPrevSection={handlePrevSection}
            onNextSection={handleNextSection}
          />
        </div>

        {/* Active Section Reading Area */}
        <StudySectionContent
          session={activeSession}
          openingHymn={effectiveOpeningHymn}
          closingHymn={effectiveClosingHymn}
          passage={effectivePassage}
          activeSection={activeSection}
          showAllSections={showAllSections}
          fontScale={fontScale}
          theme={theme}
          onSelectSection={jumpToSection}
          onToggleShowAll={() => setShowAllSections((v) => !v)}
          onOpenFullscreenHymn={setFullscreenHymn}
          onOpenEditor={() => setIsEditorOpen(true)}
          isSpeechSupported={isSupported}
          activeSpeechId={activeId}
          isSpeaking={isSpeaking}
          onSpeak={speak}
        />
      </main>

      {/* Clean Editorial Footer */}
      <footer className={`border-t ${tokens.border} py-7 px-4 sm:px-6 mb-20 md:mb-0 no-print`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className={`${fonts.meta} ${tokens.textSecondary}`}>
            Masa Adven Natal 2026 – Allah Peduli · LPPS Sinode GKJ & GKI SW Jateng
          </p>
          <p className={`${fonts.meta} ${tokens.textSecondary}`}>
            Fokus Materi: Bahan PA 1 & Bahan PA 2 · Terjemahan Baru (LAI) & Kidung Jemaat
          </p>
        </div>
      </footer>

      {/* Mobile Fixed Thumb-Zone Bottom Navigation (compact <=15% viewport, >=48px targets) */}
      <nav
        aria-label="Navigasi cepat ponsel"
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 ${tokens.mobileNavBg} no-print`}
      >
        <div className="grid grid-cols-4 h-[64px] items-center">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = !showAllSections && activeSection === item.section;
            return (
              <button
                key={item.section}
                type="button"
                onClick={() => jumpToSection(item.section)}
                aria-current={isActive ? 'step' : undefined}
                className={`h-full min-h-[48px] flex flex-col items-center justify-center gap-1 px-1 cursor-pointer transition-colors ${
                  isActive
                    ? `${tokens.textAccent} font-bold`
                    : `${tokens.textSecondary} font-medium`
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
                <span className="text-[12px] leading-none whitespace-nowrap">
                  {item.mobileLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Fullscreen Hymn Overlay */}
      <FullscreenHymnModal
        hymn={fullscreenHymn}
        theme={theme}
        onClose={() => setFullscreenHymn(null)}
      />

      {/* Edit / Tempel Teks PA Modal */}
      <CustomTextEditorModal
        isOpen={isEditorOpen}
        sessionTitle={`${selectedPaId === 'pa1' ? 'Bahan PA 1' : 'Bahan PA 2'}: ${activeSession.title}`}
        defaultOpeningTitle={baseOpeningHymn.title}
        defaultOpeningLyrics={baseOpeningHymn.stanzas.map((s) => s.lines.join('\n')).join('\n\n')}
        defaultClosingTitle={baseClosingHymn.title}
        defaultClosingLyrics={baseClosingHymn.stanzas.map((s) => s.lines.join('\n')).join('\n\n')}
        defaultBibleRef={activeSession.biblePassage.reference}
        defaultBibleText={activeSession.biblePassage.verses.map((v) => `${v.verse}. ${v.text}`).join('\n')}
        currentOverride={currentOverride}
        theme={theme}
        onSave={(nextOverride) =>
          setOverrides((prev) => ({
            ...prev,
            [selectedPaId]: nextOverride,
          }))
        }
        onReset={() =>
          setOverrides((prev) => ({
            ...prev,
            [selectedPaId]: {},
          }))
        }
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
}
