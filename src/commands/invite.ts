import { Message, MessageEmbed } from 'discord.js';
import { DeveloperCommand } from '../models/developerCommand';

export default class extends DeveloperCommand {
    constructor() {
        super({
            name: 'invite',
            description:
                'Get my invite link to invite Cadence to other servers!',
        });
    }

    run(message: Message) {
        const messageToReturn = new MessageEmbed({ title: 'Invite Link' });
        const inviteLink =
            'https://discord.com/api/oauth2/authorize?scope=bot&client_id=';
        messageToReturn.setURL(`${inviteLink}${this.cadence.user?.id}`);
        message.channel.send(messageToReturn);
    }
}
