import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { prefix } from '../config.json';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'skip',
            description: 'Skip to a specific song or skip just the one!',
        });
    }

    async run(message: Message, args: string[]) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        const [songIndex] = args;

        if (songIndex) {
            const skipTo = parseInt(songIndex);

            if (isNaN(skipTo)) {
                return message.channel.send(
                    new MessageEmbed({
                        description: `You must give a numerical value to skip to, see \`${prefix}playlist\` to find out where your song is`,
                    })
                );
            } else if (skipTo > settings.songs.length || skipTo < 1) {
                return message.channel.send(
                    new MessageEmbed({
                        description: "I don't have a song at that number",
                    })
                );
            } else {
                settings.skip(skipTo);
            }
        } else {
            settings.skip();
        }
    }
}
