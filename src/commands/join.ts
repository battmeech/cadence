import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'join',
            description:
                'Join the voice channel the requester is currently in.',
        });
    }

    async run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

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
