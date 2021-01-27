import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../config.json';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'remove',
            description: 'Remove a song from the playlist.',
        });
    }

    async run(message: Message, args: string[]) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        const [songIndex] = args;
        const songToRemove = parseInt(songIndex);
        if (isNaN(songToRemove)) {
            return message.channel.send(
                new MessageEmbed({
                    description: `⚠️ You must give a numerical value to remove to, see \`${prefix}playlist\` to find out where the song is`,
                })
            );
        } else if (songToRemove > settings.songs.length || songToRemove < 1) {
            return message.channel.send(
                new MessageEmbed({
                    description: "⚠️ I don't have a song at that number",
                })
            );
        } else {
            const removedSong = settings.removeSong(songToRemove);
            message.channel.send(
                new MessageEmbed({
                    description: `${removedSong?.title} removed from the queue!`,
                })
            );
        }
    }
}
