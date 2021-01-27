import { Messages, SupportedLanguage } from '../models/messages';
import SupportedLanguages from './supportedLanguages';

export function language(message: keyof Messages, input?: any): string {
    const language: SupportedLanguage = process.env.LANGUAGE as any;

    const foundMessage = SupportedLanguages[language][message];

    if (typeof foundMessage === 'string') {
        return foundMessage;
    } else {
        return foundMessage(input);
    }
}

export function chooseLanguage(language: string) {
    const _language = SupportedLanguages[language];
    if (_language) {
        process.env.LANGUAGE = language;
    } else {
        process.env.LANGUAGE = 'english';
    }
}
