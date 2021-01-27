import { Message, MessageEmbed } from 'discord.js';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'pause',
            description: 'Pause any currently playing music.',
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        try {
            settings.pauseMusic();
            message.react('⏸️');
        } catch (error) {
            message.reply(new MessageEmbed({ description: error.message }));
        }
    }
}
