import { SupportedLanguage } from '../models/messages';
import english from './english';
import SupportedLanguages from './supportedLanguages';

export function language(message: keyof typeof english) {
    const language: SupportedLanguage = process.env.LANGUAGE as any;

    return SupportedLanguages[language][message];
}
