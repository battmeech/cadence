import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { DJCommand } from '../models/djCommand';

export default class extends DJCommand {
    constructor() {
        super({
            name: language('REMOVE_COMMAND_NAME'),
            description: language('REMOVE_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message, args: string[]) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        const [songIndex] = args;
        const songToRemove = parseInt(songIndex);
        if (isNaN(songToRemove)) {
            return message.channel.send(
                new MessageEmbed({
                    description: language('REMOVE_COMMAND_NON_NUMERICAL_VALUE'),
                })
            );
        } else if (songToRemove > settings.songs.length || songToRemove < 1) {
            return message.channel.send(
                new MessageEmbed({
                    description: language('REMOVE_COMMAND_UNRECOGNISED_SONG'),
                })
            );
        } else {
            settings.removeSong(songToRemove);
            message.react('👍');
        }
    }
}
