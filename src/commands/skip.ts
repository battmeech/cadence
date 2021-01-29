import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { DJCommand } from '../models/djCommand';

export default class extends DJCommand {
    constructor() {
        super({
            name: language('SKIP_COMMAND_NAME'),
            description: language('SKIP_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message, args: string[]) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        const [songIndex] = args;

        if (songIndex) {
            const skipTo = parseInt(songIndex);

            if (isNaN(skipTo)) {
                return message.channel.send(
                    new MessageEmbed({
                        description: language(
                            'SKIP_COMMAND_NON_NUMERICAL_VALUE'
                        ),
                    })
                );
            } else if (skipTo > settings.songs.length || skipTo < 1) {
                return message.channel.send(
                    new MessageEmbed({
                        description: language('SKIP_COMMAND_UNRECOGNISED_SONG'),
                    })
                );
            } else {
                settings.skip(skipTo);
                message.react('👍');
            }
        } else {
            if (settings.songs.length === 0) {
                message.channel.send(
                    new MessageEmbed({
                        description: language('NO_MUSIC_MESSAGE'),
                    })
                );
            } else {
                settings.skip();
                message.react('👍');
            }
        }
    }
}
