import { Message, MessageEmbed } from 'discord.js'
import { client } from '..'
import { Command } from '../models/command'

/**
 * Given the help command, return the user a list of available commands
 */
export default class extends Command {
    constructor() {
        super({
            name: 'help',
            description: 'Returns some help stuff to the user',
        })
    }

    run(message: Message): void {
        const messageEmbed = new MessageEmbed()
        messageEmbed.setTitle('🎵 Available commands 🎵')
        messageEmbed.setDescription(
            'Music-o-tron is here for all your musical needs. Here are the functions I can perform.'
        )
        client.commands.forEach((command) => {
            messageEmbed.addField(`!${command.name}`, command.description)
        })

        message.channel.send(messageEmbed)
    }
}
