import { Client, ClientOptions, Collection } from 'discord.js'
import { Command } from './command'
import fs from 'fs'

/**
 * An extension of the discord.js Client class, which also includes commands.
 */
export class MusicOTron extends Client {
    commands: Collection<string, Command> = new Collection()

    constructor(options?: ClientOptions) {
        super(options)

        // Initialises all the commands found in the /commands directory
        const commandFiles = fs.readdirSync(__dirname + '/../commands')
        for (const file of commandFiles) {
            import(`../commands/${file}`).then((commandClass) => {
                const command: Command = new commandClass.default()

                if (command.name) {
                    this.commands.set(command.name, command)
                }
            })
        }
    }
}

async function Blah(client: MusicOTron) {}
