import { Message, MessageEmbed } from 'discord.js';
import { DeveloperCommand } from '../models/developerCommand';

export default class extends DeveloperCommand {
    constructor() {
        super({
            name: 'id',
            description: 'Get the ID of a user by @ing them',
        });
    }

    run(message: Message) {
        const messageToReturn = new MessageEmbed({ title: 'User IDs' });
        if (message.mentions.users.size > 0) {
            message.mentions.users.forEach((user) =>
                messageToReturn.addField(user.username, user.id)
            );
        } else {
            messageToReturn.addField(
                message.author.username,
                message.author.id
            );
        }

        message.channel.send(messageToReturn);
    }
}
