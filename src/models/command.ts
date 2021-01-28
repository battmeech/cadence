import { Collection, Message, PermissionString } from 'discord.js';
import { Cadence } from './client';

interface ICommand {
    name: string;
    description?: string;
    permissions?: PermissionString[];
    roles?: string[];
    /** A hidden command will not have it's help text displayed in server chats */
    hidden?: boolean;
}

export type CommandsCollection = Collection<string, Command>;

/**
 * Represents a basic command.
 */
export abstract class Command implements ICommand {
    name: string;
    description?: string;
    permissions?: PermissionString[];
    roles?: string[];
    hidden?: boolean;

    constructor(command: ICommand) {
        this.name = command.name;
        this.description = command.description;
        this.permissions = command.permissions;
        this.roles = command.roles;
        this.hidden = command.hidden;
    }

    /** The command that will be executed */
    abstract run(message: Message, args?: string[]): void;

    /** Any initialisation the command needs to do */
    init(client?: Cadence) {
        // Leave blank - can be overridden by subclasses
    }
}
