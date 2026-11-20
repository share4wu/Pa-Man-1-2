import { useCallback, useEffect, useState } from 'react';

export function useSpeechReader() {
  const [isSupported, setIsSupported] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveId(null);
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (id: string, text: string) => {
      if (!isSupported) return;

      if (activeId === id && isSpeaking) {
        stop();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9; // Slightly slower, clearer cadence for elderly listeners
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const indonesianVoice = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }

      utterance.onstart = () => {
        setActiveId(id);
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setActiveId(null);
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setActiveId(null);
        setIsSpeaking(false);
      };

      setActiveId(id);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [activeId, isSpeaking, isSupported, stop]
  );

  return {
    isSupported,
    activeId,
    isSpeaking,
    speak,
    stop,
  };
}
