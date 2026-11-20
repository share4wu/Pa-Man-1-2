import { ContrastTheme, FontScale } from '../types/study';

export interface ThemeTokens {
  pageBg: string;
  headerBg: string;
  toolbarBg: string;
  surface: string;
  surfaceMuted: string;
  surfaceHighlight: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonActive: string;
  buttonInactive: string;
  verseActiveRow: string;
  mobileNavBg: string;
}

export function getThemeTokens(theme: ContrastTheme): ThemeTokens {
  if (theme === 'kontras') {
    return {
      pageBg: 'bg-white text-[#000000]',
      headerBg: 'bg-white border-[#1A1C1E]',
      toolbarBg: 'bg-[#F4F4F5] border-[#1A1C1E]',
      surface: 'bg-white border-[#1A1C1E]',
      surfaceMuted: 'bg-[#F7F7F8] border-[#5A5D62]',
      surfaceHighlight: 'bg-[#EEF3F8] border-[#1E3246]',
      border: 'border-[#5A5D62]',
      borderStrong: 'border-[#000000]',
      textPrimary: 'text-[#000000]',
      textSecondary: 'text-[#1A1C1E]',
      textAccent: 'text-[#1E3246]',
      buttonPrimary: 'bg-[#1E3246] text-white hover:bg-[#132230] border border-[#1E3246]',
      buttonSecondary: 'bg-white text-[#000000] hover:bg-[#F4F4F5] border border-[#1A1C1E]',
      buttonActive: 'bg-[#1E3246] text-white border border-[#1E3246]',
      buttonInactive: 'bg-white text-[#000000] border border-[#5A5D62] hover:border-[#000000]',
      verseActiveRow: 'bg-[#EEF3F8] border-[#1E3246]',
      mobileNavBg: 'bg-white border-t border-[#1A1C1E]',
    };
  }

  return {
    pageBg: 'bg-[#F7F5F0] text-[#1A1C1E]',
    headerBg: 'bg-[#F7F5F0]/95 backdrop-blur-sm border-[#E4E0D8]',
    toolbarBg: 'bg-[#FFFFFF] border-[#E4E0D8]',
    surface: 'bg-[#FFFFFF] border-[#E4E0D8]',
    surfaceMuted: 'bg-[#F7F5F0] border-[#E4E0D8]',
    surfaceHighlight: 'bg-[#F1F4F7] border-[#1E3246]',
    border: 'border-[#E4E0D8]',
    borderStrong: 'border-[#1E3246]',
    textPrimary: 'text-[#1A1C1E]',
    textSecondary: 'text-[#5A5D62]',
    textAccent: 'text-[#1E3246]',
    buttonPrimary: 'bg-[#1E3246] text-white hover:bg-[#152433] border border-[#1E3246]',
    buttonSecondary: 'bg-[#FFFFFF] text-[#1A1C1E] hover:bg-[#F7F5F0] border border-[#E4E0D8] hover:border-[#1E3246]',
    buttonActive: 'bg-[#1E3246] text-white border border-[#1E3246]',
    buttonInactive: 'bg-[#FFFFFF] text-[#1A1C1E] border border-[#E4E0D8] hover:border-[#1E3246]',
    verseActiveRow: 'bg-[#F1F4F7] border-[#1E3246]',
    mobileNavBg: 'bg-[#FFFFFF] border-t border-[#E4E0D8]',
  };
}

export interface FontScaleClasses {
  body: string;
  verse: string;
  lyric: string;
  h1: string;
  h2: string;
  h3: string;
  meta: string;
  label: string;
}

export function getFontClasses(scale: FontScale): FontScaleClasses {
  switch (scale) {
    case 'sedang':
      return {
        body: 'text-[17px] sm:text-[18px] leading-[1.75]',
        verse: 'text-[18px] sm:text-[19px] leading-[1.8]',
        lyric: 'text-[18px] sm:text-[19px] leading-[1.75]',
        h1: 'text-3xl sm:text-[42px] leading-[1.15]',
        h2: 'text-2xl sm:text-[30px] leading-[1.25]',
        h3: 'text-xl sm:text-2xl leading-[1.35]',
        meta: 'text-[14px] sm:text-[15px] leading-[1.5]',
        label: 'text-[15px] sm:text-[16px] leading-[1.4]',
      };
    case 'ekstra':
      return {
        body: 'text-[23px] sm:text-[25px] leading-[1.85]',
        verse: 'text-[24px] sm:text-[26px] leading-[1.9]',
        lyric: 'text-[23px] sm:text-[25px] leading-[1.8]',
        h1: 'text-[36px] sm:text-[52px] leading-[1.12]',
        h2: 'text-[28px] sm:text-[38px] leading-[1.22]',
        h3: 'text-[24px] sm:text-[29px] leading-[1.3]',
        meta: 'text-[17px] sm:text-[18px] leading-[1.5]',
        label: 'text-[18px] sm:text-[19px] leading-[1.4]',
      };
    case 'besar':
    default:
      return {
        body: 'text-[20px] sm:text-[21px] leading-[1.8]',
        verse: 'text-[21px] sm:text-[22px] leading-[1.85]',
        lyric: 'text-[20px] sm:text-[22px] leading-[1.8]',
        h1: 'text-[34px] sm:text-[48px] leading-[1.15]',
        h2: 'text-[26px] sm:text-[34px] leading-[1.22]',
        h3: 'text-[22px] sm:text-[25px] leading-[1.35]',
        meta: 'text-[15px] sm:text-[16px] leading-[1.5]',
        label: 'text-[16px] sm:text-[17px] leading-[1.4]',
      };
  }
}
