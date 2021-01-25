import { Message } from 'discord.js'
import { Command } from '../models/command'

/**
 * Given the ping command, figure out how much latency
 */
export default class extends Command {
    constructor() {
        super({
            name: 'ping',
            description: 'Calculates latency between discord and bot',
        })
    }

    async run(message: Message) {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        const m = await message.channel.send('Ping?')
        m.edit(
            `Pong! Latency is ${
                m.createdTimestamp - message.createdTimestamp
            }ms.`
        )
    }
}
