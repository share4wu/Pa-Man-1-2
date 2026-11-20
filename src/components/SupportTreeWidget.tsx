import { FormEvent, useEffect, useState } from 'react';
import { Leaf, Plus, RotateCcw } from 'lucide-react';
import { INITIAL_SUPPORT_LEAVES } from '../data/studyData';
import { ContrastTheme, FontScale, SupportLeaf } from '../types/study';
import { getFontClasses, getThemeTokens } from '../utils/themeStyles';

interface SupportTreeWidgetProps {
  fontScale: FontScale;
  theme: ContrastTheme;
}

const STORAGE_KEY = 'pa-man-2026-support-leaves';

export function SupportTreeWidget({ fontScale, theme }: SupportTreeWidgetProps) {
  const tokens = getThemeTokens(theme);
  const fonts = getFontClasses(fontScale);

  const [leaves, setLeaves] = useState<SupportLeaf[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_SUPPORT_LEAVES;
  });

  const [author, setAuthor] = useState('');
  const [generation, setGeneration] = useState<SupportLeaf['generation']>('Generasi Senior');
  const [kind, setKind] = useState<SupportLeaf['kind']>('Dukungan');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leaves));
    } catch {
      // ignore
    }
  }, [leaves]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Silakan tulis satu kalimat komitmen atau dukungan terlebih dahulu.');
      return;
    }
    const newLeaf: SupportLeaf = {
      id: `leaf-${Date.now()}`,
      author: author.trim() || 'Peserta PA',
      generation,
      kind,
      message: message.trim(),
    };
    setLeaves((prev) => [newLeaf, ...prev]);
    setAuthor('');
    setMessage('');
    setError('');
  };

  const handleReset = () => {
    setLeaves(INITIAL_SUPPORT_LEAVES);
    setError('');
  };

  return (
    <div className={`mt-6 rounded-2xl border p-5 sm:p-7 ${tokens.surfaceMuted}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className={`font-display font-bold flex items-center gap-2 ${fonts.h3} ${tokens.textPrimary}`}>
          <Leaf className={`w-5 h-5 shrink-0 ${tokens.textAccent}`} aria-hidden="true" />
          <span>Papan Daun Dukungan Digital</span>
        </h4>
        <button
          type="button"
          onClick={handleReset}
          className={`min-h-[44px] px-3.5 py-2 rounded-lg font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${tokens.buttonSecondary} ${fonts.meta}`}
        >
          <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Kembalikan Contoh</span>
        </button>
      </div>

      <p className={`mt-2 ${fonts.meta} ${tokens.textSecondary}`}>
        Tuliskan satu kalimat komitmen atau dukungan Anda untuk saling menguatkan antar-generasi di perangkat ini.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="leaf-author" className={`block font-semibold mb-1.5 ${fonts.meta} ${tokens.textPrimary}`}>
              Nama Anda
            </label>
            <input
              id="leaf-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Contoh: Opa Budi"
              className={`w-full min-h-[46px] px-4 py-2 rounded-xl border ${tokens.surface} ${tokens.textPrimary} ${fonts.meta}`}
            />
          </div>

          <div>
            <label htmlFor="leaf-gen" className={`block font-semibold mb-1.5 ${fonts.meta} ${tokens.textPrimary}`}>
              Generasi
            </label>
            <select
              id="leaf-gen"
              value={generation}
              onChange={(e) => setGeneration(e.target.value as SupportLeaf['generation'])}
              className={`w-full min-h-[46px] px-4 py-2 rounded-xl border ${tokens.surface} ${tokens.textPrimary} ${fonts.meta}`}
            >
              <option value="Generasi Senior">Generasi Senior</option>
              <option value="Generasi Muda">Generasi Muda</option>
              <option value="Keluarga">Keluarga</option>
            </select>
          </div>

          <div>
            <label htmlFor="leaf-kind" className={`block font-semibold mb-1.5 ${fonts.meta} ${tokens.textPrimary}`}>
              Jenis Tulisan
            </label>
            <select
              id="leaf-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as SupportLeaf['kind'])}
              className={`w-full min-h-[46px] px-4 py-2 rounded-xl border ${tokens.surface} ${tokens.textPrimary} ${fonts.meta}`}
            >
              <option value="Dukungan">Dukungan</option>
              <option value="Komitmen">Komitmen</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="leaf-message" className={`block font-semibold mb-1.5 ${fonts.meta} ${tokens.textPrimary}`}>
            Kalimat Dukungan atau Komitmen
          </label>
          <textarea
            id="leaf-message"
            rows={2}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError('');
            }}
            placeholder="Contoh: Saya siap mendengarkan dan mendoakan anak-cucu setiap hari."
            className={`w-full px-4 py-3 rounded-xl border ${tokens.surface} ${tokens.textPrimary} ${fonts.meta}`}
          />
          {error && (
            <p role="alert" className={`mt-1.5 font-semibold text-red-700 ${fonts.meta}`}>
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`min-h-[48px] px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 cursor-pointer transition-colors ${tokens.buttonPrimary} ${fonts.label}`}
        >
          <Plus className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Tambahkan ke Pohon Dukungan</span>
        </button>
      </form>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {leaves.map((leaf) => (
          <div key={leaf.id} className={`p-5 rounded-xl border ${tokens.surface}`}>
            <p className={`font-semibold ${tokens.textAccent} ${fonts.meta}`}>
              {leaf.kind} · {leaf.generation} · {leaf.author}
            </p>
            <p className={`mt-2 font-sans-body ${fonts.body} ${tokens.textPrimary}`}>
              “{leaf.message}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
