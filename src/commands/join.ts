import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

/**
 * Given join command, join the voice chat of the user who sent it.
 */
export default class extends Command {
    constructor() {
        super({
            name: 'join',
            description: 'Calculates latency between discord and bot.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id);

        if (!settings) {
            return message.channel.send(
                new MessageEmbed({
                    description:
                        'Something went wrong when joining your voice channel.',
                })
            );
        }

        if (!settings.voiceChannel) {
            try {
                await settings.joinVoiceChannel(
                    message.member?.voice.channel!,
                    message.channel as TextChannel
                );
                message.react('👍');
            } catch (error) {
                message.reply(new MessageEmbed({ description: error.message }));
            }
        }
    }
}
