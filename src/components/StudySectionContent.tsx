import { useState } from 'react';
import {
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Square,
  Volume2,
  Square as StopIcon,
} from 'lucide-react';
import {
  BiblePassage,
  ContrastTheme,
  FontScale,
  Hymn,
  StudySectionNumber,
  StudySession,
} from '../types/study';
import { getFontClasses, getThemeTokens } from '../utils/themeStyles';
import { BiblePassageCard } from './BiblePassageCard';
import { HymnCard } from './HymnCard';
import { SupportTreeWidget } from './SupportTreeWidget';

interface StudySectionContentProps {
  session: StudySession;
  openingHymn: Hymn;
  closingHymn: Hymn;
  passage: BiblePassage;
  activeSection: StudySectionNumber;
  showAllSections: boolean;
  fontScale: FontScale;
  theme: ContrastTheme;
  onSelectSection: (section: StudySectionNumber) => void;
  onToggleShowAll: () => void;
  onOpenFullscreenHymn: (hymn: Hymn) => void;
  onOpenEditor: () => void;
  isSpeechSupported: boolean;
  activeSpeechId: string | null;
  isSpeaking: boolean;
  onSpeak: (id: string, text: string) => void;
}

export function StudySectionContent({
  session,
  openingHymn,
  closingHymn,
  passage,
  activeSection,
  showAllSections,
  fontScale,
  theme,
  onSelectSection,
  onToggleShowAll,
  onOpenFullscreenHymn,
  onOpenEditor,
  isSpeechSupported,
  activeSpeechId,
  isSpeaking,
  onSpeak,
}: StudySectionContentProps) {
  const tokens = getThemeTokens(theme);
  const fonts = getFontClasses(fontScale);

  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [introName, setIntroName] = useState('');
  const [introFeeling, setIntroFeeling] = useState('');

  const toggleQuestion = (key: string) => {
    setCheckedQuestions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const materialSpeechId = `material-${session.id}`;
  const isMaterialSpeaking = activeSpeechId === materialSpeechId && isSpeaking;
  const materialAudioText = [
    session.title,
    ...session.materialIntroParagraphs,
    ...session.materialPoints.flatMap((p) => [`Bagian ${p.number}. ${p.title}.`, ...p.paragraphs]),
    ...session.materialClosingParagraphs,
  ].join(' ');

  const shouldRender = (section: StudySectionNumber) => showAllSections || activeSection === section;

  const prevMap: Record<StudySectionNumber, StudySectionNumber | null> = {
    '01': null,
    '02': '01',
    '03': '02',
    '04': '03',
  };

  const nextMap: Record<StudySectionNumber, StudySectionNumber | null> = {
    '01': '02',
    '02': '03',
    '03': '04',
    '04': null,
  };

  const sectionNames: Record<StudySectionNumber, string> = {
    '01': '01 Pujian Pembuka',
    '02': '02 Bacaan Alkitab',
    '03': '03 Pengantar & Aplikasi',
    '04': '04 Bahan Diskusi',
  };

  return (
    <div className="space-y-10">
      {/* Mode indicator bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <p className={`font-semibold ${fonts.meta} ${tokens.textSecondary}`}>
          Menampilkan: <strong className={tokens.textPrimary}>{showAllSections ? 'Semua Bagian (01 – 04)' : sectionNames[activeSection]}</strong> · {session.label}
        </p>
        <button
          type="button"
          onClick={onToggleShowAll}
          className={`min-h-[44px] px-4 py-2 rounded-xl font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${tokens.buttonSecondary} ${fonts.meta}`}
        >
          {showAllSections ? 'Tampilkan Per Bagian (01–04)' : 'Tampilkan Semua Bagian'}
        </button>
      </div>

      {/* 01 Pujian Pembuka (dan Opsi Pujian Penutup / Transisi) */}
      {shouldRender('01') && (
        <section id="bagian-01" className="space-y-6 scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className={`font-semibold ${tokens.textAccent} ${fonts.meta}`}>
                Langkah 01 · Pujian Bersama
              </p>
              <h2 className={`font-display font-bold mt-1 ${fonts.h2} ${tokens.textPrimary}`}>
                Pujian Pembuka & Opsi Pujian Penutup
              </h2>
            </div>
          </div>

          <HymnCard
            hymn={openingHymn}
            fontScale={fontScale}
            theme={theme}
            onOpenFullscreen={onOpenFullscreenHymn}
            onOpenEditor={onOpenEditor}
            isSpeechSupported={isSpeechSupported}
            activeSpeechId={activeSpeechId}
            isSpeaking={isSpeaking}
            onSpeak={onSpeak}
          />

          <div className="pt-2 space-y-3">
            <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
              Opsi Pujian Penutup / Transisi
            </h3>
            <p className={`${fonts.meta} ${tokens.textSecondary}`}>
              Disiapkan untuk dinyanyikan setelah doa penutup atau sebagai transisi mengakhiri pertemuan PA:
            </p>
            <HymnCard
              hymn={closingHymn}
              fontScale={fontScale}
              theme={theme}
              onOpenFullscreen={onOpenFullscreenHymn}
              onOpenEditor={onOpenEditor}
              isSpeechSupported={isSpeechSupported}
              activeSpeechId={activeSpeechId}
              isSpeaking={isSpeaking}
              onSpeak={onSpeak}
            />
          </div>
        </section>
      )}

      {/* 02 Bacaan Alkitab */}
      {shouldRender('02') && (
        <section id="bagian-02" className="space-y-5 scroll-mt-24">
          <div>
            <p className={`font-semibold ${tokens.textAccent} ${fonts.meta}`}>
              Langkah 02 · Pembacaan Firman
            </p>
            <h2 className={`font-display font-bold mt-1 ${fonts.h2} ${tokens.textPrimary}`}>
              Bacaan Alkitab — {passage.reference}
            </h2>
          </div>

          <BiblePassageCard
            passage={passage}
            fontScale={fontScale}
            theme={theme}
            speechId={`bible-${session.id}`}
            isSpeechSupported={isSpeechSupported}
            activeSpeechId={activeSpeechId}
            isSpeaking={isSpeaking}
            onSpeak={onSpeak}
            onOpenEditor={onOpenEditor}
          />
        </section>
      )}

      {/* 03 Pengantar & Aplikasi (2-column with Callout Card) */}
      {shouldRender('03') && (
        <section id="bagian-03" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className={`font-semibold ${tokens.textAccent} ${fonts.meta}`}>
                Langkah 03 · Pendalaman Materi
              </p>
              <h2 className={`font-display font-bold mt-1 ${fonts.h2} ${tokens.textPrimary}`}>
                Pengantar, Pendalaman & Aplikasi
              </h2>
            </div>

            {isSpeechSupported && (
              <button
                type="button"
                onClick={() => onSpeak(materialSpeechId, materialAudioText)}
                className={`min-h-[46px] px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap shrink-0 no-print ${
                  isMaterialSpeaking ? tokens.buttonPrimary : tokens.buttonSecondary
                } ${fonts.meta}`}
              >
                {isMaterialSpeaking ? (
                  <>
                    <StopIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Bacakan Penjelasan</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Column: Pengantar + Penjelasan + Aplikasi Praktis */}
            <div className="lg:col-span-8 space-y-6">
              {/* Pengantar */}
              <article className={`rounded-2xl border p-6 sm:p-8 space-y-5 ${tokens.surface}`}>
                <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
                  {session.introTitle}
                </h3>

                {session.introSteps.length > 0 && (
                  <ol className={`space-y-3.5 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                    {session.introSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <span
                          className={`font-bold tabular-nums shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center mt-1 ${tokens.surfaceMuted} ${tokens.textAccent} ${fonts.meta}`}
                        >
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {session.introHighlight && (
                  <div className={`p-5 rounded-xl border ${tokens.surfaceHighlight}`}>
                    <p className={`font-bold ${tokens.textAccent} ${fonts.meta}`}>
                      {session.introHighlight.label}
                    </p>
                    <p className={`mt-1.5 font-display italic ${fonts.body} ${tokens.textPrimary}`}>
                      {session.introHighlight.example}
                    </p>

                    <div className={`mt-4 pt-4 border-t ${tokens.border} no-print`}>
                      <p className={`font-semibold ${fonts.meta} ${tokens.textPrimary}`}>
                        Latihan Perkenalan Anda:
                      </p>
                      <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={introName}
                          onChange={(e) => setIntroName(e.target.value)}
                          placeholder="Nama Anda (misal: Oma Ratna)"
                          aria-label="Nama Anda untuk perkenalan"
                          className={`min-h-[46px] px-3.5 py-2 rounded-xl border ${tokens.surface} ${tokens.textPrimary} ${fonts.meta}`}
                        />
                        <input
                          type="text"
                          value={introFeeling}
                          onChange={(e) => setIntroFeeling(e.target.value)}
                          placeholder="Ketika... (misal: ditemani cucu)"
                          aria-label="Peristiwa merasa dikasihi"
                          className={`min-h-[46px] px-3.5 py-2 rounded-xl border ${tokens.surface} ${tokens.textPrimary} ${fonts.meta}`}
                        />
                      </div>
                      {(introName.trim() || introFeeling.trim()) && (
                        <p className={`mt-3 font-semibold ${fonts.body} ${tokens.textAccent}`}>
                          “Saya {introName.trim() || '…'}, saya merasa dikasihi ketika{' '}
                          {introFeeling.trim() || '…'}.”
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {session.introParagraphs && session.introParagraphs.length > 0 && (
                  <div className={`space-y-4 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                    {session.introParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}

                {session.iceBreaking && (
                  <div className={`p-5 rounded-xl border ${tokens.surfaceMuted} space-y-3`}>
                    <p className={`font-bold ${tokens.textAccent} ${fonts.meta}`}>
                      {session.iceBreaking.title}
                    </p>
                    <h4 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
                      {session.iceBreaking.subtitle}
                    </h4>
                    <p className={`${fonts.body} ${tokens.textPrimary}`}>
                      <strong>Cara Bermain: </strong>
                      {session.iceBreaking.howToPlay}
                    </p>
                    <p className={`${fonts.body} ${tokens.textPrimary}`}>
                      <strong>Refleksi Singkat: </strong>
                      {session.iceBreaking.reflection}
                    </p>
                  </div>
                )}
              </article>

              {/* Penjelasan Materi */}
              <article className={`rounded-2xl border p-6 sm:p-8 space-y-6 ${tokens.surface}`}>
                <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
                  Penjelasan & Pendalaman Teks
                </h3>

                {session.materialIntroParagraphs.map((para, idx) => (
                  <p key={idx} className={`font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                    {para}
                  </p>
                ))}

                <div className="space-y-6">
                  {session.materialPoints.map((point) => (
                    <div key={point.number} className={`pt-5 border-t ${tokens.border} space-y-3`}>
                      <h4 className={`font-display font-bold ${fonts.h3} ${tokens.textAccent}`}>
                        <span className="tabular-nums mr-2">{point.number}.</span>
                        {point.title}
                      </h4>
                      <div className={`space-y-3.5 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                        {point.paragraphs.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {session.materialClosingParagraphs.length > 0 && (
                  <div className={`pt-5 border-t ${tokens.border} space-y-3.5 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                    {session.materialClosingParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </article>

              {/* Penerapan Praktis Lintas Generasi */}
              <article className={`rounded-2xl border p-6 sm:p-8 space-y-5 ${tokens.surface}`}>
                <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
                  Penerapan Praktis Keluarga & Jemaat Lintas Generasi
                </h3>
                <div className="space-y-4">
                  {session.practicalApplications.map((app, i) => (
                    <div key={i} className={`p-4 sm:p-5 rounded-xl border ${tokens.surfaceMuted}`}>
                      <p className={`font-bold ${tokens.textAccent} ${fonts.meta}`}>
                        {app.audience}
                      </p>
                      <p className={`mt-1.5 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                        {app.action}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* Callout Side Card: Catatan Kata / Pokok Tema */}
            <aside className="lg:col-span-4 space-y-5" aria-label="Catatan Kata dan Pokok Tema">
              <div className={`rounded-2xl border p-6 space-y-5 ${tokens.surface}`}>
                <div className={`pb-4 border-b ${tokens.border} flex items-center gap-2.5`}>
                  <BookOpen className={`w-5 h-5 shrink-0 ${tokens.textAccent}`} aria-hidden="true" />
                  <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
                    {session.calloutTitle}
                  </h3>
                </div>

                <div className="space-y-4">
                  {session.calloutNotes.map((note, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${tokens.surfaceMuted}`}>
                      <p className={`font-bold ${tokens.textAccent} ${fonts.label}`}>
                        {note.term}
                      </p>
                      <p className={`mt-1.5 font-sans-body ${fonts.meta} ${tokens.textSecondary}`}>
                        {note.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* 04 Bahan Diskusi */}
      {shouldRender('04') && (
        <section id="bagian-04" className="space-y-6 scroll-mt-24">
          <div>
            <p className={`font-semibold ${tokens.textAccent} ${fonts.meta}`}>
              Langkah 04 · Berbagi & Doa Penutup
            </p>
            <h2 className={`font-display font-bold mt-1 ${fonts.h2} ${tokens.textPrimary}`}>
              {session.discussionTitle}
            </h2>
          </div>

          <div className={`rounded-2xl border p-6 sm:p-8 space-y-7 ${tokens.surface}`}>
            <p className={`font-sans-body ${fonts.body} ${tokens.textSecondary}`}>
              {session.discussionLead}
            </p>

            {session.discussionGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textAccent}`}>
                  {group.groupTitle}
                </h3>

                <div className="space-y-3 font-sans-body">
                  {group.questions.map((question, qIdx) => {
                    const qKey = `${session.id}-${gIdx}-${qIdx}`;
                    const isChecked = !!checkedQuestions[qKey];
                    return (
                      <button
                        key={qKey}
                        type="button"
                        onClick={() => toggleQuestion(qKey)}
                        aria-pressed={isChecked}
                        className={`w-full text-left p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 transition-colors cursor-pointer ${
                          isChecked ? tokens.surfaceHighlight : tokens.surfaceMuted
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className={`w-6 h-6 shrink-0 mt-1 ${tokens.textAccent}`} aria-hidden="true" />
                        ) : (
                          <Square className={`w-6 h-6 shrink-0 mt-1 ${tokens.textSecondary}`} aria-hidden="true" />
                        )}
                        <span className={`${fonts.body} ${tokens.textPrimary}`}>
                          <strong className="tabular-nums mr-2">{qIdx + 1}.</strong>
                          {question}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {session.actionStep && (
              <div className={`pt-6 border-t ${tokens.border} space-y-4`}>
                <h3 className={`font-display font-bold ${fonts.h3} ${tokens.textPrimary}`}>
                  {session.actionStep.title}
                </h3>
                <p className={`font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                  {session.actionStep.instruction}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {session.actionStep.examples.map((ex, i) => (
                    <div key={i} className={`p-5 rounded-xl border ${tokens.surfaceHighlight}`}>
                      <p className={`font-bold ${tokens.textAccent} ${fonts.meta}`}>
                        {ex.label}
                      </p>
                      <p className={`mt-1.5 font-display italic ${fonts.body} ${tokens.textPrimary}`}>
                        {ex.text}
                      </p>
                    </div>
                  ))}
                </div>

                <SupportTreeWidget fontScale={fontScale} theme={theme} />
              </div>
            )}
          </div>

          {/* Pokok Doa Penutup */}
          <div className={`rounded-2xl border p-6 sm:p-8 space-y-5 ${tokens.surface}`}>
            <div>
              <p className={`font-semibold ${tokens.textAccent} ${fonts.meta}`}>
                Penutup Pertemuan · {session.closingPrayer.duration}
              </p>
              <h3 className={`font-display font-bold mt-1 ${fonts.h3} ${tokens.textPrimary}`}>
                {session.closingPrayer.title}
              </h3>
              <p className={`mt-2 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
                {session.closingPrayer.instruction}
              </p>
            </div>

            <div className="space-y-3">
              {session.closingPrayer.examples.map((ex, i) => (
                <div key={i} className={`p-4 sm:p-5 rounded-xl border ${tokens.surfaceMuted}`}>
                  <p className={`font-bold ${tokens.textAccent} ${fonts.meta}`}>
                    {ex.speaker}
                  </p>
                  <p className={`mt-1 font-display italic ${fonts.body} ${tokens.textPrimary}`}>
                    {ex.text}
                  </p>
                </div>
              ))}
            </div>

            <p className={`${fonts.meta} ${tokens.textSecondary}`}>
              <strong>Catatan: </strong>
              {session.closingPrayer.note}
            </p>
          </div>
        </section>
      )}

      {/* Bottom Prev/Next Navigation */}
      {!showAllSections && (
        <div className={`rounded-2xl border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 no-print ${tokens.surface}`}>
          <button
            type="button"
            disabled={!prevMap[activeSection]}
            onClick={() => prevMap[activeSection] && onSelectSection(prevMap[activeSection]!)}
            className={`min-h-[50px] px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${tokens.buttonSecondary} ${fonts.label}`}
          >
            <ChevronLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{prevMap[activeSection] ? `Ke ${sectionNames[prevMap[activeSection]!]}` : 'Awal Pertemuan'}</span>
          </button>

          {nextMap[activeSection] ? (
            <button
              type="button"
              onClick={() => onSelectSection(nextMap[activeSection]!)}
              className={`min-h-[50px] px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer transition-colors ${tokens.buttonPrimary} ${fonts.label}`}
            >
              <span>Lanjut: {sectionNames[nextMap[activeSection]!]}</span>
              <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSelectSection('01')}
              className={`min-h-[50px] px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer transition-colors ${tokens.buttonPrimary} ${fonts.label}`}
            >
              <span>Kembali ke 01 Pujian</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
