import { Message, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';
import { Song } from '../models/song';
import { fetchVideoInfo } from '../service/song';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('ADD_COMMAND_NAME'),
            description: language('ADD_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    async run(message: Message, args: [url: string, ...args: string[]]) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        const [url] = args;

        if (!url) {
            message.channel.send(
                new MessageEmbed({
                    description: language('ADD_COMMAND_NO_YOUTUBE_LINK'),
                })
            );
        } else {
            let videoInfo: ytdl.videoInfo;
            try {
                videoInfo = await fetchVideoInfo(url);
            } catch (error) {
                return message.channel.send(
                    new MessageEmbed({ description: error.message })
                );
            }
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
