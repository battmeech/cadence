import { Message, MessageEmbed } from 'discord.js';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'leave',
            description: 'Leave the voice channel the bot is currently in.',
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        try {
            settings.leaveVoiceChannel();
            message.react('👋');
        } catch (error) {
            message.reply(new MessageEmbed({ description: error.message }));
        }
    }
}
