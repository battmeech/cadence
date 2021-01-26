import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'pause',
            description: 'Pause any currently playing music.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        try {
            settings.pauseMusic();
            message.react('⏸️');
        } catch (error) {
            message.reply(new MessageEmbed({ description: error.message }));
        }
    }
}
