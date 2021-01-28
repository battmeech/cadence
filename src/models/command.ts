import { Collection, Message, PermissionString } from 'discord.js';
import { Cadence } from './client';

interface ICommand {
    name: string;
    description?: string;
    permissions?: PermissionString[];
    roles?: string[];
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

    constructor(command: ICommand) {
        this.name = command.name;
        this.description = command.description;
        this.permissions = command.permissions;
        this.roles = command.roles;
    }

    /** The command that will be executed */
    abstract run(message: Message, args?: string[]): void;

    /** Any initialisation the command needs to do */
    init(client?: Cadence) {
        // Leave blank - can be overridden by subclasses
    }
}
