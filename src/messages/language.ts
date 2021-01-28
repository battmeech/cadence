import { Messages, SupportedLanguage } from '../models/messages';
import SupportedLanguages from './supportedLanguages';

/**
 * Return the text in the correct language
 * @param message the message to be displayed
 * @param input any extra input required to produce the message
 */
export function language(message: keyof Messages, input?: any): string {
    const language: SupportedLanguage = process.env.LANGUAGE as any;

    const foundMessage = SupportedLanguages[language][message];

    if (typeof foundMessage === 'string') {
        return foundMessage;
    } else {
        return foundMessage(input);
    }
}

/**
 * This runs at start up, and will type check the language before setting it as an environment variable.
 * @param language the language to set
 */
export function chooseLanguage(language: string) {
    const _language = SupportedLanguages[language];
    if (_language) {
        process.env.LANGUAGE = language;
    } else {
        process.env.LANGUAGE = 'english';
    }
}
