import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('PLAYLIST_COMMAND_NAME'),
            description: language('PLAYLIST_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        if (settings.songs.length > 0) {
            message.channel.send(settings.createEmbed());
        } else {
            message.channel.send(
                new MessageEmbed({
                    description: language('NO_MUSIC_MESSAGE'),
                })
            );
        }
    }
}
