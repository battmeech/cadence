import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './command';
import fs from 'fs';
import { MusicSettings } from './musicSettings';

/**
 * An extension of the discord.js Client class, which also includes commands.
 */
export class Cadence extends Client {
    commands: Collection<string, Command> = new Collection();

    musicSettings: Collection<string, MusicSettings> = new Collection();

    constructor(options?: ClientOptions) {
        super(options);

        // Initialises all the commands found in the /commands directory
        const commandFiles = fs.readdirSync(__dirname + '/../commands');
        for (const file of commandFiles) {
            import(`../commands/${file}`).then((commandClass) => {
                const command: Command = new commandClass.default();

                if (command instanceof Command) {
                    this.commands.set(command.name, command);
                }
            });
        }
    }
}

async function Blah(client: Cadence) {}
