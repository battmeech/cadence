import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('PLAYING_COMMAND_NAME'),
            description: language('PLAYING_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        if (settings.playing) {
            const nowPlaying = settings.songs.find(
                (song) => song.positionInQueue === settings.musicIndex
            );
            if (nowPlaying) {
                message.channel.send(
                    nowPlaying
                        .createEmbed()
                        .setDescription(nowPlaying.description)
                );
            } else {
                // Hopefully never end up here.
                message.channel.send(
                    new MessageEmbed({
                        description: language(
                            'PLAYING_COMMAND_UNRECOGNISED_SONG'
                        ),
                    })
                );
            }
        } else {
            message.channel.send(
                new MessageEmbed({
                    description: language('PLAYING_COMMAND_NOT_PLAYING'),
                })
            );
        }
    }
}
