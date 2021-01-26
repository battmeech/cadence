import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'join',
            description:
                'Join the voice channel the requester is currently in.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

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
