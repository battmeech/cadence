import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { language } from '../messages/language';
import { DJCommand } from '../models/djCommand';

export default class extends DJCommand {
    constructor() {
        super({
            name: language('JOIN_COMMAND_NAME'),
            description: language('JOIN_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    async run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        if (message.member?.voice.channel) {
            if (!settings.voiceChannel) {
                try {
                    await settings.joinVoiceChannel(
                        message.member.voice.channel,
                        message.channel as TextChannel
                    );
                    message.react('👍');
                } catch (error) {
                    message.reply(
                        new MessageEmbed({ description: error.message })
                    );
                }
            }
        } else {
            message.channel.send(
                new MessageEmbed({
                    description: language('JOIN_COMMAND_NO_VOICE_CHANNEL'),
                })
            );
        }
    }
}
