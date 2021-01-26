import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'play',
            description: 'Play the music in the playlist.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        try {
            settings.playMusic();
            message.react('▶️');
        } catch (error) {
            message.reply(new MessageEmbed({ description: error.message }));
        }
    }
}
