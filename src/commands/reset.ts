import { Message } from 'discord.js';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('RESET_COMMAND_NAME'),
            description: language('RESET_COMMAND_HELPFUL_DESCRIPTION'),
            permissions: ['ADMINISTRATOR'],
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;
        settings.reset();
        message.react('👍');
    }
}
