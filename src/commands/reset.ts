import { Message } from 'discord.js';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'reset',
            description: 'Reset all the music settings.',
        });
    }

    async run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;
        settings.reset();
    }
}
