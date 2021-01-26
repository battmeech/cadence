import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';
import { Song } from '../models/song';
import { fetchVideoInfo } from '../service/song';

export default class extends Command {
    constructor() {
        super({
            name: 'add',
            description: 'Add a track to the playlist',
        });
    }

    async run(message: Message, args: [url: string, ...args: string[]]) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        const [url] = args;

        if (!url) {
            message.channel.send(
                new MessageEmbed({
                    description:
                        "🎶 Give me a YouTube link and I'll add it to the queue",
                })
            );
        } else {
            const videoInfo = await fetchVideoInfo(url);
            const song = new Song(
                videoInfo,
                settings.songs.length + 1,
                message.author
            );
            settings.addSong(song);
            message.channel.send(song.createEmbed());
        }
    }
}
