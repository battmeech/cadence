import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../config.json';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'playing',
            description: 'Show what song is currently playing.',
        });
    }

    async run(message: Message) {
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
                        description:
                            "I'm playing a song that's no longer in the queue!",
                    })
                );
            }
        } else {
            message.channel.send(
                new MessageEmbed({
                    description: `▶️ I'm not playing anything right now, use \`${prefix}play\` to hear me play`,
                })
            );
        }
    }
}
