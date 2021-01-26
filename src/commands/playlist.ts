import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';
import { prefix } from '../config.json';

export default class extends Command {
    constructor() {
        super({
            name: 'playlist',
            description: 'View the current playlist.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        if (settings.songs.length > 0) {
            message.channel.send(settings.createEmbed());
        } else {
            message.channel.send(
                new MessageEmbed({
                    description: `🎶 No songs in queue yet, try the \`${prefix}add\` command`,
                })
            );
        }
    }
}
