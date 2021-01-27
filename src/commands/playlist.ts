import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../config.json';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'playlist',
            description: 'View the current playlist.',
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

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
