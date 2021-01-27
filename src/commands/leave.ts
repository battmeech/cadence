import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'leave',
            description: 'Leave the voice channel the bot is currently in.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        try {
            settings.leaveVoiceChannel();
            message.react('👋');
        } catch (error) {
            message.reply(new MessageEmbed({ description: error.message }));
        }
    }
}
