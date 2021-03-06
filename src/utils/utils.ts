import { GuildMember, Message } from 'discord.js';
import fs from 'fs';
import config from '../config.json';
import { Cadence } from '../models/client';
import { Command } from '../models/command';

/**
 * @description Parse the message into a command and a list of arguments which have been provided
 * e.g. if we have the message "+say Is this the real life?" , we'll get the following:
 * command = say
 * args = ["Is", "this", "the", "real", "life?"]
 * @param message - this is the Discord message
 */
export function parseMessage(
    message: Message
): { command: string; args: string[] } {
    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift()!.toLowerCase();

    return { command, args };
}

/**
 * Check the user has permission to run a certain command
 * @param member the member to check permissions of
 * @param permissions permissions to be checked against
 */
export function checkUserCanRun(
    member: GuildMember,
    command: Command
): boolean {
    const { checkAdmin, roles, permissions, developerCommand } = command;

    // Firstly check if it's a developer command. If so,
    // only let developers perform this, and perform no other
    // checks
    if (developerCommand) {
        if (config.developerIds.includes(member.id)) {
            return true;
        } else {
            return false;
        }
    }

    let canRun: boolean = true;

    if (checkAdmin && member.hasPermission('ADMINISTRATOR')) {
        // Admins are allowed to bypass the role check in this scenario
        canRun = true;
    } else if (roles) {
        // Admins cannot bypass the role check here
        canRun = member.roles.cache.some((role) =>
            roles.includes(role.name.toLowerCase())
        );
    }

    // If canRun is still true, also check they have any required permissions
    if (permissions && canRun) {
        canRun = member.hasPermission(permissions, { checkAdmin });
    }

    return canRun;
}

/**
 * Go through the ../commands directory and scan the folder for anything which
 * extends {@link Command}, then initialise the command and add it to the list of
 * commands known to the client
 * @param client
 */
export async function initCommands(client: Cadence) {
    // Initialises all the commands found in the /commands directory
    const commandFileDir = `${__dirname}/../commands`;

    const commandFiles = fs.readdirSync(commandFileDir);
    for (const file of commandFiles) {
        const commandClass = await import(`../commands/${file}`);

        if (commandClass.default) {
            const command = new commandClass.default();
            if (command instanceof Command) {
                command.init(client);
                client.commands.set(command.name, command);
            }
        }
    }
}
